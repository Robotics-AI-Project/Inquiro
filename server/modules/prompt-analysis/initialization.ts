// Import necessary modules
import { Pinecone } from "@pinecone-database/pinecone";
import { google } from "googleapis";
import OpenAI from "openai";
import { PINECONE_INDEX_NAME } from "../prompt-analysis/constants";

// prompt-analysis.service.ts and knowledgebase.service.ts use these initialization

// Initialize OpenAI
const openai_apiKey = process.env.OPENAI_API_KEY;
export const openai = new OpenAI({ apiKey: openai_apiKey });

// Initialize Pinecone
const pinecone_apiKey = process.env.PINECONE_API_KEY;
if (!pinecone_apiKey) throw new Error("pinecone_apiKey is invalid.");
export const pinecone = new Pinecone({ apiKey: pinecone_apiKey });
export const pineconeIndex = pinecone.index(PINECONE_INDEX_NAME);

// Initilize Google
const authClient = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY,
  },
  scopes: [
    "https://www.googleapis.com/auth/documents.readonly",
    "https://www.googleapis.com/auth/drive.readonly",
  ],
});

export const driveClient = google.drive({ version: "v3", auth: authClient });
export const docsClient = google.docs({ version: "v1", auth: authClient });
