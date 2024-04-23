"use client";

import { Label } from "@/client/components/ui/label";

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
import { Card, DonutChart, Title } from "@tremor/react";
import { useState } from "react";
import OptionSection from "./config/option-section";
import OptionTriggerButton from "./config/option-trigger-button";

const PieChart = ({ data, className, name }: DataVisualizationProps) => {
  const numericalColumns = Object.keys(data[0]).filter(
    (colName) => typeof data[0][colName] === "number",
  );
  const categoricalColumns = Object.keys(data[0]).filter(
    (colName) => numericalColumns.indexOf(colName) === -1,
  );

  const [pieChartConfig, setPieChartConfig] = useState({
    value: numericalColumns[0] ?? "",
    category: categoricalColumns[0] ?? "",
  });

  return (
    <Card className={cn("h-full w-full bg-white", className)}>
      <div className="flex items-center justify-between">
        <Title className="text-xl font-semibold">{name ?? "Pie Chart"}</Title>
        <Popover>
          <PopoverTrigger>
            <OptionTriggerButton />
          </PopoverTrigger>
          {/* @ts-ignore */}
          <PopoverContent className="max-w-52 p-0">
            <OptionSection title="Customize" className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm">Value</Label>
                <Select
                  defaultValue={pieChartConfig.value}
                  onValueChange={(value) => {
                    setPieChartConfig((prev) => ({
                      value,
                      category: prev.category,
                    }));
                  }}
                >
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {numericalColumns.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Category</Label>
                <Select
                  defaultValue={pieChartConfig.category}
                  onValueChange={(value) => {
                    setPieChartConfig((prev) => ({
                      value: prev.value,
                      category: value,
                    }));
                  }}
                >
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categoricalColumns.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </OptionSection>
          </PopoverContent>
        </Popover>
      </div>
      <DonutChart
        data={data}
        index={pieChartConfig.value}
        category={pieChartConfig.category}
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
