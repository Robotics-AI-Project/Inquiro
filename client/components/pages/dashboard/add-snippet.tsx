"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/client/components/ui/sheet";
import { visualizationList } from "@/client/constants/data";
import { cn } from "@/client/libs/utils";
import { VisualizationType } from "@/client/types/data";
import { GripVertical } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import SearchSnippet from "../snippet/sidebar/search-snippet";
import SnippetList from "../snippet/sidebar/snippet-list";

type Props = {
  existingSnippetIds: string[];
  onAddSnippet: (
    visualizationType: VisualizationType,
  ) => (snippetId: string) => Promise<void>;
};

const AddSnippet = ({ existingSnippetIds, onAddSnippet }: Props) => {
  const [selectedVisualizationType, setSelectedVisualizationType] =
    useState<VisualizationType>("TABLE");
  const [search, setSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Add Snippet</Button>
      </SheetTrigger>
      {/* @ts-ignore */}
      <SheetContent>
        <SheetHeader className="border-b-[1px] border-border py-4">
          <SheetTitle>Snippets</SheetTitle>
          <SearchSnippet search={search} setSearch={setSearch} />
          <div className="flex items-center gap-2">
            {visualizationList.map((visualization) => {
              const Icon = visualization.icon;
              return (
                <Button
                  key={`toggle-${visualization.key}`}
                  variant={
                    selectedVisualizationType === visualization.key
                      ? "secondary"
                      : "outline"
                  }
                  onClick={() =>
                    setSelectedVisualizationType(visualization.key)
                  }
                  className={cn(
                    "h-max w-full p-2",
                    selectedVisualizationType === visualization.key &&
                      "border-[1px] border-primary",
                  )}
                >
                  <Icon size={16} strokeWidth={1.5} />
                </Button>
              );
            })}
          </div>
        </SheetHeader>
        <SheetDescription className="py-2">
          <SnippetList
            onClick={(id) => {
              setSheetOpen(false);
              return onAddSnippet(selectedVisualizationType)(id);
            }}
            search={search}
            disabledIds={existingSnippetIds}
            className="text-black"
            startIcon={<GripVertical size={16} />}
          />
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default AddSnippet;
