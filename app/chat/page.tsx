import EmptyDisplay from "@/client/components/empty-display";
import Header from "@/client/components/pages/chat/header";
import MessageInput from "@/client/components/pages/chat/message-input";
import { MessageCircle } from "lucide-react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between">
      <Header />
      <div />
      <EmptyDisplay icon={MessageCircle} title="Enter your query" />
      <MessageInput />
    </div>
  );
};

export default Page;
