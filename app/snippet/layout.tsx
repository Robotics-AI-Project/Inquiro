import AppLayout from "@/client/components/app-layout";
import SnippetSidebar from "@/client/components/pages/snippet/sidebar";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

const Layout = ({ children }: Props) => {
  return <AppLayout sideBar={<SnippetSidebar />}>{children}</AppLayout>;
};

export default Layout;
