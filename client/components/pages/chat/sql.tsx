"use client";

import { Grid3X3 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { format } from "sql-formatter";
import { visualizationList } from "../../../constants/data";
import { VisualizationType } from "../../../types/data";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import SaveSnippet from "./save-snippet";

type Props = {
  sql: string;
  visualizationType: VisualizationType;
  setVisualizationType: Dispatch<SetStateAction<VisualizationType>>;
};

const SQL = ({ sql, setVisualizationType }: Props) => {
  return (
    <div className="relative">
      <SyntaxHighlighter
        language="sql"
        style={oneDark}
        wrapLongLines
        customStyle={{
          borderRadius: "8px",
          boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.05)",
        }}
      >
        {format(sql, {
          tabWidth: 2,
          logicalOperatorNewline: "before",
          newlineBeforeSemicolon: false,
        })}
      </SyntaxHighlighter>
      <div className="absolute right-4 top-4 flex space-x-2">
        <SaveSnippet sql={sql} />
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-lg">
            <Button
              asChild
              variant="outline"
              className="h-auto w-auto p-1 text-white"
            >
              <Grid3X3 size={26} strokeWidth={1} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {visualizationList.map((visualization) => (
              <DropdownMenuItem
                key={visualization.key}
                className="gap-2"
                onClick={() => {
                  setVisualizationType(visualization.key);
                }}
              >
                <visualization.icon size={18} />
                <span>{visualization.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SQL;
