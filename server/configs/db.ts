import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

export const metadataDb = new PrismaClient();

export const enterpriseDb = new Pool({
  connectionString: process.env.ENTERPRISE_DATABASE_URL,
});
