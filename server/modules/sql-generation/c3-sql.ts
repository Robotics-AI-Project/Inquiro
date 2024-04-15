import { columnRecall } from "./utils/column-recall";
import { getForeignKeys, getTableColumns } from "./utils/db";
import { sqlGeneration } from "./utils/sql-generation";
import { tableRecall } from "./utils/table-recall";

export const c3Sql = async (prompt: string) => {
  const tableColumns = getTableColumns();
  if (!tableColumns)
    throw new Error("Failed to get table columns, table column is null");
  const tables = await tableRecall(prompt, tableColumns);
  const foreignKeys = getForeignKeys(tables);
  const filteredTableColumns = await columnRecall(
    prompt,
    tableColumns,
    foreignKeys,
  );
  const sql = await sqlGeneration(prompt, filteredTableColumns, foreignKeys);
  return sql;
};
