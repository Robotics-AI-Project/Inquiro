import { Skeleton } from "@/client/components/ui/skeleton";
import { backendClient } from "@/client/libs/api";
import { ExecutedData } from "@/client/types/data";
import { useQuery } from "@tanstack/react-query";
import BarChart from "./bar-chart";
import DataTable from "./data-table";
import LineChart from "./line-chart";
import PieChart from "./pie-chart";

type Props = {
  sql: string;
  visualizationType: "TABLE" | "BAR" | "LINE" | "PIE";
  className?: string;
  name?: string;
};

const Visualization = ({ sql, visualizationType, className, name }: Props) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["sql-execution", sql],
    queryFn: async () => {
      const { data, error } = await backendClient.api["sql-execution"].post({
        sql,
      });
      if (error) throw new Error(error.name);
      return data as ExecutedData;
    },
  });
  if (isLoading) return <Skeleton className="h-40 w-full rounded-md" />;
  if (isError) return <div>Error {error.message}</div>;
  if (!data) return <div>Something went wrong!</div>;

  switch (visualizationType) {
    case "TABLE":
      return <DataTable data={data} className={className} name={name} />;
    case "BAR":
      return <BarChart data={data} className={className} name={name} />;
    case "LINE":
      return <LineChart data={data} className={className} name={name} />;
    case "PIE":
      return <PieChart data={data} className={className} name={name} />;
  }
  return <div>Unknown visualization</div>;
};

export default Visualization;
