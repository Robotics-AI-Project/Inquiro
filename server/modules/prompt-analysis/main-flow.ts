// Import necessary modules
import { Pinecone } from "@pinecone-database/pinecone";
import * as fs from "fs";
import OpenAI from "openai";

// Initialize OpenAI
const openai_apiKey = "openai_apiKey";
const openai = new OpenAI({ apiKey: openai_apiKey });

// Initialize Pinecone
const pinecone_apiKey = "pinecone_apiKey";
const pinecone = new Pinecone({ apiKey: pinecone_apiKey });
const indexName = "knowledgebase";
const pineconeIndex = pinecone.index(indexName);

// Initialize local variable
let isComplete = false;
let hasOption = false;
let wordWithChoices = "";
let output = "";

// File Path
const knowledgeBaseFile = "./txt/knowledgeBase.csv";
const module0Script = fs.readFileSync("./txt/module_0.txt", "utf8");
const module0_5Script = fs.readFileSync("./txt/module_0_5.txt", "utf8");
const module1Script = fs.readFileSync("./txt/module_1.txt", "utf8");
const module2Script = fs.readFileSync("./txt/module_2.txt", "utf8");
const module3Script = fs.readFileSync("./txt/module_3.txt", "utf8");

// Read the CSV file and store articles in a list
const docs: string[] = [];
const csvFile = fs.readFileSync(knowledgeBaseFile, "utf8");
const csvReader = csvFile.split("\n");
let countLine = 0;
for (const row of csvReader) {
  if (row) {
    countLine += 1;
    docs.push(row.split(",")[0]);
  }
}

// List of words to remove
const wordsToRemove = ["max", "min", "average", "sum", "total", "distinct"];

// Function to remove specified words from each element in the array
function removeWords(arr: string[], wordsToRemove: string[]): string[] {
  return arr.map((word) => {
    // Split the word into individual words
    const splitWords = word.split(" ");
    // Remove specified words
    const filteredWords = splitWords.filter(
      (w) => !wordsToRemove.includes(w.toLowerCase()),
    );
    // Join the remaining words back together
    return filteredWords.join(" ");
  });
}

//wait function
async function waitNSecond(sec: number) {
  const time = sec * 1000;
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time); // 1000 milliseconds = 1 second
  });
}

interface PAInput {
  body: {
    userQuery: string;
    userFeedback: string;
    schema: string;
  };
}

export const mainFlow = async ({ body }: PAInput) => {
  let { userQuery, userFeedback, schema } = body;

  const userQueryResponse = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: userQuery,
  });

  const userQueryEmbedding: number[] = userQueryResponse.data[0].embedding;

  const promptUserQuery = `#user_query: "${userQuery}"`;

  // Module 0: Extract compound noun
  const completionResponse0 = await openai.chat.completions.create({
    messages: [
      { role: "system", content: module0Script },
      { role: "user", content: promptUserQuery },
    ],
    model: "gpt-3.5-turbo-1106",
    max_tokens: 500,
    temperature: 0.0,
  });

  const responseModule0 = completionResponse0.choices[0].message.content;
  if (responseModule0 === null) {
    // send error
    return;
  }
  let extractedWordPrep = `#extracted_word: ${responseModule0}`;
  const extractedWordPrepList = JSON.parse(responseModule0);

  // Remove specified words from the original list
  const refinedList = removeWords(extractedWordPrepList, wordsToRemove);
  extractedWordPrep = `#extracted_word: ${refinedList}`;

  // Module 0.5
  const completionResponse0_5 = await openai.chat.completions.create({
    messages: [
      { role: "system", content: module0_5Script },
      { role: "user", content: extractedWordPrep },
    ],
    model: "gpt-3.5-turbo-1106",
    max_tokens: 500,
    temperature: 0.0,
  });
  const responseModule0_5 = completionResponse0_5.choices[0].message.content;
  extractedWordPrep = `#extracted_word: ${responseModule0_5}`;

  // Module 1: Get Unknown word
  const completionResponse1 = await openai.chat.completions.create({
    messages: [
      { role: "system", content: module1Script },
      { role: "user", content: schema },
      { role: "user", content: extractedWordPrep },
    ],
    model: "gpt-3.5-turbo-1106",
    max_tokens: 500,
    temperature: 0.0,
  });

  const responseModule1 = completionResponse1.choices[0].message.content;
  if (responseModule1 === null) {
    // send error
    return;
  }
  let res = responseModule1.split("Step 3:\n");
  const listUnknown1 = res[1];
  const listUnknown1Array = JSON.parse(listUnknown1);
  const listUnknown1Prep = `#list_unknown_1: ${listUnknown1}`;

  if (listUnknown1Array.length != 0) {
    // Module 2: Get related knowledgeBase and feedback
    // Query the Pinecone index
    // top_k=3 : find the 3 items in the index that are most closely related to the provided
    let similarArticlesAll = "";
    while (true) {
      try {
        const result = await pineconeIndex.query({
          topK: 3,
          vector: userQueryEmbedding,
        });
        // IDs of the 3 most similar articles
        const similarArticleIds = result.matches.map((match: any) => match.id);

        // Fetch the similar article
        const similarArticles = similarArticleIds.map(
          (id: string) => docs[parseInt(id.split("_")[1]) - 1],
        );
        similarArticlesAll = similarArticles.join("\n");
        break;
      } catch (error) {
        // Handle the error
        console.error(
          "An error occurred while querying the Pinecone index:",
          error,
        );
        await waitNSecond(1); // Wait for 1 second before retrying
      }
    }

    // Join knowledgeBase and userFeedback to additionalDataPrep
    const additionalDataPrep = `#additionalDataPrep: \n${userFeedback}\n${similarArticlesAll}`;

    // Generate a completion using the constructed prompt
    const completionResponse2 = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: module2Script },
        { role: "user", content: additionalDataPrep },
        { role: "user", content: listUnknown1Prep },
      ],
      max_tokens: 500,
      temperature: 0.0,
    });

    const responseModule2 = completionResponse2.choices[0].message.content;
    if (responseModule2 === null) {
      // send error
      return;
    }
    const jsonObject2: {
      related_data: string;
      list_unknown_2: string[];
    } = JSON.parse(responseModule2);

    const relatedData = jsonObject2.related_data;
    const listUnknown2 = jsonObject2.list_unknown_2;

    // Get Clarified words
    const clarifiedWordArray = [];
    for (const word of listUnknown1Array) {
      if (!listUnknown2.includes(word)) {
        clarifiedWordArray.push(word);
      }
    }

    const relatedDataWithTopicPrep = `#related_data: ${relatedData}`;

    let choices: string[] = [];

    if (clarifiedWordArray.length > 0) {
      for (const word of clarifiedWordArray) {
        // module 3: get word that have choice
        let clarifiedWordPrep = `#clarified_word: ${word}`;
        console.log(clarifiedWordPrep);
        const completionResponse3 = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-1106",
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: module3Script },
            { role: "user", content: clarifiedWordPrep },
            { role: "user", content: relatedDataWithTopicPrep },
          ],
          max_tokens: 500,
          temperature: 0.0,
        });

        const responseModule3 = completionResponse3.choices[0].message.content;
        if (responseModule3 === null) {
          // send error
          return;
        }
        const jsonObject3: {
          wordWithChoices: string;
          choices: string[];
        } = JSON.parse(responseModule3);

        wordWithChoices = jsonObject3.wordWithChoices;
        choices = jsonObject3.choices;

        if (wordWithChoices) {
          if (choices.length == 1) {
            wordWithChoices = "";
            choices = [];
          }
          break;
        }
      }
    }

    // Case 2 Output: having option avaliable
    if (wordWithChoices != "") {
      console.log("Complete: ", isComplete);
      let temp = "";
      for (let i = 0; i < choices.length; i++) {
        temp = temp + `${i + 1}. ${choices[i]}\n`;
      }
      output = `What does '${wordWithChoices}' mean? \nDo you mean by one of these options? Please select a choice or feel free to provide us more information.\n${temp}\noption?: "`;
      hasOption = true;
    }
    // Case 3 Output: If unclear word with no option exists
    else if (listUnknown2.length > 0) {
      console.log("Complete: ", isComplete);
      let temp = "";
      for (let i = 0; i < listUnknown2.length; i++) {
        temp = temp + `${i + 1}. ${listUnknown2[i]}\n`;
      }
      output = `Please clarify the meaning of these words: \n${temp}`;
    }
    // Case 1 Output: user query already clear.
    else {
      output = `${userQuery} ${relatedData}`;
      isComplete = true;
    }
  }
  // Case 1 Output: user query already clear.
  else {
    output = `${userQuery}`;
    isComplete = true;
  }
  // isComplete = False -> reply to user
  // isComplete = True -> send to text-to-sql module
  // hasOption = True >> call optionHandler and wait for user feedback.
  return { output, isComplete, hasOption, wordWithChoices };
};
