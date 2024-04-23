export type DataVisualizationProps = {
  data: ExecutedData;
  className?: string;
  name?: string;
};

export type ExecutedData = Record<string, DataType>[];

export type DataType = boolean | number | string;

export type VisualizationType = "TABLE" | "BAR" | "LINE" | "PIE";
