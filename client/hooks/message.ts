import { useMutation, useQuery } from "@tanstack/react-query";
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
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["create-message", chatId],
    mutationFn: async (content: string) => {
      const { data, error } = await backendClient.api.message[chatId].post({
        content,
      });
      if (error) throw new Error(error.name);
      return data;
    },
  });

  return {
    createMessage: mutateAsync,
    isPending,
  };
};
