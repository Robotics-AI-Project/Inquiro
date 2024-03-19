import { metadataDb } from "@/server/configs/db";

export const getAllMessages = async (chatId: string) => {
  const data = await metadataDb.message.findMany({
    where: {
      chatId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return data;
};

export const createMessage = async (
  chatId: string,
  content: string,
  agent: "USER" | "CHATBOT" = "USER",
) => {
  return await metadataDb.message.create({
    data: {
      chatId,
      content,
      agent,
    },
  });
};
