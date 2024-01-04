export const getAllChats = (userId: string) =>
  `Hello from chat service with id ${userId}!`;

export const getChatById = (userId: string, chatId: string) => {
  return `Hello from chat service with id ${userId} and chat id ${chatId}!`;
};
