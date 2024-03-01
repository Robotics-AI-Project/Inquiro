import Header from "@/client/components/pages/chat/header";
import MessageInput from "@/client/components/pages/chat/message-input";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-end">
      <Header />
      <MessageInput />
    </div>
  );
};

export default Page;
