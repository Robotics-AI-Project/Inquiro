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

  if (!data || data.length === 0) return { messages: [], error, isLoading };

  const messageStatus =
    data[data.length - 1].messageType === "TEXT"
      ? data[data.length - 1].clarificationId
        ? "CLARIFICATION"
        : "PROMPT"
      : "PROMPT";

  return {
    messages: data,
    messageStatus,
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
      userFeedback,
      userQuery,
    }: {
      userQuery: string;
      userFeedback: string;
    }) => {
      const { data, error } = await backendClient.api["prompt-analysis"].post({
        chatId: chatId,
        userQuery,
        userFeedback,
      });
      if (error) throw new Error(error.name);
      return data;
    },
    onMutate: async ({ userQuery, userFeedback }) => {
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
            content: !userFeedback ? userQuery : userFeedback,
            agent: "USER",
            chatId,
            createdAt: new Date(),
            updatedAt: new Date(),
            id: "temp-id",
          },
          {
            content: "",
            agent: "CHATBOT",
            chatId,
            createdAt: new Date(),
            updatedAt: new Date(),
            id: "temp-id-bot",
          },
        ],
      );

      return { previousChatMessages };
    },

    onError: (_error, _data, context) => {
      queryClient.setQueryData(["chat", chatId], context?.previousChatMessages);
    },
    onSuccess: (data, _variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["chat", chatId],
      });
    },
  });

  return {
    createMessage: mutateAsync,
    isPending,
  };
};
