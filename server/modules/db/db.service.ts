import { ExecutedData } from "@/client/types/data";
import { enterpriseDb } from "@/server/configs/db";

export const executeSQL = (sql: string) => {
  const stmt = enterpriseDb.prepare(sql);
  return stmt.all() as ExecutedData;
};
