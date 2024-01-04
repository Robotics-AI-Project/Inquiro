import { auth } from "@clerk/nextjs";
import { getAllChats, getChatById } from "./chat.service";

export const getAllChatsController = async () => {
  const { userId } = auth();
  if (!userId) return new Response("No user id found!", { status: 400 });

  return getAllChats(userId);
};

export const getChatByIdController = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { userId } = auth();
  if (!userId) return new Response("No user id found!", { status: 400 });

  return getChatById(userId, params.id);
};
