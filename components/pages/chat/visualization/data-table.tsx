import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber } from "@/lib/data";
import { DataVisualizationProps } from "@/types/data";

const DataTable = ({ data }: DataVisualizationProps) => {
  const columnNames = Object.keys(data[0]);
  return (
    <div className="overflow-hidden rounded-lg border-[1px] border-border">
      <Table>
        <TableHeader>
          <TableRow>
            {columnNames.map((columnName) => (
              <TableHead key={columnName} className="text-center">
                {columnName}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              {columnNames.map((columnName) => {
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
