import { Skeleton } from "@/client/components/ui/skeleton";

const MessageSkeleton = () => {
  return (
    <div className="flex w-full gap-4">
      <Skeleton className="h-6 w-6 rounded-full" />
      <div className="w-full space-y-2">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-28 w-full" />
      </div>
    </div>
  );
};

export default MessageSkeleton;
