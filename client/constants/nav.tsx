import { BarChart3, Database, MessageSquare, Save } from "lucide-react";

export const navList = [
  {
    name: "SQL Generation",
    path: "/chat",
    icon: <MessageSquare />,
  },
  {
    name: "Datasource",
    path: "/datasource",
    icon: <Database />,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <BarChart3 />,
  },
  {
    name: "Snippet",
    path: "/snippet",
    icon: <Save />,
  },
];
