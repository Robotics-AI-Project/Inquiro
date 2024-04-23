"use client";

import { useState } from "react";
import DashboardList from "./dashboard-list";
import SearchCreateDashboard from "./search-create-dashboard";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="space-y-2">
      <SearchCreateDashboard search={search} setSearch={setSearch} />
      <DashboardList search={search} />
    </div>
  );
};

export default Sidebar;
