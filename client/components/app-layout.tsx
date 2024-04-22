import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/client/components/ui/resizable";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  sideBar: React.ReactNode;
};

const AppLayout = ({ children, sideBar }: Props) => {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        defaultSize={15}
        minSize={10}
        maxSize={20}
        className="p-4"
      >
        {sideBar}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="w-full">{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default AppLayout;
