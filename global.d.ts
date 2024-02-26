// global.d.ts file

// Issue caused by radix type mismatched with the current project's typescript version (^5)
// Ref: https://github.com/radix-ui/primitives/issues/2309#issuecomment-1916541133

import { PropsWithChildren } from "react";

declare module "@radix-ui/react-dropdown-menu" {
  export interface DropdownMenuSubTriggerProps extends PropsWithChildren {
    className?: string;
  }
  export interface DropdownMenuSubContentProps extends PropsWithChildren {
    className?: string;
  }
  export interface DropdownMenuContentProps extends PropsWithChildren {
    className?: string;
    sideOffset?: number;
  }
  export interface DropdownMenuItemProps extends PropsWithChildren {
    className?: string;
    onClick?: () => void;
  }
  export interface DropdownMenuCheckboxItemProps extends PropsWithChildren {
    className?: string;
    checked?: boolean;
  }
  export interface DropdownMenuRadioItemProps extends PropsWithChildren {
    className?: string;
  }
  export interface DropdownMenuLabelProps extends PropsWithChildren {
    className?: string;
  }
  export interface DropdownMenuSeparatorProps extends PropsWithChildren {
    className?: string;
  }
}

declare module "@radix-ui/react-tooltip" {
  export interface TooltipContentProps extends PropsWithChildren {
    className?: string;
    sideOffset?: number;
  }
  export interface TooltipTriggerProps extends PropsWithChildren {
    className?: string;
  }
}

declare module "@radix-ui/react-accordion" {
  export interface AccordionContentProps extends PropsWithChildren {
    className?: string;
  }
  export interface AccordionTriggerProps extends PropsWithChildren {
    className?: string;
    onClick?: () => void;
  }
  export interface AccordionItemProps extends PropsWithChildren {
    className?: string;
  }
}
