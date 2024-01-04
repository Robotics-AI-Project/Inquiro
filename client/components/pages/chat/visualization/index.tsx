"use client";

import { dynamicTypeConversion } from "@/client/libs/data";
import { cn } from "@/client/libs/utils";
import { Button } from "@client/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@client/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@client/components/ui/tooltip";
import { VisualizationKey, visualizationList } from "@client/constants/data";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import SQL from "../../../sql";

type Props = {
  generationId: string;
};

const Visualization = ({ generationId }: Props) => {
  const sql = `SELECT 
    ROW_NUMBER() OVER (ORDER BY box_office_gross DESC) AS "Rank",
    movie_name AS "Title",
    box_office_gross AS "Box Office Gross"
FROM movies
WHERE released_year = 2020
ORDER BY box_office_gross DESC
LIMIT 5;`;
  const data = dynamicTypeConversion([
    {
      Rank: "1",
      Title: "The Eight Hundred",
      "Box Office Gross": "461000000",
    },
    {
      Rank: "2",
      Title: "Sonic the Hedgehog",
      "Box Office Gross": "319000000",
    },
    {
      Rank: "3",
      Title: "Dolittle",
      "Box Office Gross": "245000000",
    },
    {
      Rank: "4",
      Title: "Bad Boys for Life",
      "Box Office Gross": "206000000",
    },
  ]);
  const [isCopied, setIsCopied] = useState(false);

  const [visualization, setVisualization] =
    useState<VisualizationKey>("data-table");

  const VisualizationIcon = visualizationList.find(
    (v) => v.key === visualization,
  )?.icon;

  const VisualizationComponent = visualizationList.find(
    (v) => v.key === visualization,
  )?.visualizationComponent;

  const onCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(sql);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const onVisualizationChange = (key: VisualizationKey) =>
    setVisualization(key);

  return (
    <div className="relative">
      <div className="absolute right-2 top-2 flex space-x-2">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Button
                asChild
                variant="outline"
                className="h-auto w-auto p-2 text-white"
                onClick={onCopy}
              >
                {isCopied ? <Check size={20} /> : <Copy size={20} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>📋 Copy</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-lg">
            <Button
              asChild
              variant="outline"
              className="h-auto w-auto p-2 text-white"
            >
              {VisualizationIcon && <VisualizationIcon size={20} />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-lg">
            {visualizationList.map(({ icon, name, key }) => {
              const Icon = icon;
              return (
                <DropdownMenuItem
                  key={key}
                  onClick={() => onVisualizationChange(key)}
                  className={cn({
                    "rounded-md bg-secondary font-semibold text-secondary-foreground focus:bg-secondary/80 focus:text-secondary-foreground":
                      visualization === key,
                  })}
                >
                  <div className="flex items-center space-x-2">
                    <Icon strokeWidth={visualization === key ? 2 : 1} />
                    <p>{name}</p>
                  </div>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="space-y-6">
        <SQL sql={sql} />
        {VisualizationComponent && <VisualizationComponent data={data} />}
      </div>
    </div>
  );
};

export default Visualization;
