"use client";

import { Button } from "@/client/components/ui/button";
import { useCreateChat } from "@/client/hooks/chat";
import { Plus } from "lucide-react";

const NewChat = () => {
  const { createChat, isPending } = useCreateChat();
  return (
    <Button
      variant="outline"
      className="justify-between p-4 text-sm"
      onClick={async () => {
        await createChat();
      }}
      disabled={isPending}
    >
      <p>New Chat</p>
      <Plus size={20} />
    </Button>
  );
};

export default NewChat;
