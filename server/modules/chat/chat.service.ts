import { metadataDb } from "@/server/configs/db";

export const getAllChats = async (userId: string) => {
  return await metadataDb.chat.findMany({
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

export const updateChatById = async (
  chatId: string,
  data: {
    name?: string;
  },
) => {
  return await metadataDb.chat.update({
    where: {
      id: chatId,
    },
    data,
  });
};

export const createChat = async (
  userId: string,
  name: string | undefined = "Untitled chat",
) => {
  return await metadataDb.chat.create({
    data: {
      name,
      userId,
    },
  });
};

export const deleteChatById = async (chatId: string) => {
  return await metadataDb.chat.delete({
    where: {
      id: chatId,
    },
    select: {
      id: true,
    },
  });
};
