import { useMutation } from "@tanstack/react-query";
import { backendClient } from "../libs/api";

export const useCreateSnippet = (sql: string) => {
  return useMutation({
    mutationKey: ["create-snippet", sql],
    mutationFn: async ({ name }: { name: string }) => {
      const { data, error } = await backendClient.api.snippet.post({
        name,
        sql,
      });
      if (error) throw new Error(error.name);
      return data;
    },
  });
};
