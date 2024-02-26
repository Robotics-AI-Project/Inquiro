// Import necessary modules
import { Pinecone } from "@pinecone-database/pinecone";
import axios from "axios";
import * as fs from "fs";
import OpenAI from "openai";

// it stays here
// Initialize OpenAI
const openai_apiKey = "openai-api-key";
const openai = new OpenAI({ apiKey: openai_apiKey });

// Initialize Pinecone
const pinecone_apiKey = "pinecone-api-key";
const pinecone = new Pinecone({ apiKey: pinecone_apiKey });
const indexName = "knowledgebase";
const pineconeIndex = pinecone.index(indexName);

const ggAccessToken = "google-access-token";

// Set up the authorization header
const headers = {
  Authorization: `Bearer ${ggAccessToken}`,
};

// File Path

const module0Script = fs.readFileSync("./txt/module_0.txt", "utf8");
const module0_5Script = fs.readFileSync("./txt/module_0_5.txt", "utf8");
const module1Script = fs.readFileSync("./txt/module_1.txt", "utf8");
const module2Script = fs.readFileSync("./txt/module_2.txt", "utf8");
const module3Script = fs.readFileSync("./txt/module_3.txt", "utf8");

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

// Concat data from Google Docs Link
function concatenateText(contentData: any): string {
  let concatenatedString = "";

  contentData?.forEach((item: any) => {
    if (item?.paragraph && item.paragraph?.elements) {
      if (item?.paragraph?.bullet && item?.paragraph?.bullet?.listId) {
        concatenatedString += `• `; // Add bullet point
      }

      item.paragraph.elements.forEach((element: any) => {
        if (element?.textRun && element.textRun?.content) {
          concatenatedString += element.textRun.content;
        }
      });
    }
  });

  return concatenatedString;
}

//wait function
function waitNSecond(sec: number) {
  const time = sec * 1000;
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time); // 1000 milliseconds = 1 second
  });
}

// Make a GET request to the Google Drive API
const getDocFile = async (documentId: string) => {
  try {
    const response = await axios.get(
      `https://docs.googleapis.com/v1/documents/${documentId}`,
      {
        headers: headers,
      },
    );
    const docs = concatenateText(response.data.body.content);
    const title = response.data.title;
    return { docs, title };
  } catch (error: any) {
    console.error("Error getting docs files:", error.message);
  }
};

const getKnowledgeBase = async (userQuery: string) => {
  // Embed user query
  const userQueryResponse = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: userQuery,
  });
  const userQueryEmbedded: number[] = userQueryResponse.data[0].embedding;
  if (userQueryEmbedded == null) {
    throw new Error("Error embedding user query");
  }
  let similarArticlesAll = "";
  while (true) {
    try {
      const result = await pineconeIndex.query({
        topK: 3,
        vector: userQueryEmbedded,
        includeMetadata: true,
      });
      // IDs of the 3 most similar articles
      const similarArticleUrl = result.matches.map(
        (match: any) => match.metadata,
      );
      let doc, docID;
      for (const article of similarArticleUrl) {
        docID = article.url.split("/d/")[1];
        doc = await getDocFile(docID);
        await waitNSecond(0.5);
        similarArticlesAll = similarArticlesAll + doc;
      }
      return similarArticlesAll;
      // Fetch the similar article
    } catch (error) {
      // Handle the error
      console.error(
        "An error occurred while querying the Pinecone index:",
        error,
      );
      await waitNSecond(1); // Wait for 1 second before retrying
    }
  }
};

// Module 0: Noun Extractor
// Function: Get extracted noun from user query
const nounExtractor = async (userQuery: string) => {
  // Module 0: Extract compound noun

  const completionResponse0 = await openai.chat.completions.create({
    messages: [
      { role: "system", content: module0Script },
      { role: "user", content: `#user_query: "${userQuery}"` },
    ],
    model: "gpt-3.5-turbo-1106",
    max_tokens: 500,
    temperature: 0.0,
  });

  // null handling
  const responseModule0 = completionResponse0.choices[0].message.content;

  if (!responseModule0) throw new Error("nounExtractor is invalid.");

  // Remove specified words from the original list
  let extractedWordPrep = `#extracted_word: ${removeWords(
    JSON.parse(responseModule0),
    wordsToRemove,
  )}`;

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
  extractedWordPrep = `#extracted_word: ${completionResponse0_5.choices[0].message.content}`;
  return extractedWordPrep;
};

// Module 1: Identifier and Module 2: Enhancer
// Function: Get unkown words from schema and knowledgebase
const unknownWordRetreiver = async (
  userQuery: string,
  extractedWord: string,
  userFeedback: string,
  schema: string,
) => {
  // Initialize output
  let clarifiedWordArray: string[] = [];
  let listUnknown: string[] = [];
  let relatedData = "";

  // Module 1: Get Unknown word from schema
  const completionResponse1 = await openai.chat.completions.create({
    messages: [
      { role: "system", content: module1Script },
      { role: "user", content: schema },
      { role: "user", content: extractedWord },
    ],
    model: "gpt-3.5-turbo-1106",
    max_tokens: 500,
    temperature: 0.0,
  });

  const responseModule1 = completionResponse1.choices[0].message.content;
  if (!responseModule1) throw new Error("unknownWordRetreiver is invalid.");

  const originalUnknownWords = JSON.parse(
    responseModule1.split("Step 3:\n")[1],
  ) as string[];
  const originalUnknownWordsFormattedPrompt = `#list_unknown_1: ${originalUnknownWords}`;

  if (originalUnknownWords.length !== 0) {
    // Module 2: Get related knowledgeBase and feedback
    const knowledgeBase = await getKnowledgeBase(userQuery);

    // Join knowledgeBase and userFeedback to additionalDataPrep
    const additionalDataPrompt = `#additionalDataPrep: \n${userFeedback}\n${knowledgeBase}`;

    // Generate a completion using the constructed prompt
    const completionResponse2 = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: module2Script },
        { role: "user", content: additionalDataPrompt },
        { role: "user", content: originalUnknownWordsFormattedPrompt },
      ],
      max_tokens: 500,
      temperature: 0.0,
    });

    const responseModule2 = completionResponse2.choices[0].message.content;

    if (!responseModule2) throw new Error("unknownWordRetreiver is invalid.");

    const jsonObject2: {
      related_data: string;
      list_unknown_2: string[];
    } = JSON.parse(responseModule2);

    relatedData = `#related_data: ${jsonObject2.related_data}`;
    listUnknown = jsonObject2.list_unknown_2;

    // Get Clarified words
    // imperative programming
    clarifiedWordArray = originalUnknownWords.filter(
      (word) => !listUnknown.includes(word),
    );
  }
  return { listUnknown, clarifiedWordArray, relatedData };
};

// Module 3: Option Checker
// Function: Check whether clarified word has options.
const optionChecker = async (
  clarifiedWordArray: string[],
  relatedData: string,
) => {
  // Initialize output
  if (clarifiedWordArray.length == 0) return null;

  for (const word of clarifiedWordArray) {
    // module 3: get word that have choice
    const clarifiedWordPrep = `#clarified_word: ${word}`;
    console.log(clarifiedWordPrep);
    const completionResponse3 = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: module3Script },
        { role: "user", content: clarifiedWordPrep },
        { role: "user", content: relatedData },
      ],
      max_tokens: 500,
      temperature: 0.0,
    });

    const responseModule3 = completionResponse3.choices[0].message.content;

    if (responseModule3 === null) throw new Error("optionChecker is invalid.");

    const {
      options,
      wordWithOptions,
    }: {
      wordWithOptions: string;
      options: string[];
    } = JSON.parse(responseModule3);

    if (wordWithOptions && options.length > 1)
      return {
        wordWithOptions,
        options,
      };
  }

  return null;
};

export const promptAnalysis = async (
  userQuery: string,
  userFeedback: string,
  schema: string,
): Promise<
  { output: string } & (
    | {
        isCompleted: true;
      }
    | {
        isCompleted: false;
        feedbackMode: "manual";
      }
    | {
        isCompleted: false;
        feedbackMode: "option";
        options: string[];
        wordWithOptions: string;
      }
  )
> => {
  // Module 0: Extract compound noun from user query
  const extractedWord = await nounExtractor(userQuery);

  // Module 1 and Module 2: Get unknown word, related data, and clarified word from schema and user feedback
  const {
    listUnknown: unknownWord,
    clarifiedWordArray: clarifiedWord,
    relatedData,
  } = await unknownWordRetreiver(
    userQuery,
    extractedWord,
    userFeedback,
    schema,
  );

  // Module 3: Check whether clarified word has options based on knowledge base.
  const option = await optionChecker(clarifiedWord, relatedData);

  if (!option && unknownWord.length > 0) {
    const allUnknownWords = unknownWord
      .map((word, index) => `${index + 1}. ${word}`)
      .join("\n");
    const output = `Please clarify the meaning of these words:\n${allUnknownWords}`;
    // Case 3 Output: If unclear word with no option exists
    return {
      isCompleted: false,
      feedbackMode: "manual",
      output,
    };
  }

  const { wordWithOptions, options } = option!;

  if (options.length > 0) {
    const formattedOptionsString = options
      .map((option, index) => `${index + 1}. ${option}`)
      .join("\n");
    const output = `What does '${wordWithOptions}' mean?
Do you mean by one of these options? Please select an option.
${formattedOptionsString}
option?:`;
    // Case 2 Output: having option avaliable
    return {
      isCompleted: false,
      feedbackMode: "option",
      wordWithOptions,
      options,
      output,
    };
  }

  // Unknown word/words exist

  // isComplete = False -> reply to user
  // isComplete = True -> send to text-to-sql module
  // hasOption = True >> call optionHandler and wait for user feedback.

  return {
    isCompleted: true,
    output: `${userQuery} ${relatedData}`,
  };
};
