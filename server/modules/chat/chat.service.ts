import { metadataDb } from "@/server/configs/db";

export const getAllChats = async (userId: string) => {
  return metadataDb.chat.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      updatedAt: true,
    },
  });
};

export const getChatMessagesById = (chatId: string) => {
  return metadataDb.message.findMany({
    where: {
      chatId,
    },
  });
};

export const createChat = async (
  userId: string,
  name: string | undefined = "Untitled chat",
) => {
  return metadataDb.chat.create({
    data: {
      name,
      userId,
    },
  });
};
