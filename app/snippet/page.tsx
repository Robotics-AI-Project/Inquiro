import EmptyDisplay from "@/client/components/empty-display";
import { Save } from "lucide-react";

const Page = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <EmptyDisplay icon={Save} title="Please select a snippet to start" />
    </div>
  );
};

export default Page;
