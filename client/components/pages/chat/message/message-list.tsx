"use client";

import { Message } from "@/types/message";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import MessageItem from ".";
import QueryDisplay from "./query-display";

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
          {message.messageType === "SQL" ? (
            <QueryDisplay sql={message.content} />
          ) : (
            <ReactMarkdown>{message.content}</ReactMarkdown>
          )}
        </MessageItem>
      ))}
      <div ref={endOfChatRef} />
    </>
  );
};

export default MessageList;
