"use client";

import SQL from "@client/components/sql";
import Toolbar from "@client/components/toolbar";
import { Button } from "@client/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@client/components/ui/dropdown-menu";
import { Input } from "@client/components/ui/input";
import { MoreHorizontal, Pencil, Search, Trash } from "lucide-react";

const Page = () => {
  const sql =
    "SELECT EXTRACT(MONTH FROM completion_date) AS month_number, COUNT(*) AS num_completed_courses FROM completed_courses WHERE EXTRACT(YEAR FROM completion_date) = 2018 AND EXTRACT(MONTH FROM completion_date) BETWEEN 1 AND 6 GROUP BY EXTRACT(MONTH FROM completion_date) ORDER BY month_number;";
  return (
    <div className="flex h-full">
      <Toolbar className="w-[400px] space-y-4">
        <div className="relative">
          <Input placeholder="Search Snippet" className="pr-8" />
          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
        </div>
        <div className="flex flex-col space-y-1 text-sm">
          <p className="relative left-3 text-gray-500">All Snippets</p>
          <Button
            variant="ghost"
            className="h-auto w-auto justify-start gap-2 px-3 py-[6px] font-normal"
          >
            All users whose username contains ad
          </Button>
          <Button
            variant="secondary"
            className="h-auto w-auto justify-start gap-2 px-3 py-[6px]"
          >
            <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-start ">
              Number of completed courses from Jan to June in 2018
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="rounded-lg">
                <Button
                  asChild
                  variant="secondary"
                  className="h-auto w-auto rounded-sm p-0"
                >
                  <MoreHorizontal size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-lg">
                <DropdownMenuItem className="rounded-md">
                  <div className="flex items-center space-x-2">
                    <Pencil size={18} />
                    <p>Rename</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-md text-red-500 focus:bg-red-200 focus:text-red-600">
                  <div className="flex items-center space-x-2">
                    <Trash size={18} />
                    <p>Delete Snippet</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Button>
          <Button
            variant="ghost"
            className="h-auto w-auto justify-start gap-2 px-3 py-[6px] font-normal"
          >
            Ranked GDP of cities in their highest season
          </Button>
        </div>
      </Toolbar>
      <main className="w-full space-y-4 p-10">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold">
            Number of completed courses from Jan to June in 2018
          </h2>
          <Button className="h-auto w-[160px] gap-2 py-[6px]">
            Add to dashboard
          </Button>
        </div>
        <SQL sql={sql} />
      </main>
    </div>
  );
};

export default Page;
