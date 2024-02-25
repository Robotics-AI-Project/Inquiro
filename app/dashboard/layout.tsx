"use client";

import Toolbar from "@/client/components/toolbar";
import { Button } from "@/client/components/ui/button";
import { Input } from "@/client/components/ui/input";
import { Separator } from "@/client/components/ui/separator";
import { Tree, TreeDataItem } from "@/client/components/ui/tree";
import { backendClient } from "@/client/libs/api";

import { Plus, Search, Shield, Ticket } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

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

const Layout = ({ children }: PropsWithChildren) => {
  const dashboardId = usePathname().split("/")[2];
  const router = useRouter();

  const handleSelectChange = (item: TreeDataItem | undefined) => {
    if (!item || item.children) return;
    router.push(`/dashboard/${item.id}`);
  };

  return (
    <div className="flex h-full">
      <Toolbar className="min-w-[224px] max-w-[225px] space-y-4">
        <div className="relative">
          <Input placeholder="Search dashboard" className="pr-8" />
          <Search
            size={18}
            className="text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 transform"
          />
        </div>
        <Button className="h-auto w-full justify-between px-3 py-[6px]">
          <p className="text-sm">New Dashboard</p>
          <Plus size={20} />
        </Button>
        <div className="space-y-2">
          <p className="text-muted-foreground ml-2 text-sm">All Dashboards</p>
          <Separator />
          <Tree
            selectedItemId={dashboardId}
            data={data}
            className="h-[800px]"
            onSelectChange={handleSelectChange}
          />
        </div>
      </Toolbar>
      <div className="flex h-full w-full">{children}</div>
    </div>
  );
};

export default Layout;
