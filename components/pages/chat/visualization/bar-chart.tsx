import { formatNumber } from "@/lib/data";
import { DataVisualizationProps } from "@/types/data";
import { Card, Title, BarChart as TremorBarChart } from "@tremor/react";

const BarChart = ({ data }: DataVisualizationProps) => {
  return (
    <Card className="h-full w-full bg-white">
      <Title>Top 5 Movies Based On Box Office Gross in 2020 ($ million)</Title>
      <TremorBarChart
        data={data}
        index="Title"
        categories={["Box Office Gross"]}
        layout="vertical"
        className="h-60"
        showAnimation
        yAxisWidth={80}
        animationDuration={500}
        valueFormatter={formatNumber}
      />
    </Card>
  );
};

export default BarChart;
