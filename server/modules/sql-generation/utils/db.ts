import { enterpriseDb } from "@/server/configs/db";
import { ForeignKey } from "@server/types/db";

export const getTableColumns = () => {
  const tables = enterpriseDb
    .prepare("SELECT name FROM sqlite_master WHERE type='table'")
    .all() as { name: string }[];

  return tables.reduce(
    (acc, table) => {
      const columns = enterpriseDb
        .prepare(`PRAGMA table_info(${table.name})`)
        .all() as { name: string }[];

      return {
        ...acc,
        [table.name]: columns.map((column) => column.name),
      };
    },
    {} as Record<string, string[]>,
  );
};

export const getForeignKeys = (tableNames: string[]) => {
  // get foreign keys which are referencing the tables in tableNames.
  // from and to tables should be in tableNames
  console.log("tableNames", tableNames);

  enterpriseDb.exec(`CREATE TEMPORARY TABLE selected_tables (name TEXT)`);

  const insertSelectedTables = enterpriseDb.prepare(
    `INSERT INTO selected_tables (name) VALUES (?)`,
  );
  tableNames.forEach((table) => insertSelectedTables.run(table));

  const stmt = enterpriseDb.prepare(`
SELECT
    m.name AS tableName,
    p."table" AS foreignTable,
    p."from" AS columnName,
    p."to" AS foreignColumn
FROM
    sqlite_master m
    JOIN pragma_foreign_key_list(m.name) p ON m.name != p."table"
    JOIN selected_tables s ON m.name = s.name
WHERE 
    m.type = 'table'
ORDER BY 
    m.name;
`);

  return stmt.all() as ForeignKey[];
};
