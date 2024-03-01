"use client";

import { Skeleton } from "@/client/components/ui/skeleton";
import { useChatList } from "@/client/hooks/chat";
import { getAllChats, getChatById } from "@/server/modules/chat/chat.service";
import { ChatData } from "@/types/chat";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type Props = {
  chatId?: string;
};

const useChatTitle = (chatId?: string) => {
  const { data, isLoading } = useChatList();
  if (!chatId)
    return {
      title: "New chat",
      isLoading: false,
    };
  const chat = data?.find((chat) => chat.id === chatId);
  return {
    title: chat?.name || "Untitled Chat",
    isLoading,
  };
};

export const HeaderTitle = ({ chatId }: Props) => {
  const { title, isLoading } = useChatTitle(chatId);

  if (isLoading) return <Skeleton className="h-7 w-36" />;

  return <h1 className="text-xl font-semibold">{title}</h1>;
};
