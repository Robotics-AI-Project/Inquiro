import { useMutation } from "@tanstack/react-query";
import { backendClient } from "../libs/api";
import { revalidatePath } from "next/cache";

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
    onSuccess: () => {
      revalidatePath(`/chat/${chatId}`);
    },
  });

  return {
    createMessage: mutateAsync,
    isPending,
  };
};
