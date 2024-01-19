"use client";

import { Button } from "@/client/components/ui/button";
import { backendClient } from "@/client/libs/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";

type Props = {};

type ChatData = NonNullable<
  Awaited<ReturnType<typeof backendClient.api.chat.get>>["data"]
>;

const NewChat = (props: Props) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const { data, error } = await backendClient.api.chat.post({
        name: undefined,
      });
      if (error) throw new Error(error.name);
      return data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["chat"] });

      const previousChats = queryClient.getQueryData<ChatData>(["chat"]) ?? [];
      const newChat: ChatData[number] = {
        id: "OPTIMISTIC",
        name: "Untitled chat",
        updatedAt: new Date(),
      };

      // Optimistically update to the new value
      queryClient.setQueryData<ChatData>(["chat"], () => [
        ...previousChats,
        newChat,
      ]);

      // Return a context object with the snapshotted value
      return { previousChats };
    },
    onError: (err, newChat, context) => {
      queryClient.setQueryData(["chat"], context?.previousChats);
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData<ChatData>(["chat"], () => [
        ...context.previousChats,
        {
          id: data.id,
          name: data.name,
          updatedAt: data.updatedAt,
        },
      ]);
    },
  });
  return (
    <Button
      variant="outline"
      className="justify-between p-4 text-sm"
      onClick={async () => {
        await mutateAsync();
      }}
    >
      <p>New Chat</p>
      <Plus size={20} />
    </Button>
  );
};

export default NewChat;
