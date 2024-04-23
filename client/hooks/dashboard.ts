import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { backendClient } from "../libs/api";
import { VisualizationType } from "../types/data";

type Dashboard = Omit<
  NonNullable<
    Awaited<
      ReturnType<(typeof backendClient.api.dashboard)[":dashboardId"]["get"]>
    >["data"]
  >,
  "content"
> & {
  content:
    | {
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
      }[]
    | null;
};

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
    data: data as Dashboard | null | undefined,
    ...props,
  };
};

export const useUpdateDashboardContent = (dashboardId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-dashboard-content", dashboardId],
    mutationFn: async (content: Dashboard["content"]) => {
      const { data, error } = await backendClient.api.dashboard[
        dashboardId
      ].patch({
        content,
      });

      if (error) throw new Error(error.name);
      return data;
    },
    onMutate: async (content: Dashboard["content"]) => {
      await queryClient.cancelQueries({
        queryKey: ["dashboard", dashboardId],
      });

      queryClient.setQueryData<
        Awaited<ReturnType<typeof useGetDashboardById>["data"]>
      >(["dashboard", dashboardId], (old) => (old ? { ...old, content } : old));
    },
  });
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

export const useEditDashboardContent = (dashboardId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-dashboard-content", dashboardId],
    mutationFn: async (content: Dashboard["content"]) => {
      const { data, error } = await backendClient.api.dashboard[
        dashboardId
      ].patch({
        content,
      });

      if (error) throw new Error(error.name);
      return data;
    },
    onMutate: (content: Dashboard["content"]) => {
      queryClient.cancelQueries({
        queryKey: ["dashboard", dashboardId],
      });

      queryClient.setQueryData<Dashboard>(["dashboard", dashboardId], (old) => {
        if (!old) return old;
        return {
          ...old,
          content,
        };
      });
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
