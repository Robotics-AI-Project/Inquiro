"use client";

import { useGetSnippetById } from "@/client/hooks/snippet";
import { VisualizationType } from "@/client/types/data";
import { Skeleton } from "../../ui/skeleton";

type Props = {
  snippetId: string;
  config: {
    visualizationType: VisualizationType;
  };
};

const GridTile = ({ snippetId, config: { visualizationType } }: Props) => {
  const {
    data: snippetData,
    isError,
    isLoading,
    error,
  } = useGetSnippetById(snippetId);

  if (isLoading) return <Skeleton className="h-full w-full" />;
  if (isError) {
    console.error(error);
    return <p>Failed to fetch snippet data</p>;
  }
  if (!snippetData) return <p>Something wrong</p>;

  return (
    <div
      key={snippetId}
      className="rounded-3xl border-[1px] border-solid border-border bg-red-500 p-6"
    >
      {/* <Visualization
        sql={snippetData.sql}
        visualizationType={visualizationType}
      /> */}
    </div>
  );
};

export default GridTile;
