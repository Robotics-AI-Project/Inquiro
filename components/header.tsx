"use client";
import { navList } from "@/constants/nav";
import { usePathname } from "next/navigation";
import { Badge } from "./ui/badge";

const Header = () => {
  const pathname = usePathname();
  const basePath = `/${pathname.split("/")[1]}`.trim();
  const navItem = navList.find((navItem) => basePath === navItem.path);

  return (
    <header className="flex w-full gap-2 border-b-[1px] border-border bg-background px-6 py-4 text-xl font-semibold">
      {navItem?.name}
      <Badge variant="secondary" className="rounded-md text-xs">
        Beta
      </Badge>
    </header>
  );
};

export default Header;
