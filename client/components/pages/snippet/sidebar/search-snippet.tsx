"use client";

import { Input } from "@/client/components/ui/input";
import { Search } from "lucide-react";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

const SearchSnippet = ({ search, setSearch }: Props) => {
  return (
    <div className="relative">
      <Input
        placeholder="Search Snippet"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pr-8"
      />
      <Search
        size={18}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
};

export default SearchSnippet;
