import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Static, t } from "elysia";
import { backendClient } from "../libs/api";
import { VisualizationType } from "../types/data";

export const useDashboardList = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const { data, error } = await backendClient.api.dashboard.get();
      if (error) throw new Error(error.name);
      return data;
    },
  });
};

export const useGetDashboardById = (dashboardId: string) => {
  const { data, ...props } = useQuery({
    queryKey: ["dashboard", dashboardId],
    queryFn: async () => {
      const { data, error } =
        await backendClient.api.dashboard[dashboardId].get();
      if (error) throw new Error(error.name);
      return data;
    },
  });

  return {
    data: data as
      | (Omit<NonNullable<typeof data>, "content"> & {
          content: {
            layout: {
              i: string;
              x: number;
              y: number;
              w: number;
              h: number;
              minW: number;
              minH: number;
            };
            config: {
              visualizationType: VisualizationType;
            };
          }[];
        })
      | null
      | undefined,
    ...props,
  };
};

export const useRenameDashboard = (dashboardId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["rename-dashboard", dashboardId],
    mutationFn: async (name: string) => {
      const { data, error } = await backendClient.api.dashboard[
        dashboardId
      ].patch({
        name,
      });

      if (error) throw new Error(error.name);
      return data;
    },
    onMutate: async (name: string) => {
      await queryClient.cancelQueries({
        queryKey: ["dashboard"],
      });

      queryClient.setQueryData<
        Awaited<ReturnType<typeof useDashboardList>["data"]>
      >(["dashboard", dashboardId], (old) => (old ? { ...old, name } : old));

      queryClient.setQueryData<
        Awaited<ReturnType<typeof backendClient.api.dashboard.get>>["data"]
      >(["dashboard"], (old) => {
        const dashboardData = old?.find(
          (dashboard) => dashboard.id === dashboardId,
        );

        if (!dashboardData) return old;

        return [
          {
            ...dashboardData,
            name,
          },
          ...(old?.filter((dashboard) => dashboard.id !== dashboardId) ?? []),
        ];
      });
    },
  });
};

const ContentType = t.Object(t.Any());
type ContentType = Static<typeof ContentType>;

export const useEditDashboardContent = (dashboardId: string) => {
  return useMutation({
    mutationKey: ["edit-dashboard-content", dashboardId],
    mutationFn: async (content: ContentType) => {
      const { data, error } = await backendClient.api.dashboard[
        dashboardId
      ].patch({
        content,
      });

      if (error) throw new Error(error.name);
      return data;
    },
  });
};

export const useCreateDashboard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-dashboard"],
    mutationFn: async () => {
      const { data, error } = await backendClient.api.dashboard.post({
        name: undefined,
      });

      if (error) throw new Error(error.name);
      return data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["dashboard"],
      });

      const previousChats =
        queryClient.getQueryData<
          Awaited<ReturnType<typeof useDashboardList>["data"]>
        >(["dashboard"]) ?? [];

      queryClient.setQueryData(
        ["dashboard"],
        (oldData: typeof previousChats) => {
          return [
            {
              id: "CREATING",
              name: "Untitled Dashboard",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            ...oldData,
          ];
        },
      );

      return { previousChats };
    },
    onSuccess: async (_, __, ___) => {
      await queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["dashboard"], context?.previousChats);
    },
  });
};
