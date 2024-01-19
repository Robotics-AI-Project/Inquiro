import ChatSidebar from "@/client/components/pages/chat/sidebar";
import Toolbar from "@/client/components/toolbar";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

const Layout = ({ children }: Props) => {
  return (
    <div className="flex h-full">
      <div className="flex h-full">
        <Toolbar className="w-56">
          <ChatSidebar />
        </Toolbar>
      </div>
      {children}
    </div>
  );
};

export default Layout;
