import Toolbar from "@/components/toolbar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <div className="flex h-full">
      <Toolbar>
        <Button variant="outline" className="w-52 justify-between p-4 text-sm">
          <p>New Chat</p>
          <Plus size={20} />
        </Button>
      </Toolbar>
      <main className="relative flex w-full flex-col overflow-scroll">
        <div className="absolute left-4 top-4 z-20">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ScrollArea className="h-[calc(100vh-60px-6rem)]"></ScrollArea>
        <section className="h-24 w-full bg-red-50">footer</section>
      </main>
    </div>
  );
}
