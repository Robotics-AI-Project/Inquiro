import { columns } from "@/components/pages/datasource/columns";
import { DataTable } from "@/components/pages/datasource/data-table";
import Toolbar from "@/components/toolbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Datasource } from "@/types/datasource";
import { Search } from "lucide-react";
import Image from "next/image";

type Props = {};

const Page = (props: Props) => {
  const data: Datasource[] = [
    {
      id: "1",
      name: "PostgreSQL",
      type: "PostgreSQL",
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "SQLite",
      type: "SQLite",
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ];
  return (
    <div className="flex h-full w-full">
      <Toolbar className="min-w-[224px] space-y-4">
        <Button
          variant="secondary"
          className="h-auto w-full justify-start px-3 py-[6px]"
        >
          See All Connections
        </Button>
        <div className="w-full space-y-[2px]">
          <h2 className="ml-3 text-xs font-medium">ADD CONNECTIONS</h2>
          <div className="space-y-1">
            <div className="flex items-center justify-between rounded-lg bg-muted p-2 text-sm">
              <div className="flex space-x-2">
                <Image
                  alt="postgresql"
                  src="/assets/database/postgresql.svg"
                  width={24}
                  height={24}
                />
                <p className="text-sm font-semibold">PostgreSQL</p>
              </div>
              <Button className="h-auto w-auto px-3 py-2 text-xs">Add</Button>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted p-2 text-sm">
              <div className="flex items-center space-x-2">
                <Image
                  alt="sqlite"
                  src="/assets/database/sqlite.svg"
                  width={24}
                  height={24}
                />
                <p className="text-sm font-semibold">SQLite</p>
              </div>

              <Button className="h-auto w-auto px-3 py-2 text-xs">Add</Button>
            </div>
          </div>
        </div>
      </Toolbar>
      <main className="relative flex w-full flex-col overflow-scroll p-10">
        <header className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold">See All Connections</h1>
            <p className="text-sm text-muted-foreground">
              Connect to a data source and it will automatically appear here.
            </p>
          </div>
          <div className="relative">
            <Input placeholder="Search connection" className="w-52 pr-9" />
            <Search
              size={18}
              className="absolute right-3 top-[10px] text-muted-foreground"
            />
          </div>
        </header>
        <DataTable columns={columns} data={data} />
      </main>
    </div>
  );
};

export default Page;
