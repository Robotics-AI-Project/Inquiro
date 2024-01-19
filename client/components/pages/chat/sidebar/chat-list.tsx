"use client";

import { cn } from "@/client/libs/utils";
import { Button } from "@client/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@client/components/ui/dropdown-menu";
import { Skeleton } from "@client/components/ui/skeleton";
import { backendClient } from "@client/libs/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const ChatList = () => {
  const { chatId } = useParams<{ chatId?: string }>();
  const router = useRouter();
  const { data, error, isFetching } = useQuery({
    queryKey: ["chat"],
    queryFn: async () => {
      const { data, error } = await backendClient.api.chat.get();
      if (error) throw new Error(error.name);
      return data;
    },
  });

  if (isFetching) return <ChatSkeleton />;
  if (error) {
    return (
      <div className="flex h-40 flex-col items-center justify-center space-y-2 rounded-xl bg-red-500 text-sm text-white">
        <p>Failed to fetch chat data</p>
      </div>
    );
  }

  console.log(data);

  const groupedData =
    data
      ?.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
      .reduce(
        (acc, chat) => {
          const today = new Date();
          const updatedAt = new Date(chat.updatedAt);
          const diffTime = Math.abs(today.getTime() - updatedAt.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          console.log(diffDays);

          const key =
            diffDays <= 1 ? "Today" : diffDays <= 7 ? "7 days ago" : "Others";
          acc[key].push(chat);
          return acc;
        },
        {
          Today: [],
          "7 days ago": [],
          Others: [],
        } as Record<string, NonNullable<typeof data>>,
      ) ?? {};

  return Object.keys(groupedData).map((key) => {
    const chats = groupedData[key];
    if (chats.length === 0) return null;
    return (
      <div key={key} className="flex flex-col space-y-1 text-sm">
        <p className="relative left-3 text-gray-500">{key}</p>
        {chats.map((chat) => {
          const isSelected = chatId === chat.id;
          return (
            <Button
              key={chat.id}
              variant={isSelected ? "secondary" : "ghost"}
              className={cn(
                "h-auto w-auto justify-start gap-2 px-3 py-[6px]",
                !isSelected && "font-normal",
              )}
              onClick={() => router.push(`/chat/${chat.id}`)}
              disabled={chat.id === "OPTIMISTIC"}
            >
              {chat.id === "OPTIMISTIC" && <Loader2 className="animate-spin" />}
              <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-start ">
                {chat.name}
              </p>
              {isSelected && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="rounded-lg">
                    <Button
                      asChild
                      variant="secondary"
                      className="h-auto w-auto rounded-sm p-0"
                    >
                      <MoreHorizontal size={20} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="rounded-lg">
                    <DropdownMenuItem className="rounded-md">
                      <div className="flex items-center space-x-2">
                        <Pencil size={18} />
                        <p>Rename</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-md text-red-500 focus:bg-red-200 focus:text-red-600">
                      <div className="flex items-center space-x-2">
                        <Trash size={18} />
                        <p>Delete chat</p>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </Button>
          );
        })}
      </div>
    );
  });
};

const ChatSkeleton: React.FC = () => (
  <>
    <div className="flex flex-col space-y-2 text-sm">
      <Skeleton className="relative left-3 h-4 w-1/2" />
      <Skeleton className="ml-3 mr-1 h-6 w-auto" />
    </div>
    <div className="flex flex-col space-y-2 text-sm">
      <Skeleton className="relative left-3 h-4 w-1/2" />
      <Skeleton className="ml-3 mr-1 h-6 w-auto" />
      <Skeleton className="ml-3 mr-1 h-6 w-auto" />
      <Skeleton className="ml-3 mr-1 h-6 w-auto" />
    </div>
    <div className="flex flex-col space-y-2 text-sm">
      <Skeleton className="relative left-3 h-4 w-1/2" />
      <Skeleton className="ml-3 mr-1 h-6 w-auto" />
      <Skeleton className="ml-3 mr-1 h-6 w-auto" />
      <Skeleton className="ml-3 mr-1 h-6 w-auto" />
    </div>
  </>
);

export default ChatList;
