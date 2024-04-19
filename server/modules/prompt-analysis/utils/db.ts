import { enterpriseDb } from "@/server/configs/db";
import { ForeignKey } from "@/server/types/db";

export const getSchemaInformation = () => {
  const tablesData = getTableColumnsData();

  return Object.keys(tablesData)
    .map((table) => {
      return `Table ${table}, columns = ${tablesData[table].columnInfo.join(", ")}\n${tablesData[table].foreignKeys.length ? `foreign_keys = [${tablesData[table].foreignKeys.map((fk) => `${fk.columnName} = ${fk.foreignTable}.${fk.foreignColumn}`).join(", ")}]` : ""}`.trim();
    })
    .join("\n");
};

const getTableColumnsData = () => {
  const tables = enterpriseDb
    .prepare("SELECT name FROM sqlite_master WHERE type='table'")
    .all() as { name: string }[];

  return tables.reduce(
    (acc, table) => {
      const columns = enterpriseDb
        .prepare(`PRAGMA table_info(${table.name})`)
        .all() as { name: string; type: string; notnull: number }[];

      return {
        ...acc,
        [table.name]: {
          columnInfo: columns.map((column) =>
            `${column.name} ${column.type} ${column.notnull ? "NOT NULL" : ""}`.trim(),
          ),
          foreignKeys: getForeignKeysData(table.name),
        },
      };
    },
    {} as Record<
      string,
      {
        columnInfo: string[];
        foreignKeys: ForeignKey[];
      }
    >,
  );
};

const getForeignKeysData = (tableName: string) => {
  const stmt = enterpriseDb.prepare(`
  SELECT
      m.name AS tableName,
      p."table" AS foreignTable,
      p."from" AS columnName,
      p."to" AS foreignColumn
  FROM
      sqlite_master m
      JOIN pragma_foreign_key_list(m.name) p ON m.name != p."table"
  WHERE 
      m.name = '${tableName}'
      AND m.type = 'table'
  ORDER BY 
      m.name;
  `);

  return stmt.all() as ForeignKey[];
};
