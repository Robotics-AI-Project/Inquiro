import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
};

const EmptyDisplay = ({ icon, title }: Props) => {
  const Icon = icon;
  return (
    <div className="flex flex-col items-center space-y-2 text-muted-foreground">
      <div className="flex items-center justify-center rounded-lg bg-muted p-2 ">
        <Icon className="h-8 w-8" />
      </div>
      <p className="font-light italic">{title}</p>
    </div>
  );
};

export default EmptyDisplay;
