"use client";

import { useState } from "react";
import SearchSnippet from "./search-snippet";
import SnippetList from "./snippet-list";

type Props = {};

const SnippetSidebar = (props: Props) => {
  const [search, setSearch] = useState("");
  return (
    <div className="h-full w-full space-y-2">
      <SearchSnippet search={search} setSearch={setSearch} />
      <SnippetList search={search} />
    </div>
  );
};

export default SnippetSidebar;
