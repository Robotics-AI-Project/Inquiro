import React from "react";

type ResizeHandleAxis = "s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne";

type ResizeHandleProps = {
  handleAxis: ResizeHandleAxis;
};
const Handle = React.forwardRef<HTMLDivElement, ResizeHandleProps>(
  ({ handleAxis }, ref) => {
    return (
      <div
        ref={ref}
        className={`react-resizable-handle react-resizable-handle-${handleAxis} bg-red-500`}
      />
    );
  },
);

Handle.displayName = "Handle";

export default Handle;
