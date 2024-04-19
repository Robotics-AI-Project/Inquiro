"use client";

import Header from "@/client/components/pages/chat/header";
import MessageInput from "@/client/components/pages/chat/message-input";
import { useCreateMessage, useGetMessages } from "@/client/hooks/message";
import { PropsWithChildren } from "react";

type Props = {
  params: {
    chatId: string;
  };
} & PropsWithChildren;

const Layout = ({ params: { chatId }, children }: Props) => {
  const { messageStatus, messages } = useGetMessages(chatId);
  const { createMessage } = useCreateMessage(chatId);
  const userMessages = messages.filter((message) => message.agent === "USER");

  const onMessage = async (prompt: string) => {
    if (userMessages.length === 0) {
      await createMessage({ userQuery: prompt, userFeedback: "" });
      return;
    }
    await createMessage({
      userQuery:
        messageStatus === "PROMPT"
          ? prompt
          : userMessages[userMessages.length - 1].content,
      userFeedback: messageStatus === "CLARIFICATION" ? prompt : "",
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
