"use client";
import MessageSkeleton from "@/client/components/pages/chat/message/skeleton";
import { useGetMessages } from "@/client/hooks/message";
import Message from "@client/components/pages/chat/message";
import { ScrollArea } from "@client/components/ui/scroll-area";

type Props = {
  params: {
    chatId: string;
  };
};

const Page = ({ params: { chatId } }: Props) => {
  const { error, isLoading, messages = [] } = useGetMessages(chatId);

  if (isLoading)
    return (
      <div>
        <div className="mx-auto h-[calc(100vh-60px-6rem)] w-[800px]">
          <div className="h-[72px]" />
          <div className="space-y-14">
            <MessageSkeleton />
            <MessageSkeleton />
            <MessageSkeleton />
          </div>
        </div>
      </div>
    );
  if (error) return <div>Error {JSON.stringify(error)}</div>;

  return (
    <ScrollArea className="h-[calc(100vh-60px-6rem)]">
      <div className="h-[72px]" />
      {messages.map((message) => (
        <Message key={message.id} agent={message.agent}>
          {message.content}
        </Message>
      ))}
    </ScrollArea>
  );
};

export default Page;
