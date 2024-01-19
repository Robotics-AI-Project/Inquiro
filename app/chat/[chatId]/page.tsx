import Message from "@client/components/pages/chat/message";
import Visualization from "@client/components/pages/chat/visualization";
import { ScrollArea } from "@client/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@client/components/ui/select";

export default function Home() {
  return (
    <ScrollArea className="h-[calc(100vh-60px-6rem)]">
      <div className="h-[72px]" />
      <Message agent="user">
        Give me the SQL query for top 5 movies in 2020
      </Message>
      <Message agent="bot">
        <p>
          I can provide you with the query for the top 5 movies released in 2020
          but what would be the criteria for defining the top movies? Different
          metrics can highlight different aspects of a film&apos;s success,
          please select the specific criteria to define “top” movies as follow:
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
  );
}
