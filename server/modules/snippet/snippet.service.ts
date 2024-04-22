import { metadataDb } from "@/server/configs/db";

export const getAllSnippets = async (userId: string) => {
  return metadataDb.snippet.findMany({
    where: {
      userId,
    },
  });
};

export const createSnippet = async (
  userId: string,
  name: string,
  sql: string,
) => {
  return metadataDb.snippet.create({
    data: {
      userId,
      name,
      sql,
    },
  });
};

export const getSnippetById = async (userId: string, snippetId: string) => {
  return metadataDb.snippet.findFirst({
    where: {
      userId,
      id: snippetId,
    },
  });
};
