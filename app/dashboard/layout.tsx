"use client";

import AppLayout from "@/client/components/app-layout";
import Sidebar from "@/client/components/pages/dashboard/sidebar";

import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <AppLayout sideBar={<Sidebar />}>
      <div className="flex h-full w-full">{children}</div>
    </AppLayout>
  );
};

export default Layout;
