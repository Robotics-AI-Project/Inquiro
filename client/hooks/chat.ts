import { ChatData } from "@/types/chat";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { backendClient } from "../libs/api";

export const useChatList = () => {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["chat"],
    queryFn: async () => {
      const { data, error } = await backendClient.api.chat.get();
      if (error) throw new Error(error.name);
      return data;
    },
  });

  return {
    data,
    isError,
    isLoading,
    error,
  };
};

export const useDeleteChat = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteChat } = useMutation({
    mutationFn: async (chatId: string) => {
      const { data, error } = await backendClient.api.chat[chatId].delete();
      if (error) throw new Error(error.name);
      return data;
    },
    // Optimistic Update
    onMutate: async (chatId: string) => {
      await queryClient.cancelQueries({ queryKey: ["chat"] });

      const previousChats = queryClient.getQueryData<ChatData>(["chat"]) ?? [];

      // Optimistically update to the new value
      queryClient.setQueryData<ChatData>(
        ["chat"],
        previousChats.filter((chat) => chat.id !== chatId),
      );

      // Return a context object with the snapshotted value
      return { previousChats };
    },
    onError: (_error, _chatId, context) => {
      queryClient.setQueryData(["chat"], context?.previousChats);
    },
  });

  return {
    deleteChat,
  };
};

export const useCreateChat = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: createChat, isPending } = useMutation({
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
    onError: (_err, _newChat, context) => {
      queryClient.setQueryData(["chat"], context?.previousChats);
    },
    onSuccess: (data, _variables, context) => {
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

  return {
    createChat,
    isPending,
  };
};
