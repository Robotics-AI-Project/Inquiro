import { cn } from "@/client/libs/utils";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  title: string;
  className?: string;
}>;

const OptionSection = ({ title, children, className }: Props) => {
  return (
    <div>
      <p className="border-b-[1px] border-border px-4 py-2 font-semibold">
        {title}
      </p>
      <div className={cn("px-4 py-3 text-sm", className)}>{children}</div>
    </div>
  );
};

export default OptionSection;
