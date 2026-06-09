import { ContextMenu as BaseContextMenu } from "@base-ui/react";
import { cn } from "../../../lib/cn";

interface ContextMenuItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  type?: never;
}

interface ContextMenuSeparator {
  type: "separator";
}

interface ContextMenuProps {
  children: React.ReactNode;
  items: Array<ContextMenuItem | ContextMenuSeparator>;
  label?: string;
  className?: string;
}

function isSeparator(item: ContextMenuItem | ContextMenuSeparator): item is ContextMenuSeparator {
  return item.type === "separator";
}

export function ContextMenu({ children, items, label, className }: ContextMenuProps) {
  return (
    <BaseContextMenu.Root>
      <BaseContextMenu.Trigger className={className}>{children}</BaseContextMenu.Trigger>
      <BaseContextMenu.Portal>
        <BaseContextMenu.Positioner>
          <BaseContextMenu.Popup
            className={cn(
              "bg-steel-900 border border-steel-700 rounded-lg shadow-2xl py-1 min-w-[180px] z-50",
              "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
              "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
              "transition-[opacity,transform] duration-150",
            )}
            aria-label={label}
          >
            {items.map((item, i) => {
              if (isSeparator(item)) {
                return <BaseContextMenu.Separator key={`sep-${i}`} className="my-1 h-px bg-steel-700" />;
              }

              return (
                <BaseContextMenu.Item
                  key={item.label}
                  disabled={item.disabled}
                  onClick={item.onClick}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm text-steel-300 cursor-default",
                    "data-[highlighted]:bg-steel-800 data-[highlighted]:text-zinc-50 outline-none",
                    item.disabled && "opacity-50 cursor-not-allowed",
                  )}
                >
                  {item.icon && <span className="text-amber-500" aria-hidden="true">{item.icon}</span>}
                  {item.label}
                </BaseContextMenu.Item>
              );
            })}
          </BaseContextMenu.Popup>
        </BaseContextMenu.Positioner>
      </BaseContextMenu.Portal>
    </BaseContextMenu.Root>
  );
}