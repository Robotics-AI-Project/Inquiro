import { tableRecall } from "./utils/table-recall";

export const c3Sql = async (prompt: string) => {
  const tables = await tableRecall(prompt, {});
  return prompt;
};
