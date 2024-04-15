import { PrismaClient } from "@prisma/client";
import Database from "better-sqlite3";

export const enterpriseDb = new Database("db.sqlite", { readonly: true });
export const metadataDb = new PrismaClient();
