import { formatNumber } from "@/client/libs/data";
import { DataVisualizationProps } from "@client/types/data";
import { Card, LineChart, Title } from "@tremor/react";

const LineGraph = ({ data }: DataVisualizationProps) => {
  return (
    <Card>
      <Title>Top 5 Movies Based On Box Office Gross in 2020 ($ million)</Title>
      <LineChart
        data={data}
        index="Title"
        animationDuration={500}
        showAnimation
        categories={["Box Office Gross"]}
        valueFormatter={formatNumber}
        yAxisWidth={80}
      />
    </Card>
  );
};

export default LineGraph;
