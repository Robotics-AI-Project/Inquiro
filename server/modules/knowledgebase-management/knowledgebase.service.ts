// Import necessary modules
import { PINECONE_INDEX_NAME } from "../prompt-analysis/constants";
import { getDocFile } from "../prompt-analysis/helpers";
import {
  driveClient,
  openai,
  pinecone,
  pineconeIndex,
} from "../prompt-analysis/initialization";

export const deleteKnowledgeBase = async () => {
  return await pinecone.deleteIndex(PINECONE_INDEX_NAME);
};

export const createKnowledgeBase = async () => {
  return await pinecone.createIndex({
    name: PINECONE_INDEX_NAME,
    dimension: 1536,
    metric: "cosine",
    spec: {
      pod: {
        environment: "gcp-starter",
        podType: "p1.x1",
      },
    },
  });
};

export const addKnowledgeBaseFromGoogleDriveFolderID = async (
  folderID: string,
) => {
  // Get all file data from Google Drive folder
  const response = await driveClient.files.list({
    q: `'${folderID}' in parents`,
    fields: folderID,
  });
  if (!response.data.files) throw new Error("getFileIDFromDrive is invalid.");

  // Get all file IDs from Google Drive folder
  const fileIDList = response.data.files.map((file: any) => file.id);

  for (const file of fileIDList) {
    // get file data and title from file ID
    const docInfo = await getDocFile(file);
    if (!docInfo) continue;
    const { docs: fileData, title: title } = docInfo;

    // embed data
    let response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: fileData,
    });

    // Extract the embeddings
    let embeddings = response.data.map((doc: any) => doc.embedding);

    // Insert the embeddings into the Pinecone index
    while (true) {
      try {
        await pineconeIndex.upsert([
          {
            id: title ?? "",
            values: embeddings[0],
            metadata: { url: `https://docs.google.com/document/d/${file}` },
          },
        ]);
        break;
      } catch (error) {
        // Handle the error
        console.error(
          "An error occurred while upserting the Pinecone index:",
          error,
        );
      }
    }
  }
  return true;
};

export const addKnowledgeBaseFromGoogleDoc = async (fileID: string) => {
  // Get file data from file ID
  const docInfo = await getDocFile(fileID);
  if (!docInfo) throw new Error("docInfo is invalid.");
  const { docs: fileData, title: title } = docInfo;

  // embed data
  let response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: fileData,
  });

  // Extract the embeddings
  let embeddings = response.data.map((doc: any) => doc.embedding);

  // Insert the embeddings into the Pinecone index
  while (true) {
    try {
      await pineconeIndex.upsert([
        {
          id: title ?? "",
          values: embeddings[0],
          metadata: { url: `https://docs.google.com/document/d/${fileID}` },
        },
      ]);
      break;
    } catch (error) {
      // Handle the error
      console.error(
        "An error occurred while upserting the Pinecone index:",
        error,
      );
    }
  }
  return true;
};
