import BarChart from "@client/components/pages/chat/visualization/bar-chart";
import DataTable from "@client/components/pages/chat/visualization/data-table";
import LineGraph from "@client/components/pages/chat/visualization/line-graph";
import { default as visPieChart } from "@client/components/pages/chat/visualization/pie-chart";
import { DataVisualizationProps } from "@client/types/data";
import { BarChartBig, Grid3X3, LineChart, PieChart } from "lucide-react";

export const visualizationList: Readonly<
  {
    key: string;
    name: string;
    icon: any;
    visualizationComponent?: React.FC<DataVisualizationProps>;
  }[]
> = [
  {
    key: "data-table",
    name: "Data Table",
    icon: Grid3X3,
    visualizationComponent: DataTable,
  },
  {
    key: "bar-graph",
    name: "Bar Graph",
    icon: BarChartBig,
    visualizationComponent: BarChart,
  },
  {
    key: "line-graph",
    name: "Line Graph",
    icon: LineChart,
    visualizationComponent: LineGraph,
  },
  {
    key: "pie-chart",
    name: "Pie Chart",
    icon: PieChart,
    visualizationComponent: visPieChart,
  },
] as const;

export type VisualizationKey = (typeof visualizationList)[number]["key"];
