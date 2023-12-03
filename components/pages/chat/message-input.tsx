"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

const MessageInput = () => {
  const [prompt, setPrompt] = useState("");
  return (
    <section className="flex h-24 w-full flex-col items-center">
      <div className="relative">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-[880px] resize-none rounded-2xl py-5 pl-8 pr-16"
          placeholder="Enter message here"
          maxRows={2}
        />
        <Button
          className="w-autp absolute right-4 top-4 h-auto p-[6px] transition-all duration-150"
          variant="secondary"
          disabled={!prompt}
        >
          <ArrowUp size={20} />
        </Button>
      </div>
    </section>
  );
};

export default MessageInput;
