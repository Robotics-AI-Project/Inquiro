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
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const getChatById = async (userId: string, chatId: string) => {
  return metadataDb.chat.findFirst({
    where: {
      id: chatId,
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
  return metadataDb.chat.update({
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
  return metadataDb.chat.create({
    data: {
      name,
      userId,
    },
  });
};

export const deleteChatById = async (chatId: string) => {
  return metadataDb.chat.delete({
    where: {
      id: chatId,
    },
    select: {
      id: true,
    },
  });
};
