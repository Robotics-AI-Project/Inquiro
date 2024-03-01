import * as fs from "fs";

// Initialize Pinecone
export const PINECONE_INDEX_NAME = "knowledgebase";

// File Path
export const MODULE_0_SCRIPT = fs.readFileSync("./txt/module_0.txt", "utf8");
export const MODULE_0_5_SCRIPT = fs.readFileSync(
  "./txt/module_0_5.txt",
  "utf8",
);
export const MODULE_1_SCRIPT = fs.readFileSync("./txt/module_1.txt", "utf8");
export const MODULE_2_SCRIPT = fs.readFileSync("./txt/module_2.txt", "utf8");
export const MODULE_3_SCRIPT = fs.readFileSync("./txt/module_3.txt", "utf8");
