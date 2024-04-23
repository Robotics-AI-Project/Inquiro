"use client";

import { useSnippetRename } from "@/client/hooks/snippet";
import { Pencil, Save, X } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../../ui/button";

type Props = {
  name: string;
  snippetId: string;
};

const SnippetHeader = ({ name, snippetId }: Props) => {
  const [newName, setNewName] = useState(name);
  const [showEditToolbar, setShowEditToolbar] = useState(false);
  const { mutateAsync } = useSnippetRename(snippetId);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const onNewNameSave = async () => {
    headingRef?.current?.blur();
    setNewName(headingRef.current?.innerText || "");
    setShowEditToolbar(false);
    await mutateAsync({ name: headingRef.current?.innerText || "" });
  };

  return (
    <div className="group flex w-max items-center gap-2">
      <h1
        contentEditable
        className="box-border  rounded-md border-[1px] border-transparent px-1 py-[2px] text-3xl font-bold outline-offset-1 outline-primary transition-all duration-200 group-hover:border-input group-hover:bg-muted"
        ref={headingRef}
        onFocus={(e) => {
          setShowEditToolbar(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onNewNameSave();
          }
        }}
        spellCheck={false}
        suppressContentEditableWarning
      >
        {name}
      </h1>
      {!showEditToolbar ? (
        <Pencil
          className="hidden text-muted-foreground group-hover:block"
          size={16}
        />
      ) : (
        <div className="ml-2 flex items-center gap-2">
          <Button
            variant="ghost"
            className="h-max rounded-md bg-muted p-1 text-muted-foreground"
            onClick={onNewNameSave}
          >
            <Save size={16} />
          </Button>
          <Button
            variant="ghost"
            className="h-max rounded-md bg-muted p-1 text-muted-foreground"
            onClick={() => {
              console.log("yoyoy");
              if (headingRef.current) {
                headingRef.current.innerText = newName;
                setShowEditToolbar(false);
              }
            }}
          >
            <X size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SnippetHeader;
