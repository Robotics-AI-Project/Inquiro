import { Loader2 } from "lucide-react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default Page;
