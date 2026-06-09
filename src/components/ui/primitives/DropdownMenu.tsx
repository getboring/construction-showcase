import { Menu } from "@base-ui/react";
import { cn } from "../../../lib/cn";

interface DropdownMenuItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  type?: never;
}

interface DropdownMenuSeparator {
  type: "separator";
}

interface DropdownMenuGroup {
  type: "group";
  label: string;
  items: DropdownMenuItem[];
}

interface DropdownMenuProps {
  trigger: React.ReactNode;
  label?: string;
  items: Array<DropdownMenuItem | DropdownMenuSeparator | DropdownMenuGroup>;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  className?: string;
}

function isSeparator(item: DropdownMenuItem | DropdownMenuSeparator | DropdownMenuGroup): item is DropdownMenuSeparator {
  return item.type === "separator";
}

function isGroup(item: DropdownMenuItem | DropdownMenuSeparator | DropdownMenuGroup): item is DropdownMenuGroup {
  return item.type === "group";
}

export function DropdownMenu({ trigger, label, items, side = "bottom", align = "start", className }: DropdownMenuProps) {
  return (
    <Menu.Root>
      <Menu.Trigger className="outline-none">{trigger}</Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner side={side} sideOffset={4} align={align} alignOffset={0}>
          <Menu.Popup
            className={cn(
              "bg-steel-900 border border-steel-700 rounded-lg shadow-2xl py-1 min-w-[180px] z-50",
              "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
              "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
              "transition-[opacity,transform] duration-150",
              className,
            )}
            aria-label={label}
          >
            {items.map((item, i) => {
              if (isSeparator(item)) {
                return <Menu.Separator key={`sep-${i}`} className="my-1 h-px bg-steel-700" />;
              }

              if (isGroup(item)) {
                return (
                  <Menu.Group key={`group-${i}`}>
                    <Menu.GroupLabel className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-steel-500">
                      {item.label}
                    </Menu.GroupLabel>
                    {item.items.map((sub) => (
                      <Menu.Item
                        key={sub.label}
                        disabled={sub.disabled}
                        onClick={sub.onClick}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 text-sm text-steel-300 cursor-default",
                          "data-[highlighted]:bg-steel-800 data-[highlighted]:text-zinc-50 outline-none",
                          sub.disabled && "opacity-50 cursor-not-allowed",
                        )}
                      >
                        {sub.icon && <span className="text-amber-500" aria-hidden="true">{sub.icon}</span>}
                        {sub.label}
                      </Menu.Item>
                    ))}
                  </Menu.Group>
                );
              }

              return (
                <Menu.Item
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
                </Menu.Item>
              );
            })}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

interface DropdownCheckboxMenuProps {
  trigger: React.ReactNode;
  label?: string;
  items: Array<{ label: string; checked: boolean; onCheckedChange: (checked: boolean) => void; icon?: React.ReactNode }>;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function DropdownCheckboxMenu({ trigger, label, items, side = "bottom", className }: DropdownCheckboxMenuProps) {
  return (
    <Menu.Root closeParentOnEsc>
      <Menu.Trigger className="outline-none">{trigger}</Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner side={side} sideOffset={4}>
          <Menu.Popup
            className={cn(
              "bg-steel-900 border border-steel-700 rounded-lg shadow-2xl py-1 min-w-[180px] z-50",
              "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
              "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
              "transition-[opacity,transform] duration-150",
              className,
            )}
            aria-label={label}
          >
            {items.map((item) => (
              <Menu.CheckboxItem
                key={item.label}
                checked={item.checked}
                onCheckedChange={item.onCheckedChange}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm text-steel-300 cursor-default",
                  "data-[highlighted]:bg-steel-800 data-[highlighted]:text-zinc-50 outline-none",
                )}
              >
                <Menu.CheckboxItemIndicator
                  className="w-4 h-4 rounded border border-steel-600 flex items-center justify-center data-[checked]:bg-amber-500 data-[checked]:border-amber-500 data-[checked]:text-steel-950"
                  keepMounted
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Menu.CheckboxItemIndicator>
                {item.icon && <span className="text-amber-500" aria-hidden="true">{item.icon}</span>}
                {item.label}
              </Menu.CheckboxItem>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

interface DropdownRadioMenuProps {
  trigger: React.ReactNode;
  label?: string;
  items: Array<{ label: string; value: string; icon?: React.ReactNode }>;
  value: string;
  onValueChange: (value: string) => void;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function DropdownRadioMenu({ trigger, label, items, value, onValueChange, side = "bottom", className }: DropdownRadioMenuProps) {
  return (
    <Menu.Root>
      <Menu.Trigger className="outline-none">{trigger}</Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner side={side} sideOffset={4}>
          <Menu.Popup
            className={cn(
              "bg-steel-900 border border-steel-700 rounded-lg shadow-2xl py-1 min-w-[180px] z-50",
              "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
              "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
              "transition-[opacity,transform] duration-150",
              className,
            )}
            aria-label={label}
          >
            <Menu.RadioGroup value={value} onValueChange={onValueChange}>
              {items.map((item) => (
                <Menu.RadioItem
                  key={item.value}
                  value={item.value}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm text-steel-300 cursor-default",
                    "data-[highlighted]:bg-steel-800 data-[highlighted]:text-zinc-50 outline-none",
                  )}
                >
                  <Menu.RadioItemIndicator
                    className="w-4 h-4 rounded-full border border-steel-600 flex items-center justify-center data-[checked]:border-amber-500"
                  keepMounted
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-500 data-[checked]:block hidden" />
                  </Menu.RadioItemIndicator>
                  {item.icon && <span className="text-amber-500" aria-hidden="true">{item.icon}</span>}
                  {item.label}
                </Menu.RadioItem>
              ))}
            </Menu.RadioGroup>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}