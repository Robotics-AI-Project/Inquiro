import EmptyDisplay from "@/client/components/empty-display";
import { getAllMessages } from "@/server/modules/message/message.service";
import Message from "@client/components/pages/chat/message";
import Visualization from "@client/components/pages/chat/visualization";
import { ScrollArea } from "@client/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@client/components/ui/select";
import { setTimeout } from "timers/promises";

type Props = {
  params: {
    chatId: string;
  };
};

const Page = async ({ params: { chatId } }: Props) => {
  const messages = await getAllMessages(chatId);
  console.log("messages", messages);
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
