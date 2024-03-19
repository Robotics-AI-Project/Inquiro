import MessageSkeleton from "@/client/components/pages/chat/message/skeleton";

const Loading = () => {
  return (
    <div className="mx-auto h-[calc(100vh-60px-6rem)] w-[800px]">
      <div className="h-[72px]" />
      <div className="space-y-14">
        <MessageSkeleton />
        <MessageSkeleton />
        <MessageSkeleton />
      </div>
    </div>
  );
};

export default Loading;
