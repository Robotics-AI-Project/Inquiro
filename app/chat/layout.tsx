import AppLayout from "@/client/components/app-layout";
import ChatSidebar from "@/client/components/pages/chat/sidebar";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

const Layout = ({ children }: Props) => {
  return <AppLayout sideBar={<ChatSidebar />}>{children}</AppLayout>;
};

export default Layout;
