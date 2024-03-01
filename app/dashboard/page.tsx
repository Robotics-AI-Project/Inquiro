import EmptyDisplay from "@/client/components/empty-display";
import { BarChart3 } from "lucide-react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <EmptyDisplay
        icon={BarChart3}
        title="Please select a dashboard to start"
      />
    </div>
  );
};

export default Page;
