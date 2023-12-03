"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { PropsWithChildren, useMemo } from "react";

type Props = {
  agent: "user" | "bot";
} & PropsWithChildren;

const Message = ({ agent, children }: Props) => {
  const { user, isLoaded } = useUser();

  const imageUrl = useMemo(() => {
    if (agent === "bot") return "/assets/inquiro-profile.svg";
    return user?.imageUrl ?? "/assets/user-profile.png";
  }, [agent, user?.imageUrl]);
  return (
    <div
      className={cn("flex items-start justify-center gap-4 py-7", {
        "bg-[#F9F9F9]": agent === "bot",
        "bg-white": agent === "user",
      })}
    >
      <div className="relative h-6 w-6 overflow-hidden rounded-full">
        {agent === "user" && !isLoaded ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <Image src={imageUrl} fill alt="profile-image" />
        )}
      </div>
      <div className="w-[800px]">
        <h2 className="font-semibold">
          {agent === "user" ? "You" : "Inquiro"}
        </h2>
        <div className="w-full space-y-4">{children}</div>
      </div>
    </div>
  );
};

export default Message;
