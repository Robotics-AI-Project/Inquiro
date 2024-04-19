"use client";

import Header from "@/client/components/pages/chat/header";
import MessageInput from "@/client/components/pages/chat/message-input";
import { useCreateMessage } from "@/client/hooks/message";
import { PropsWithChildren } from "react";

type Props = {
  params: {
    chatId: string;
  };
} & PropsWithChildren;

const Layout = ({ params: { chatId }, children }: Props) => {
  const { createMessage } = useCreateMessage(chatId);
  const onMessage = async (prompt: string) => {
    await createMessage({
      content: prompt,
    });
  };
  return (
    <main className="relative flex w-full flex-col overflow-scroll">
      {children}
      <Header chatId={chatId} />
      <MessageInput onMessage={onMessage} />
    </main>
  );
};

export default Layout;
