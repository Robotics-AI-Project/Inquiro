"use client";

import { cn } from "@/client/libs/utils";
import GridLayout from "react-grid-layout";

import { useState } from "react";

import EditableHeader from "@/client/components/editable-header";
import Visualization from "@/client/components/pages/chat/visualization";
import AddSnippet from "@/client/components/pages/dashboard/add-snippet";
import { Skeleton } from "@/client/components/ui/skeleton";
import {
  useEditDashboardContent,
  useGetDashboardById,
  useRenameDashboard,
} from "@/client/hooks/dashboard";
import { useGetMultipleSnippets } from "@/client/hooks/snippet";
import { VisualizationType } from "@/client/types/data";
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
  const { mutateAsync } = useEditDashboardContent(dashboardId);

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

  const onAddSnippet =
    (visualizationType: VisualizationType) => async (snippetId: string) => {
      const newContent = [
        ...(content ?? []),
        {
          layout: {
            i: snippetId,
            x: 0,
            y: 0,
            w: globalMinimumTile.minW,
            h: globalMinimumTile.minH,
            ...globalMinimumTile,
          },
          config: {
            visualizationType,
          },
        },
      ] as typeof content;
      await mutateAsync(newContent);
    };

  return (
    <div className="flex flex-1 flex-col space-y-4 overflow-y-scroll p-10">
      <div className="flex justify-between">
        <EditableHeader name={name} onRename={onRename} />
        <AddSnippet
          onAddSnippet={onAddSnippet}
          existingSnippetIds={layout.map(({ i }) => i)}
        />
      </div>
      {layout.length > 0 && indexibleSnippetDatas && (
        <GridLayout
          resizeHandles={["se", "sw", "ne", "nw", "n", "s", "w", "e"]}
          onDragStart={() => setIsDragging(true)}
          onDragStop={() => setIsDragging(false)}
          className={cn(isDragging && "react-grid-dragging")}
          layout={layout}
          onLayoutChange={async (layout) => {
            await mutateAsync(
              layout.map((l) => {
                const config = content?.find(({ layout }) => layout.i === l.i)
                  ?.config ?? {
                  visualizationType: "TABLE",
                };
                return {
                  layout: {
                    ...l,
                    minW: globalMinimumTile.minW,
                    minH: globalMinimumTile.minH,
                  },
                  config,
                };
              }),
            );
          }}
          cols={12}
          rowHeight={40}
          width={1200}
          draggableCancel=".react-grid-no-drag"
        >
          {content?.map(({ layout, config }) => {
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
