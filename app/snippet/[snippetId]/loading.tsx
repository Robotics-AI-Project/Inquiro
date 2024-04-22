import { Skeleton } from "@/client/components/ui/skeleton";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="space-y-2 p-4">
      <div className="space-y-1">
        <Skeleton className="h-8 w-80" />
        <Skeleton className="h-4 w-44" />
      </div>
      <Skeleton className="h-96 w-full" />
      <div className="grid w-full grid-cols-2 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-50 w-full" />
        ))}
      </div>
    </div>
  );
};

export default Loading;
