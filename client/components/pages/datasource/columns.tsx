"use client";

import { Button } from "@client/components/ui/button";
import { Datasource } from "@client/types/datasource";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";

export const columns: ColumnDef<Datasource>[] = [
  {
    accessorKey: "name",
    header: () => <p className="font-semibold text-black">Connecton Name</p>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-semibold text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Datasource
          <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p className="pl-4">{row.original.type}</p>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-semibold text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Updated
          <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p className="pl-4">{row.original.updatedAt}</p>;
    },
  },
  {
    id: "actions",
    header: () => <div className="flex w-[25px]" />,
    cell: ({ row }) => {
      return (
        <div className="flex w-[25px] space-x-2">
          <Button variant="ghost" className="h-auto w-auto rounded-lg p-2">
            <Pencil size={20} />
          </Button>
          <Button variant="ghost" className="h-auto w-auto rounded-lg p-2">
            <Trash2 size={20} />
          </Button>
        </div>
      );
    },
  },
];
