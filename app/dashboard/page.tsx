"use client";
import Toolbar from "@client/components/toolbar";
import { Button } from "@client/components/ui/button";
import { Input } from "@client/components/ui/input";
import { Separator } from "@client/components/ui/separator";
import { Tree, TreeDataItem } from "@client/components/ui/tree";
import { Plus, Search, Shield, Ticket } from "lucide-react";
import { useState } from "react";

type Props = {};

const data = [
  { id: "1", name: "Dashboard A" },
  { id: "2", name: "Dashboard B" },
  {
    id: "3",
    name: "Sub Dashboards",
    icon: Shield,
    children: [
      { id: "c1", name: "Dashboard C" },
      { id: "c2", name: "Dashboard D" },
      { id: "c3", name: "Dashboard E", icon: Ticket },
    ],
  },
];

const Page = (props: Props) => {
  const [dashboard, setDashboard] = useState<TreeDataItem>();
  return (
    <div className="flex h-full">
      <Toolbar className="min-w-[224px] max-w-[225px] space-y-4">
        <div className="relative">
          <Input placeholder="Search dashboard" className="pr-8" />
          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground"
          />
        </div>
        <Button className="h-auto w-full justify-between px-3 py-[6px]">
          <p className="text-sm">New Dashboard</p>
          <Plus size={20} />
        </Button>
        <div className="space-y-2">
          <p className="ml-2 text-sm text-muted-foreground">All Dashboards</p>
          <Separator />
          <Tree
            data={data}
            className="h-[800px]"
            onSelectChange={(item) => setDashboard(item)}
          />
        </div>
      </Toolbar>
      <div>{dashboard && <div>{dashboard.name}</div>}</div>
    </div>
  );
};

export default Page;
