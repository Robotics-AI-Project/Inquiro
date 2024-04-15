import { ForeignKey } from "@server/types/db";

export const formatTablePrompt = (tableColumns: Record<string, string[]>) => {
  // format each table into
  // # <table_name> ( <column_1>, <column_2>, ... )
  return Object.entries(tableColumns)
    .map(([tableName, columns]) => {
      return `\t# ${tableName} ( ${columns.join(", ")} )`;
    })
    .join("\n");
};

export const formatForeignKeys = (foreignKeys: ForeignKey[]) => {
  return foreignKeys
    .map(
      (fk) =>
        `\t# ${fk.tableName}.${fk.columnName} = ${fk.foreignTable}.${fk.foreignColumn}`,
    )
    .join("\n");
};
