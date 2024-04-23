import { Label } from "@/client/components/ui/label";
import MultiSelectFormField from "@/client/components/ui/multi-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/client/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/client/components/ui/select";
import { formatNumber } from "@/client/libs/data";
import { cn } from "@/client/libs/utils";
import { DataVisualizationProps } from "@client/types/data";
import { Card, Title, LineChart as TremorLineChart } from "@tremor/react";
import { useState } from "react";
import OptionSection from "./config/option-section";
import OptionTriggerButton from "./config/option-trigger-button";

const LineChart = ({ data, className, name }: DataVisualizationProps) => {
  const columnNames = Object.keys(data[0]);
  const [{ index, categories }, setBarChartConfig] = useState<{
    index: (typeof columnNames)[number];
    categories: (typeof columnNames)[number][];
  }>({
    index: columnNames[0],
    categories: columnNames.slice(1),
  });
  return (
    <Card className={cn("h-full w-full bg-white", className)}>
      <div className="flex items-center justify-between">
        <Title className="text-xl font-semibold">{name ?? "Line Chart"}</Title>
        <Popover>
          <PopoverTrigger>
            <OptionTriggerButton />
          </PopoverTrigger>
          {/* @ts-ignore */}
          <PopoverContent className="max-w-52 p-0">
            <OptionSection title="Customize" className="space-y-2">
              <div className="space-y-2">
                <Label className="text-sm">Y-Axis</Label>
                <Select
                  defaultValue={index}
                  onValueChange={(value) => {
                    setBarChartConfig({
                      index: value,
                      categories: columnNames.filter((cn) => cn !== value),
                    });
                  }}
                >
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {columnNames.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">X-Axis</Label>
                <MultiSelectFormField
                  options={columnNames
                    .filter((cn) => cn !== index)
                    .map((category) => ({
                      label: category,
                      value: category,
                    }))}
                  placeholder="Select categories"
                  onValueChange={(values) => {
                    setBarChartConfig((prev) => ({
                      ...prev,
                      categories: values,
                    }));
                  }}
                  defaultValue={categories}
                />
              </div>
            </OptionSection>
          </PopoverContent>
        </Popover>
      </div>
      <TremorLineChart
        data={data}
        index={index}
        categories={categories}
        className="h-60"
        showAnimation
        yAxisWidth={80}
        animationDuration={500}
        valueFormatter={formatNumber}
      />
    </Card>
  );
};

export default LineChart;
