import { DataType } from "@/types/data";

export const dynamicTypeConversion = (
  data: Record<string, string>[],
): Record<string, DataType>[] => {
  return data.map((row) => {
    return Object.entries(row).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [key]: getLiteralType(value),
      };
    }, {});
  });
};

const getLiteralType = (value: string): DataType => {
  if (value === "true" || value === "false") return value === "true";
  if (!isNaN(Number(value))) return Number(value);
  return value;
};

export const formatNumber = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
