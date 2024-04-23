"use client";

import { Loader2, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { cn } from "../libs/utils";
import { Button, ButtonProps } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = Omit<ButtonProps, "onClick"> & {
  onRename: () => void;
  onDelete: () => void;
  id: string;
  name: string;
  isSelected: boolean;
  onClick?: (id: string) => void;
  loading?: boolean;
  startIcon?: React.ReactNode;
};

const ListButton = ({
  isSelected,
  id,
  name,
  onDelete,
  onRename,
  disabled,
  loading,
  className,
  onClick,
  startIcon,
}: Props) => {
  return (
    <Button
      variant={isSelected ? "secondary" : "ghost"}
      className={cn(
        "h-auto w-full justify-start gap-2 px-3 py-[6px]",
        !isSelected && "font-normal",
        className,
      )}
      disabled={disabled || loading}
      onClick={(e) => {
        if (!isSelected && onClick) onClick(id);
      }}
    >
      {startIcon && startIcon}
      {loading && <Loader2 className="animate-spin" />}
      <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-start ">
        {name}
      </p>
      {isSelected && (
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
            <DropdownMenuItem className="rounded-md" onClick={onRename}>
              <div className="flex items-center space-x-2">
                <Pencil size={18} />
                <p>Rename</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="rounded-md text-red-500 focus:bg-red-200 focus:text-red-600"
              onClick={onDelete}
            >
              <div className="flex items-center space-x-2">
                <Trash size={18} />
                <p>Delete</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </Button>
  );
};

export default ListButton;
