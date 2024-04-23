"use client";

import { cn } from "@/client/libs/utils";
import GridLayout from "react-grid-layout";

import { useState } from "react";

import EditableHeader from "@/client/components/editable-header";
import Visualization from "@/client/components/pages/chat/visualization";
import { Button } from "@/client/components/ui/button";
import { Skeleton } from "@/client/components/ui/skeleton";
import {
  useGetDashboardById,
  useRenameDashboard,
} from "@/client/hooks/dashboard";
import { useGetMultipleSnippets } from "@/client/hooks/snippet";
import "@client/styles/base-grid-layout.css";
import "@client/styles/base-resizable.css";
import "@client/styles/custom-resizable.css";

type Props = {
  params: {
    dashboardId: string;
  };
};

const Page = ({ params: { dashboardId } }: Props) => {
  const globalMinimumTile = {
    minW: 4,
    minH: 6,
  };

  const [isDragging, setIsDragging] = useState(false);
  const {
    data: dashboardData,
    isLoading,
    isError,
    error,
  } = useGetDashboardById(dashboardId);

  const layout = dashboardData?.content?.map(({ layout }) => layout) ?? [];

  const { data: snippetDatas } = useGetMultipleSnippets(
    layout.map(({ i }) => i),
  );
  const { mutateAsync: onRename } = useRenameDashboard(dashboardId);

  if (isLoading)
    return (
      <div className="flex flex-1 flex-col space-y-4 overflow-y-scroll p-10">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-[640px] w-full" />
      </div>
    );
  if (isError) {
    console.error(error);
    return <p>Failed to fetch dashboard data</p>;
  }
  if (!dashboardData) return <p>Something wrong</p>;

  const { name, content } = dashboardData;

  const indexibleSnippetDatas = snippetDatas?.reduce(
    (acc, snippetData) => ({
      ...acc,
      [snippetData.id]: snippetData,
    }),
    {} as Record<string, (typeof snippetDatas)[number]>,
  );

  return (
    <div className="flex flex-1 flex-col space-y-4 overflow-y-scroll p-10">
      <div className="flex justify-between">
        <EditableHeader name={name} onRename={onRename} />
        <Button variant="outline">Add Snippet</Button>
      </div>
      {layout.length > 0 && indexibleSnippetDatas && (
        <GridLayout
          resizeHandles={["se", "sw", "ne", "nw", "n", "s", "w", "e"]}
          onDragStart={() => setIsDragging(true)}
          onDragStop={() => setIsDragging(false)}
          className={cn(isDragging && "react-grid-dragging")}
          layout={layout}
          onLayoutChange={(layout) => {
            console.log("layout change", layout);
          }}
          cols={12}
          rowHeight={40}
          width={1200}
          draggableCancel=".react-grid-no-drag"
        >
          {content.map(({ layout, config }) => {
            const { i: snippetId } = layout;
            const snippetData = indexibleSnippetDatas[snippetId];
            return (
              <div
                key={snippetId}
                className="overflow-clip rounded-3xl border-[1px] border-solid border-border"
              >
                <Visualization
                  sql={snippetData.sql}
                  visualizationType={config.visualizationType}
                  name={snippetData.name}
                  className="border-none"
                />
              </div>
            );
          })}
          {/* <div key="e64c266d-4be2-4250-ab58-97c77c39ca97">Hello</div> */}
        </GridLayout>
      )}
    </div>
  );
};

export default Page;
