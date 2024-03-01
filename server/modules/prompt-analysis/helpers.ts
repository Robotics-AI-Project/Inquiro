// Import necessary modules
import { docsClient, openai, pineconeIndex } from "./initialization";

// Concat data from Google Docs Link
function concatenateText(contentData: any): string {
  let concatenatedString = "";

  contentData?.forEach((item: any) => {
    if (item?.paragraph && item.paragraph?.elements) {
      if (item?.paragraph?.bullet && item?.paragraph?.bullet?.listId) {
        concatenatedString += `• `; // Add bullet point
      }

      item.paragraph.elements.forEach((element: any) => {
        if (element?.textRun && element.textRun?.content) {
          concatenatedString += element.textRun.content;
        }
      });
    }
  });

  return concatenatedString;
}

// Function to remove specified words from each element in the array
export function removeWords(arr: string[]): string[] {
  return arr.map((word) => {
    // Initialize word to remove
    const wordsToRemove = ["max", "min", "average", "sum", "total", "distinct"];
    // Split the word into individual words
    const splitWords = word.split(" ");
    // Remove specified words
    const filteredWords = splitWords.filter(
      (w) => !wordsToRemove.includes(w.toLowerCase()),
    );
    // Join the remaining words back together
    return filteredWords.join(" ");
  });
}

// Make a GET request to the Google Drive API
export const getDocFile = async (documentId: string) => {
  try {
    const response = await docsClient.documents.get({
      documentId,
    });
    if (!response.data.body) return { docs: "", title: response.data.title };
    const docs = concatenateText(response.data.body.content);
    const title = response.data.title;
    return { docs, title };
  } catch (error: any) {
    console.error("Error getting docs files:", error.message);
  }
};

export const getKnowledgeBase = async (userQuery: string) => {
  // Embed user query
  const userQueryResponse = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: userQuery,
  });
  const userQueryEmbedded: number[] = userQueryResponse.data[0].embedding;
  if (!userQueryEmbedded) throw new Error("Error embedding user query");
  let similarArticlesAll = "";
  while (true) {
    try {
      const result = await pineconeIndex.query({
        topK: 3,
        vector: userQueryEmbedded,
        includeMetadata: true,
      });
      // IDs of the 3 most similar articles
      const similarArticleUrl = result.matches.map(
        (match: any) => match.metadata,
      );
      let doc, docID;
      for (const article of similarArticleUrl) {
        docID = article.url.split("/d/")[1];
        doc = await getDocFile(docID);
        if (!doc) continue;
        similarArticlesAll = similarArticlesAll + doc.docs;
      }
      return similarArticlesAll;
      // Fetch the similar article
    } catch (error) {
      // Handle the error
      console.error(
        "An error occurred while querying the Pinecone index:",
        error,
      );
    }
  }
};
