export type ForeignKey = {
  tableName: string;
  foreignTable: string;
  columnName: string;
  foreignColumn: string;
};

export type TableColumns = Record<string, string[]>;
