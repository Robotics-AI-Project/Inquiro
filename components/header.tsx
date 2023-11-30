"use client";
import { navList } from "@/constants/nav";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const basePath = `/${pathname.split("/")[1]}`.trim();
  const navItem = navList.find((navItem) => basePath === navItem.path);

  return (
    <header className="w-full border-b-[1px] border-border bg-background px-6 py-4 text-xl font-semibold">
      {navItem?.name}
    </header>
  );
};

export default Header;
