import { openAIClient } from "@/server/configs/openai";
import { ForeignKey, TableColumns } from "@/server/types/db";
import { formatForeignKeys, formatTablePrompt } from "./prompt";

export const sqlGeneration = async (
  prompt: string,
  tableColumns: TableColumns,
  foreignKeys: ForeignKey[],
) => {
  const finalPrompt = buildPrompt(prompt, tableColumns, foreignKeys);

  const { choices } = await openAIClient.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are now an excellent SQL writer, first I'll give you some tips and examples, and I need you to remember the tips, and do not make same mistakes.",
      },
      {
        role: "user",
        content: `Tips 1: 
Question: Which A has most number of B?
Gold SQL: select A from B group by A order by count ( * ) desc limit 1;
Notice that the Gold SQL doesn't select COUNT(*) because the question only wants to know the A and the number should be only used in ORDER BY clause, there are many questions asks in this way, and I need you to remember this in the the following questions.`,
      },
      {
        role: "assistant",
        content:
          "Thank you for the tip! I'll keep in mind that when the question only asks for a certain field, I should not include the COUNT(*) in the SELECT statement, but instead use it in the ORDER BY clause to sort the results based on the count of that field.",
      },
      {
        role: "user",
        content: `Tips 2: 
Don't use "IN", "OR", "LEFT JOIN" as it might cause extra results, use "INTERSECT" or "EXCEPT" instead, and remember to use "DISTINCT" or "LIMIT" when necessary.
For example, 
Question: Who are the A who have been nominated for both B award and C award?
Gold SQL should be: select A from X where award = 'B' intersect select A from X where award = 'C';`,
      },
      {
        role: "assistant",
        content:
          'Thank you for the tip! I\'ll remember to use "INTERSECT" or "EXCEPT" instead of "IN", "OR", or "LEFT JOIN" when I want to find records that match or don\'t match across two tables. Additionally, I\'ll make sure to use "DISTINCT" or "LIMIT" when necessary to avoid repetitive results or limit the number of results returned.',
      },
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
  tableColumns: TableColumns,
  foreignKeys: ForeignKey[],
) => {
  const schemaPrompt = formatTablePrompt(tableColumns);
  const foreignKeysPrompt = formatForeignKeys(foreignKeys);
  return `### Complete sqlite SQL query only and with no explanation, and do not select extra columns that are not explicitly requested in the query.
### Sqlite SQL tables, with their properties:


\t Schemas:
${schemaPrompt}

\t Foreign Keys:
${foreignKeysPrompt}

\t Prompt:
### ${prompt}

SELECT`;
};

const formatResult = (result: string) => {
  if (result.startsWith("SELECT")) return result;
  return `SELECT ${result}`;
};
