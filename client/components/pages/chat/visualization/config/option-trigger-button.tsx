import { Button } from "@/client/components/ui/button";
import { Settings } from "lucide-react";

const OptionTriggerButton = () => {
  return (
    <Button
      asChild
      variant="outline"
      className="h-max rounded-xl p-1 text-black/60 hover:text-black/80"
    >
      <Settings size={32} />
    </Button>
  );
};

export default OptionTriggerButton;
