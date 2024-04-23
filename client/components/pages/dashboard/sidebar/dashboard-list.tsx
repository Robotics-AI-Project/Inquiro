"use client";

import ListButton from "@/client/components/list-button";
import { Skeleton } from "@/client/components/ui/skeleton";
import { useDashboardList } from "@/client/hooks/dashboard";
import { useParams } from "next/navigation";
import { useMemo } from "react";

type Props = {
  search: string;
};

const DashboardList = ({ search }: Props) => {
  const { dashboardId } = useParams<{ dashboardId?: string }>();
  const { data, isLoading, isError, error } = useDashboardList();
  const displayedData = useMemo(() => {
    if (!data) return [];
    if (!search) return data;
    return data.filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);
  if (isLoading) return <DashboardListSkeleton />;
  if (isError) {
    console.error(error);
    return (
      <div className="flex h-40 flex-col items-center justify-center space-y-2 rounded-xl bg-red-500 text-sm text-white">
        <p>Failed to fetch dashboard data</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }
  if (!data) return <p>Something wrong</p>;
  return (
    <div className="space-y-1">
      {displayedData.map((dashboard) => (
        <ListButton
          key={dashboard.id}
          isSelected={dashboard.id === dashboardId}
          loading={dashboard.id === "CREATING"}
          name={dashboard.name}
          href={`/dashboard/${dashboard.id}`}
          onDelete={() => {}}
          onRename={() => {}}
        />
      ))}
    </div>
  );
};

const DashboardListSkeleton = () => {
  return (
    <div className="w-full space-y-2">
      {[1, 2, 3, 4, 5].map((_, i) => (
        <Skeleton key={i} className="h-7 w-full" />
      ))}
    </div>
  );
};
export default DashboardList;
