import { useMutation, useQuery } from "@tanstack/react-query";
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

export const useGetAllSnippets = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["get-all-snippets"],
    queryFn: async () => {
      const { data, error } = await backendClient.api.snippet.get();
      if (error) throw new Error(error.name);
      return data;
    },
  });

  return {
    data,
    error,
    isLoading,
    isError,
  };
};

export const useGetSnippetById = (id: string) => {
  return useQuery({
    queryKey: ["get-snippet-by-id", id],
    queryFn: async () => {
      const { data, error } = await backendClient.api.snippet[id].get();
      if (error) throw new Error(error.name);
      return data;
    },
  });
};
