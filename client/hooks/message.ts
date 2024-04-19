import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { backendClient } from "../libs/api";

export const useGetMessages = (chatId: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const { data, error } = await backendClient.api.message[chatId].get();
      if (error) throw new Error(error.name);
      return data;
    },
  });

  return {
    messages: data,
    error,
    isLoading,
  };
};

export const useCreateMessage = (chatId: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    // Optimistic Update
    mutationKey: ["create-message", chatId],
    mutationFn: async ({
      content,
      agent = "USER",
    }: {
      content: string;
      agent?: "USER" | "CHATBOT";
    }) => {
      const { data, error } = await backendClient.api.message[chatId].post({
        content,
        agent,
      });
      if (error) throw new Error(error.name);
      return data;
    },
    onMutate: async ({ content, agent = "USER" }) => {
      await queryClient.cancelQueries({ queryKey: ["chat", chatId] });

      const previousChatMessages =
        queryClient.getQueryData<
          {
            id: string;
            content: string;
            agent: "USER" | "CHATBOT";
            chatId: string;
            createdAt: Date;
            updatedAt: Date;
          }[]
        >(["chat", chatId]) ?? [];

      // Optimistically update to the new value
      queryClient.setQueryData(
        ["chat", chatId],
        [
          ...previousChatMessages,
          {
            content,
            agent,
            chatId,
            createdAt: new Date(),
            updatedAt: new Date(),
            id: "temp-id",
          },
        ],
      );

      return { previousChatMessages };
    },

    onError: (_error, _data, context) => {
      queryClient.setQueryData(["chat", chatId], context?.previousChatMessages);
    },
  });

  return {
    createMessage: mutateAsync,
    isPending,
  };
};
