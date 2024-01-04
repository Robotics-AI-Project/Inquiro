import { formatNumber } from "@/client/libs/data";
import { DataVisualizationProps } from "@client/types/data";
import { Card, DonutChart, Title } from "@tremor/react";

const PieChart = ({ data }: DataVisualizationProps) => {
  return (
    <Card className="h-full w-full rounded-lg bg-white">
      <Title>Top 5 Movies Based On Box Office Gross in 2020 ($ million)</Title>
      <DonutChart
        data={data}
        index="Title"
        category="Box Office Gross"
        className="mt-6 h-60"
        variant="pie"
        showAnimation
        showLabel
        label="Text"
        animationDuration={300}
        valueFormatter={formatNumber}
      />
    </Card>
  );
};

export default PieChart;
