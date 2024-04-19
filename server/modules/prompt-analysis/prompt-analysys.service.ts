// Import necessary modules
import { getKnowledgeBase, removeWords } from "./helpers";
import { openai } from "./initialization";
import {
  module05Prompt,
  module0Prompt,
  module1Prompt,
  module2Prompt,
  module3Prompt,
} from "./prompts";
import { getSchemaInformation } from "./utils/db";

// All initializations of OpenAI, Pinecone, and Google move to initialization.ts

// Module 0: Noun Extractor
// Function: Get extracted noun from user query
const nounExtractor = async (userQuery: string) => {
  // Module 0: Extract compound noun
  const completionResponse0 = await openai.chat.completions.create({
    messages: [
      { role: "system", content: module0Prompt },
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
  )}`;

  // Module 0.5
  const completionResponse0_5 = await openai.chat.completions.create({
    messages: [
      { role: "system", content: module05Prompt },
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
) => {
  // Initialize output
  let clarifiedWordArray: string[] = [];
  let listUnknown: string[] = [];
  let relatedData = "";

  const schema = getSchemaInformation();

  console.log("schema", schema);

  // Module 1: Get Unknown word from schema
  const completionResponse1 = await openai.chat.completions.create({
    messages: [
      { role: "system", content: module1Prompt },
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
        { role: "system", content: module2Prompt },
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

    relatedData = jsonObject2.related_data;
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
    const completionResponse3 = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: module3Prompt },
        { role: "user", content: clarifiedWordPrep },
        { role: "user", content: relatedData },
      ],
      max_tokens: 500,
      temperature: 0.0,
    });

    const responseModule3 = completionResponse3.choices[0].message.content;

    if (responseModule3 === null) throw new Error("optionChecker is invalid.");

    const {
      wordWithOptions,
      options,
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
  } = await unknownWordRetreiver(userQuery, extractedWord, userFeedback);

  // Module 3: Check whether clarified word has options based on knowledge base.
  const option = await optionChecker(
    clarifiedWord,
    `#related_data: ${relatedData}`,
  );

  if (!option && unknownWord.length > 0) {
    const allUnknownWords = unknownWord
      .map((word, index) => `${index + 1}. ${word}`)
      .join("\n");
    const output = `Please clarify the meaning of these words:\n${allUnknownWords}`;
    // Case 2 Output: If unclear word with no option exists
    return {
      isCompleted: false,
      feedbackMode: "manual",
      output,
    };
  }

  if (option) {
    const { wordWithOptions, options } = option;
    const formattedOptionsString = options
      .map((option, index) => `${index + 1}. ${option}`)
      .join("\n");
    const output = `What does '${wordWithOptions}' mean?
Do you mean by one of these options? Please select an option.
${formattedOptionsString}
option?:`;
    // Case 3 Output: having option avaliable
    return {
      isCompleted: false,
      feedbackMode: "option",
      wordWithOptions,
      options,
      output,
    };
  }

  // isComplete = False -> reply to user
  // isComplete = True -> send to text-to-sql module
  // hasOption = True >> call optionHandler and wait for user feedback.
  return {
    isCompleted: true,
    output: `${userQuery} ${relatedData}`,
  };
};
