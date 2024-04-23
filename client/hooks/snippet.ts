import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
      const { data, error } = await backendClient.api.snippet.get({
        $query: {},
      });
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

export const useSnippetRename = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["rename-snippet", id],
    mutationFn: async ({ name }: { name: string }) => {
      const { data, error } = await backendClient.api.snippet[id].put({ name });
      if (error) throw new Error(error.name);
      return data;
    },
    onMutate: async ({ name }) => {
      await queryClient.cancelQueries({ queryKey: ["get-all-snippets"] });

      queryClient.setQueryData<
        Awaited<ReturnType<typeof backendClient.api.snippet.get>>["data"]
      >(["get-all-snippets"], (old) => {
        const snippetData = old?.find((snippet) => snippet.id === id);

        if (!snippetData) return old;

        return [
          {
            ...snippetData,
            name,
          },
          ...(old?.filter((snippet) => snippet.id !== id) ?? []),
        ];
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-snippet-by-id", id],
      });
    },
  });
};

export const useGetMultipleSnippets = (ids?: string[]) => {
  return useQuery({
    queryKey: ["get-multiple-snippets", ids],
    queryFn: async () => {
      if (!ids) return Promise.resolve([]);
      const { data, error } = await backendClient.api.snippet.get({
        $query: {
          snippetIds: ids.join(","),
        },
      });
      if (error) throw new Error(error.name);
      return data;
    },
    enabled: !!ids,
  });
};
