"use client";

import { Button } from "@/client/components/ui/button";
import { Input } from "@/client/components/ui/input";
import { useCreateDashboard } from "@/client/hooks/dashboard";
import { Plus, Search } from "lucide-react";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

const SearchCreateDashboard = ({ search, setSearch }: Props) => {
  const { mutateAsync, isPending } = useCreateDashboard();
  const onCreateDashboard = async () => {
    await mutateAsync();
  };
  return (
    <div className="flex h-max items-center gap-2">
      <div className="relative w-full">
        <Input
          placeholder="Search dashboard"
          className="w-full pr-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search
          size={18}
          className="absolute right-3 top-[calc(50%-2px)] -translate-y-1/2 transform text-muted-foreground"
        />
      </div>
      <Button
        variant="outline"
        className="aspect-square h-full min-h-min p-2"
        disabled={isPending}
        onClick={onCreateDashboard}
      >
        <Plus size={22} />
      </Button>
    </div>
  );
};

export default SearchCreateDashboard;
