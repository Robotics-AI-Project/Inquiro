"use client";

import BarChart from "@/client/components/pages/chat/visualization/bar-chart";
import DataTable from "@/client/components/pages/chat/visualization/data-table";
import LineChart from "@/client/components/pages/chat/visualization/line-chart";
import PieChart from "@/client/components/pages/chat/visualization/pie-chart";
import { ExecutedData } from "@/client/types/data";

type Props = {
  data: ExecutedData;
};

const Visualizations = ({ data }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <DataTable data={data} />
      <LineChart data={data} />
      <BarChart data={data} />
      <PieChart data={data} />
    </div>
  );
};

export default Visualizations;
