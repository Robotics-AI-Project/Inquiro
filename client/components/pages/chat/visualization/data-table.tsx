"use client";

import { Checkbox } from "@/client/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/client/components/ui/popover";
import { formatNumber } from "@/client/libs/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@client/components/ui/table";
import { DataVisualizationProps } from "@client/types/data";
import { useState } from "react";
import OptionSection from "./config/option-section";
import OptionTriggerButton from "./config/option-trigger-button";

const DataTable = ({ data }: DataVisualizationProps) => {
  const columnNames = Object.keys(data[0]);
  const [selectedColumns, setSelectedColumns] = useState<
    Record<(typeof columnNames)[number], boolean>
  >(
    columnNames.reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: true,
      }),
      {},
    ),
  );

  const displayedColumns = Object.keys(selectedColumns).filter(
    (colName) => selectedColumns[colName],
  );

  return (
    <div className="overflow-hidden rounded-lg border-[1px] border-border">
      <div className="flex items-center justify-between bg-white p-3">
        <p className="ml-2 text-xl font-semibold">Data table</p>
        <Popover>
          <PopoverTrigger>
            <OptionTriggerButton />
          </PopoverTrigger>
          {/* @ts-ignore */}
          <PopoverContent className="max-h-44 overflow-scroll p-0">
            <div>
              {/* <OptionSection title="Customize">
                <div className="flex items-center gap-2 ">
                  <p>Show</p>
                  <Select>
                    <SelectTrigger className="h-8 w-[72px]">
                      <SelectValue />
                    </SelectTrigger>
                  </Select>
                  <p>entries</p>
                </div>
              </OptionSection> */}
              <OptionSection title="Manage Columns">
                <div className="space-y-2">
                  {columnNames.map((columnName) => (
                    <div
                      className="flex items-center space-x-2"
                      key={`tabular-data-${columnName}`}
                    >
                      <Checkbox
                        id={columnName}
                        className="rounded-md"
                        checked={selectedColumns[columnName]}
                        onCheckedChange={(checked) => {
                          if (checked === "indeterminate") return;
                          setSelectedColumns({
                            ...selectedColumns,
                            [columnName]: checked,
                          });
                        }}
                      />
                      <label
                        htmlFor={columnName}
                        className="cursor-pointer select-none"
                      >
                        {columnName}
                      </label>
                    </div>
                  ))}
                </div>
              </OptionSection>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {displayedColumns.map((columnName) => (
              <TableHead
                key={columnName}
                className="text-center font-semibold text-black"
              >
                {columnName}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              {displayedColumns.map((columnName) => {
                const value = row[columnName];
                let display: string = value.toString();
                if (typeof value === "number") display = formatNumber(value);
                return (
                  <TableCell key={columnName} className="text-center">
                    {display}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
