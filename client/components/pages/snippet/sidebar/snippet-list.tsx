"use client";

import { Button } from "@/client/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/client/components/ui/dropdown-menu";
import { Skeleton } from "@/client/components/ui/skeleton";
import { useGetAllSnippets } from "@/client/hooks/snippet";
import { cn } from "@/client/libs/utils";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

type Props = {
  search: string;
};

const SnippetList = ({ search }: Props) => {
  const { snippetId } = useParams<{ snippetId?: string }>();
  const { data, error, isError, isLoading } = useGetAllSnippets();
  const router = useRouter();

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!search) return data;
    return data.filter((snippet) =>
      snippet.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  if (isLoading) return <SnippetListSkeleton />;
  if (isError) {
    return (
      <div className="flex h-40 flex-col items-center justify-center space-y-2 rounded-xl bg-red-500 text-sm text-white">
        <p>Failed to fetch chat data</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div className="w-full space-y-1">
      {filteredData.map((snippet) => {
        const isSelected = snippetId === snippet.id;
        return (
          <Button
            key={snippet.id}
            variant={isSelected ? "secondary" : "ghost"}
            className={cn(
              "h-auto w-full justify-start gap-2 px-3 py-[6px]",
              !isSelected && "font-normal",
            )}
            onClick={() => {
              if (!isSelected) router.push(`/snippet/${snippet.id}`);
            }}
          >
            <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-start ">
              {snippet.name}
            </p>
            {isSelected && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="rounded-lg">
                  <Button
                    asChild
                    variant="secondary"
                    className="h-auto w-auto rounded-sm p-0"
                  >
                    <MoreHorizontal size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-lg">
                  <DropdownMenuItem className="rounded-md">
                    <div className="flex items-center space-x-2">
                      <Pencil size={18} />
                      <p>Rename</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-md text-red-500 focus:bg-red-200 focus:text-red-600">
                    <div className="flex items-center space-x-2">
                      <Trash size={18} />
                      <p>Delete Snippet</p>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </Button>
        );
      })}
    </div>
  );
};

const SnippetListSkeleton = () => {
  return (
    <div className="w-full space-y-2">
      {[1, 2, 3, 4, 5].map((_, i) => (
        <Skeleton key={i} className="h-7 w-full" />
      ))}
    </div>
  );
};

export default SnippetList;
