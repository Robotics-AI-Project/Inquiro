import { PropsWithChildren } from "react";

const Toolbar = ({ children }: PropsWithChildren) => {
  return <aside className="border-r-[1px] border-border p-4">{children}</aside>;
};

export default Toolbar;
