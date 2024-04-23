import { metadataDb } from "@/server/configs/db";

export const getAllSnippets = async (userId: string, snippetIds?: string) => {
  return metadataDb.snippet.findMany({
    where: {
      userId,
      id: {
        in: snippetIds?.split(","),
      },
    },
    orderBy: {
      updatedAt: "desc",
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

export const updateSnippetById = async (
  snippetId: string,
  data: {
    name?: string;
  },
) => {
  return metadataDb.snippet.update({
    where: {
      id: snippetId,
    },
    data,
  });
};
