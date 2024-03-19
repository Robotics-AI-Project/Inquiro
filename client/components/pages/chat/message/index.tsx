"use client";

import { cn } from "@/client/libs/utils";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@client/components/ui/skeleton";
import Image from "next/image";
import { PropsWithChildren, useMemo } from "react";

type Props = {
  agent: "USER" | "CHATBOT";
} & PropsWithChildren;

const MessageItem = ({ agent, children }: Props) => {
  const { user, isLoaded } = useUser();

  const imageUrl = useMemo(() => {
    if (agent === "CHATBOT") return "/assets/inquiro-profile.svg";
    return user?.imageUrl ?? "/assets/user-profile.png";
  }, [agent, user?.imageUrl]);
  return (
    <div
      className={cn("flex items-start justify-center gap-4 py-7", {
        "bg-[#F9F9F9]": agent === "CHATBOT",
        "bg-white": agent === "USER",
      })}
    >
      <div className="relative h-6 w-6 overflow-hidden rounded-full">
        {agent === "USER" && !isLoaded ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <Image src={imageUrl} fill alt="profile-image" />
        )}
      </div>
      <div className="w-[800px]">
        <h2 className="font-semibold">
          {agent === "USER" ? "You" : "Inquiro"}
        </h2>
        <div className="w-full space-y-4">{children}</div>
      </div>
    </div>
  );
};

export default MessageItem;
