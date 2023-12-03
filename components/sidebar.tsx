import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Navigation from "./navigation";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <aside className="t-0 group absolute z-20 flex h-full w-14 flex-col justify-between overflow-x-hidden border-r-[1px] border-solid border-border bg-background px-3 py-4 transition-all duration-150 hover:absolute hover:w-52 hover:shadow-xl">
      <div className="flex w-full flex-col space-y-8">
        <div className="flex h-8 w-8 items-center justify-center">
          <Image
            src="/assets/inquiro.svg"
            alt="Inquiro"
            height={24}
            width={24 * (1 / 1.5)}
          />
        </div>
        <Navigation />
      </div>
      <div className="flex flex-col space-y-4">
        <Separator />
        <UserButton />
      </div>
    </aside>
  );
};

export default Sidebar;
