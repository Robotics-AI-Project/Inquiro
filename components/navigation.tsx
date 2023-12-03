"use client";

import { navList } from "@/constants/nav";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const Navigation = () => {
  const pathname = usePathname();
  const basePath = `/${pathname.split("/")[1]}`.trim();
  return (
    <nav className="flex w-full min-w-[32px] flex-col gap-1">
      {navList.map((navItem) => {
        const isActive = basePath === navItem.path;
        return (
          <Link
            href={navItem.path}
            key={navItem.path}
            className={cn(
              "relative flex items-center transition-all duration-150",
              isActive
                ? "font-semibold text-secondary-foreground group-hover:bg-secondary"
                : "text-foreground hover:bg-muted",
            )}
          >
            <Button
              asChild
              variant={isActive ? "secondary" : "ghost"}
              className={"h-8 w-8 p-[6px]"}
            >
              {navItem.icon}
            </Button>
            <p className="absolute left-8 hidden whitespace-nowrap p-[6px] text-sm group-hover:block">
              {navItem.name}
            </p>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;