import { openAIClient } from "@/server/configs/openai";

export const tableRecall = async (
  prompt: string,
  tableColumns: Record<string, string[]>,
) => {
  const finalPrompt = buildPrompt(prompt, tableColumns);
  const { choices } = await openAIClient.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: finalPrompt,
      },
    ],
    temperature: 0,
  });

  const response = choices[0].message.content;

  if (!response) throw new Error("Table recall response returns none");

  return formatResult(response);
};

const formatTablePrompt = (tableColumns: Record<string, string[]>) => {
  // format each table into
  // # <table_name> ( <column_1>, <column_2>, ... )
  return Object.entries(tableColumns)
    .map(([tableName, columns]) => {
      return `# ${tableName} ( ${columns.join(", ")} )`;
    })
    .join("\n");
};

const formatResult = (result: string) => {
  // the result will be a string that contain an array
  // we need to parse it into an array
  // and pick the first 5 items
  // The whole string might not be an array, so we need to check for that
  const resultArray = result.match(/\[.*\]/);
  if (!resultArray) {
    throw new Error(
      `Invalid result for table recall, expected an array. Found: ${resultArray}`,
    );
  }
  const parsedArray = JSON.parse(resultArray[0]);
  return parsedArray.slice(0, 5) as string[];
};

const buildPrompt = (
  prompt: string,
  tableColumns: Record<string, string[]>,
) => {
  return `Given the database schema and question, perform the following actions:
  1 - Rank all the tables based on the possibility of being used in the SQL according to the question from the most relevant to the least relevant, Table or its column that matches more with the question words is highly relevant and must be placed ahead.
  2 - Check whether you consider all the tables. Do not remove any table out, if its not relevant then just note that it's not relevant and place near the end of the list.
  3 - Output a list object in the order of step 2, Your output should contain all the tables. The format should be like:
  [
      "table_1", "table_2", ...
  ]

  Schema:
  ${formatTablePrompt(tableColumns)}

  Question:
  ### ${prompt}`;
};
