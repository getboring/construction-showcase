import { Tooltip as BaseTooltip } from "@base-ui/react";
import { cn } from "../../../lib/cn";

interface TooltipProps {
  title: string;
  children: React.ReactElement;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function Tooltip({ title, children, side = "top", className }: TooltipProps) {
  return (
    <BaseTooltip.Root>
      <BaseTooltip.Trigger>{children}</BaseTooltip.Trigger>
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner side={side} sideOffset={6}>
          <BaseTooltip.Popup
            className={cn(
              "bg-steel-800 border border-steel-700 rounded px-2.5 py-1.5 text-xs text-zinc-200 font-mono",
              className,
            )}
          >
            {title}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}