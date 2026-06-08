import { Collapsible } from "@base-ui/react";
import { cn } from "../../../lib/cn";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function CollapsibleSection({ title, children, defaultOpen = false, className }: CollapsibleSectionProps) {
  return (
    <Collapsible.Root defaultOpen={defaultOpen} className={cn("border-b border-steel-800", className)}>
      <Collapsible.Trigger className="flex items-center justify-between w-full py-5 text-left group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded">
        <span className="font-display text-lg text-zinc-50 group-hover:text-amber-400 transition-colors">{title}</span>
        <svg
          className="w-5 h-5 text-steel-500 group-hover:text-amber-400 transition-transform data-[panel-open]:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </Collapsible.Trigger>
      <Collapsible.Panel className="pb-5 text-steel-400 text-sm leading-relaxed data-[starting-style]:opacity-0 data-[starting-style]:grid-rows-[0fr] data-[ending-style]:opacity-0 data-[ending-style]:grid-rows-[0fr] transition-[opacity,grid-template-rows] duration-200 overflow-hidden">
        <div className="max-w-2xl">{children}</div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}