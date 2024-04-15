import { openAIClient } from "@/server/configs/openai";
import { ForeignKey } from "@/server/types/db";
import { formatForeignKeys, formatTablePrompt } from "./prompt";

export const columnRecall = async (
  prompt: string,
  tableColumns: Record<string, string[]>,
  foreignKeys: ForeignKey[],
) => {
  const finalPrompt = buildPrompt(prompt, tableColumns, foreignKeys);

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

const buildPrompt = (
  prompt: string,
  tableColumns: Record<string, string[]>,
  foreignKeys: ForeignKey[],
) => {
  return `Given the database tables and question, perform the following actions:
\t1 - Rank the columns in each table based on the possibility of being used in the SQL, Column that matches more with the question words or the foreign key is highly relevant and must be placed ahead. You should output them in the order of the most relevant to the least relevant. Every column must be evaluated and no additional column should be added.
\t2 - Check whether you consider all the tables and all columns inside tables.
\t3 - Output a JSON object that contains all the columns in each table according to your explanation. The format should be like:
{
    "table_1": ["column_1", "column_2", ......],
    "table_2": ["column_1", "column_2", ......],
    "table_3": ["column_1", "column_2", ......],
}

\tSchema:
${formatTablePrompt(tableColumns)}
\tForeign Keys:
${formatForeignKeys(foreignKeys)}

\tQuestion:
\t### ${prompt}`;
};

const formatResult = (response: string) => {
  const jsonString = response.match(/\{.*\}/s);

  if (!jsonString) {
    throw new Error(
      `Invalid result for column recall, expected a JSON object. Found: ${jsonString}`,
    );
  }

  const parsedObject = JSON.parse(jsonString[0]) as Record<string, string[]>;

  for (const table in parsedObject) {
    parsedObject[table] = parsedObject[table].slice(0, 5);
  }

  return parsedObject;
};
