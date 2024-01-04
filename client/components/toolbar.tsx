import { cn } from "@/client/libs/utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";

const Toolbar = ({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return (
    <aside
      className={cn("border-r-[1px] border-border p-4", className)}
      {...props}
    >
      {children}
    </aside>
  );
};

export default Toolbar;
