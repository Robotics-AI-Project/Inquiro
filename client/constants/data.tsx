import { VisualizationType } from "@client/types/data";
import { BarChartBig, Grid3X3, LineChart, PieChart } from "lucide-react";

export const visualizationList: Readonly<
  {
    key: VisualizationType;
    name: string;
    icon: any;
  }[]
> = [
  {
    key: "TABLE",
    name: "Data Table",
    icon: Grid3X3,
  },
  {
    key: "BAR",
    name: "Bar Graph",
    icon: BarChartBig,
  },
  {
    key: "LINE",
    name: "Line Graph",
    icon: LineChart,
  },
  {
    key: "PIE",
    name: "Pie Chart",
    icon: PieChart,
  },
] as const;
