"use client";

import { cn } from "@/client/libs/utils";
import GridLayout from "react-grid-layout";

import { useState } from "react";

import "@client/styles/base-grid-layout.css";
import "@client/styles/base-resizable.css";
import "@client/styles/custom-resizable.css";

type Props = {
  params: {
    dashboardId: string;
  };
};

const Page = ({ params: {
  dashboardId
} }: Props) => {
  const layout = [
    { i: "a", x: 0, y: 0, w: 4, h: 6, minW: 4, minH: 6 },
    { i: "b", x: 4, y: 0, w: 4, h: 6, minW: 4, minH: 6 },
    { i: "c", x: 8, y: 0, w: 4, h: 16, minW: 4, minH: 6 },
    { i: "d", x: 0, y: 6, w: 8, h: 6, minW: 4, minH: 6 },
  ];
  const [isDragging, setIsDragging] = useState(false);
  return (
    <div className="flex flex-1 flex-col space-y-4 overflow-y-scroll p-10">
      <h1 className="text-2xl font-semibold">
        Roots Coffee Weekly Sales and Member Status
      </h1>
      <GridLayout
        resizeHandles={["se", "sw", "ne", "nw", "n", "s", "w", "e"]}
        onDragStart={() => setIsDragging(true)}
        onDragStop={() => setIsDragging(false)}
        className={cn(isDragging && "react-grid-dragging")}
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        <div
          key="a"
          className="rounded-3xl border-[1px] border-solid border-border bg-white p-6"
        >
          <p className="text-2xl font-semibold">Weekly Balance</p>
        </div>
        <div
          key="b"
          className="rounded-3xl border-[1px] border-solid border-border bg-white p-6"
        >
          <p className="text-2xl font-semibold">Branch Sales</p>
        </div>
        <div
          key="c"
          className="rounded-3xl border-[1px] border-solid border-border bg-white p-6"
        >
          <p className="text-2xl font-semibold">
            Distribution of sales across platforms
          </p>
        </div>
        <div
          key="d"
          className="rounded-3xl border-[1px] border-solid border-border bg-white p-6"
        >
          <p className="text-2xl font-semibold">Highest sales: $870.93</p>
        </div>
      </GridLayout>
    </div>
  );
};

export default Page;
