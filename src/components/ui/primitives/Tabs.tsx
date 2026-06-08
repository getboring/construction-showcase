import { Tabs } from "@base-ui/react";
import { cn } from "../../../lib/cn";

interface TabsGroupProps {
  defaultValue?: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsGroup({ defaultValue, children, className }: TabsGroupProps) {
  return (
    <Tabs.Root defaultValue={defaultValue} className={cn("", className)}>
      {children}
    </Tabs.Root>
  );
}

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Tabs.List className={cn("flex border-b border-steel-800 gap-0", className)}>
      {children}
    </Tabs.List>
  );
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  return (
    <Tabs.Tab value={value} className={cn(
      "font-mono text-xs uppercase tracking-widest px-6 py-3 text-steel-400",
      "hover:text-amber-400 transition-colors",
      "data-[selected]:text-amber-500 data-[selected]:border-b-2 data-[selected]:border-amber-500",
      className,
    )}>
      {children}
    </Tabs.Tab>
  );
}

interface TabsPanelProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsPanel({ value, children, className }: TabsPanelProps) {
  return (
    <Tabs.Panel value={value} className={cn("py-6 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 transition-opacity duration-200", className)}>
      {children}
    </Tabs.Panel>
  );
}