import { Popover as BasePopover } from "@base-ui/react";
import { cn } from "../../../lib/cn";

interface PopoverProps {
  trigger: React.ReactElement;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function Popover({ trigger, children, side = "bottom", className }: PopoverProps) {
  return (
    <BasePopover.Root>
      <BasePopover.Trigger>{trigger}</BasePopover.Trigger>
      <BasePopover.Portal>
        <BasePopover.Positioner side={side} sideOffset={8}>
          <BasePopover.Popup
            className={cn(
              "bg-steel-900 border border-steel-700 rounded-lg shadow-lg p-4 min-w-[200px] z-50",
              "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
              "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
              "transition-opacity transition-transform duration-150",
              className,
            )}
          >
            {children}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}