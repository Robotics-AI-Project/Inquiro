"use client";

import ListButton from "@/client/components/list-button";
import { Skeleton } from "@/client/components/ui/skeleton";
import { useGetAllSnippets } from "@/client/hooks/snippet";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

type Props = {
  search: string;
  disabledIds?: string[];
  className?: string;
  startIcon?: React.ReactNode;
  onClick?: (id: string) => void;
};

const SnippetList = ({
  search,
  className,
  disabledIds,
  startIcon,
  onClick,
}: Props) => {
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

  const onNavigate = (id: string) => {
    router.push(`/snippet/${id}`);
  };

  return (
    <div className="w-full space-y-1">
      {filteredData.map((snippet) => {
        const isSelected = snippetId === snippet.id;
        return (
          <ListButton
            key={snippet.id}
            isSelected={isSelected}
            disabled={disabledIds?.includes(snippet.id)}
            id={snippet.id}
            name={snippet.name}
            onClick={!onClick ? onNavigate : onClick}
            onDelete={() => {}}
            onRename={() => {}}
            startIcon={startIcon}
            className={className}
          />
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
