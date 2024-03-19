"use client";

import { Message } from "@/types/message";
import { useEffect, useRef } from "react";
import MessageItem from ".";

type Props = {
  messages: Message[];
};

const MessageList = ({ messages }: Props) => {
  const endOfChatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({ behavior: "instant" });
  }, []);
  return (
    <>
      {messages.map((message) => (
        <MessageItem key={message.id} agent={message.agent}>
          {message.content}
        </MessageItem>
      ))}
      <div ref={endOfChatRef} />
    </>
  );
};

export default MessageList;
