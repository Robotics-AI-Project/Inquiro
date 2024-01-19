import Header from "@/client/components/pages/chat/header";
import MessageInput from "@/client/components/pages/chat/message-input";
import { PropsWithChildren } from "react";

type Props = {
  params: {
    chatId: string;
  };
} & PropsWithChildren;

const Layout = ({ params: { chatId }, children }: Props) => {
  return (
    <main className="relative flex w-full flex-col overflow-scroll">
      {children}
      <Header />
      <MessageInput />
    </main>
  );
};

export default Layout;
