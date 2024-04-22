"use client";

import { useCreateSnippet } from "@/client/hooks/snippet";
import { Button } from "@client/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@client/components/ui/dialog";
import { Input } from "@client/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@client/components/ui/tooltip";
import { Loader2, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  sql: string;
};

const SaveSnippet = ({ sql }: Props) => {
  const { mutateAsync, isPending } = useCreateSnippet(sql);
  const [showEnterSaveModal, setShowEnterSaveModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [name, setName] = useState("");
  const onSnippetSave = async () => {
    await mutateAsync({ name });
    setShowEnterSaveModal(false);
    setShowSuccessModal(true);
  };
  return (
    <>
      <Dialog open={showEnterSaveModal} onOpenChange={setShowEnterSaveModal}>
        <DialogTrigger>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  asChild
                  variant="outline"
                  className="h-auto w-auto p-2 text-white"
                >
                  <Save size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>💾 Save Snippet</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DialogTrigger>
        {/* @ts-ignore */}
        <DialogContent hideClose className="w-96 rounded-2xl p-8">
          <p className="text-center text-2xl font-semibold">💾 Save snippet</p>
          <p className="text-center text-sm">
            Enter a name. This will appear in your library.
          </p>
          <Input
            placeholder="e.g. Members with no order in Oct 2023"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <div className="flex gap-2">
            <DialogClose className="w-full">
              <Button variant="outline" className="w-full" disabled={isPending}>
                Close
              </Button>
            </DialogClose>

            <Button
              className="flex w-full items-center gap-2"
              disabled={isPending || !name}
              onClick={onSnippetSave}
              type="submit"
            >
              {isPending && <Loader2 className="animate-spin" />}
              <p>Save</p>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        {/* @ts-ignore */}
        <DialogContent hideClose className="w-96 rounded-2xl px-8 py-6">
          <p className="text-center text-2xl font-semibold">🎉 Snippet saved</p>
          <p className="text-center text-sm">
            Your snippet has been saved to your library.
          </p>
          <DialogClose>
            <Button className="w-full bg-green-500 hover:bg-green-500/75">
              Continue
            </Button>
            <Link href="/snippet">
              <Button variant="link" className="text-sm text-gray-400">
                View snippet library
              </Button>
            </Link>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SaveSnippet;
