import { ScrollArea } from "@base-ui/react";
import { cn } from "../../../lib/cn";

interface ScrollAreaRootProps {
  children: React.ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function ScrollAreaRoot({ children, className, orientation = "horizontal" }: ScrollAreaRootProps) {
  return (
    <ScrollArea.Root
      className={cn("overflow-hidden", orientation === "horizontal" && "w-full", className)}
    >
      <ScrollArea.Viewport className={cn("w-full h-full", orientation === "horizontal" ? "overflow-x-auto overflow-y-hidden" : "overflow-y-auto overflow-x-hidden")}>
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        orientation={orientation}
        className={cn(
          "flex touch-none select-none transition-colors",
          orientation === "horizontal" ? "h-2 flex-col mt-1" : "w-2 flex-row ml-1",
        )}
      >
        <ScrollArea.Thumb
          className={cn(
            "relative flex-1 rounded-full bg-steel-700 hover:bg-amber-500/50",
            orientation === "horizontal" ? "h-1.5 min-w-[32px]" : "w-1.5 min-h-[32px]",
          )}
        />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}