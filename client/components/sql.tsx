"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { format } from "sql-formatter";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type Props = { sql: string };

const SQL = ({ sql }: Props) => {
  const [isCopied, setIsCopied] = useState(false);
  const onCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(sql);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
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
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Button
                asChild
                variant="outline"
                className="h-auto w-auto p-2 text-white"
                onClick={onCopy}
              >
                {isCopied ? <Check size={18} /> : <Copy size={18} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>📋 Copy</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default SQL;
