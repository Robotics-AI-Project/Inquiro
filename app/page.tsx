import Header from "@/components/pages/chat/header";
import Message from "@/components/pages/chat/message";
import MessageInput from "@/components/pages/chat/message-input";
import Visualization from "@/components/pages/chat/visualization";
import Toolbar from "@/components/toolbar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoreHorizontal, Pencil, Plus, Trash } from "lucide-react";

export default function Home() {
  return (
    <div className="flex h-full">
      <Toolbar className="w-56">
        <div className="flex flex-col space-y-[22px]">
          <Button variant="outline" className="justify-between p-4 text-sm">
            <p>New Chat</p>
            <Plus size={20} />
          </Button>
          <div className="flex flex-col space-y-1 text-sm">
            <p className="relative left-3 text-gray-500">Today</p>
            <Button
              variant="secondary"
              className="h-auto w-auto justify-start gap-2 px-3 py-[6px]"
            >
              <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap ">
                Top 10 Movies in 2020
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="rounded-lg">
                  <Button
                    asChild
                    variant="secondary"
                    className="h-auto w-auto rounded-sm p-0"
                  >
                    <MoreHorizontal size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-lg">
                  <DropdownMenuItem className="rounded-md">
                    <div className="flex items-center space-x-2">
                      <Pencil size={18} />
                      <p>Rename</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-md text-red-500 focus:bg-red-200 focus:text-red-600">
                    <div className="flex items-center space-x-2">
                      <Trash size={18} />
                      <p>Delete chat</p>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Button>
          </div>
          <div className="flex flex-col space-y-1 text-sm">
            <p className="relative left-3 text-gray-500">Previous 7 Days</p>
            <Button
              variant="ghost"
              className="h-auto w-auto justify-start px-3 py-[6px] font-normal"
            >
              Avg Mac System Data
            </Button>
            <Button
              variant="ghost"
              className="h-auto w-auto justify-start px-3 py-[6px] font-normal"
            >
              Solar Roof Market Trends
            </Button>
          </div>
        </div>
      </Toolbar>
      <main className="relative flex w-full flex-col overflow-scroll">
        <ScrollArea className="h-[calc(100vh-60px-6rem)]">
          <div className="h-[72px]" />
          <Message agent="user">
            Give me the SQL query for top 5 movies in 2020
          </Message>
          <Message agent="bot">
            <p>
              I can provide you with the query for the top 5 movies released in
              2020 but what would be the criteria for defining the top movies?
              Different metrics can highlight different aspects of a film&apos;s
              success, please select the specific criteria to define “top”
              movies as follow:
            </p>
            <Select>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select criteria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Box Office Gross">
                  <p>Box Office Gross</p>
                </SelectItem>
              </SelectContent>
            </Select>
          </Message>
          <Message agent="user">
            Give me the SQL query for top 5 movies in 2020 based on their “Box
            Office Gross”
          </Message>
          <Message agent="bot">
            <p>
              Based on your request, the SQL query for top 5 movies of 2020
              according to their box office gross are as follow:
            </p>
            <Visualization generationId="1" />
          </Message>
        </ScrollArea>
        <Header />
        <MessageInput />
      </main>
    </div>
  );
}
