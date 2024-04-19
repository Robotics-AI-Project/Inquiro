import { cn } from "@/client/libs/utils";

import { MessagesSquare } from "lucide-react";
import { HeaderTitle } from "./header-title";

type Props = {
  chatId?: string;
};

const Header = ({ chatId }: Props) => {
  return (
    <div
      className={cn(
        "absolute left-0 top-0 z-0 flex w-full items-center justify-between bg-transparent px-6 py-4",
        "bg-gradient-to-t from-transparent via-white/80 to-white backdrop-blur-[1px]",
      )}
    >
      <div className="flex items-center space-x-2">
        <MessagesSquare className="h-6 w-6" />
        <HeaderTitle chatId={chatId} />
      </div>
    </div>
  );
};

export default Header;
