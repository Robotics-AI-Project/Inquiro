"use client";

import ListButton from "@/client/components/list-button";
import { useChatList, useDeleteChat } from "@/client/hooks/chat";
import { Skeleton } from "@client/components/ui/skeleton";
import { useParams, useRouter } from "next/navigation";

const ChatList = () => {
  const { chatId } = useParams<{ chatId?: string }>();
  const router = useRouter();
  const { data, error, isLoading, isError } = useChatList();
  const { deleteChat } = useDeleteChat();

  if (isLoading) return <ChatSkeleton />;
  if (isError) {
    return (
      <div className="flex h-40 flex-col items-center justify-center space-y-2 rounded-xl bg-red-500 text-sm text-white">
        <p>Failed to fetch chat data</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

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

  const onNavigate = (id: string) => {
    router.push(`/chat/${id}`);
  };

  return Object.keys(groupedData).map((key) => {
    const chats = groupedData[key];
    if (chats.length === 0) return null;
    return (
      <div key={key} className="flex flex-col space-y-1 text-sm">
        <p className="relative left-3 text-gray-500">{key}</p>
        {chats.map((chat) => {
          const isSelected = chatId === chat.id;
          return (
            <ListButton
              key={chat.id}
              id={chat.id}
              isSelected={isSelected}
              name={chat.name}
              onClick={onNavigate}
              onDelete={async () => {
                router.push(`/chat`);
                deleteChat(chat.id);
              }}
              onRename={() => {}}
              disabled={chat.id === "OPTIMISTIC"}
              loading={chat.id === "OPTIMISTIC"}
            />
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
