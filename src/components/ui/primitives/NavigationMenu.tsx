import { NavigationMenu } from "@base-ui/react";
import { cn } from "../../../lib/cn";
import { Link } from "react-router-dom";

interface NavMenuProps {
  items: Array<{ label: string; href: string; children?: Array<{ label: string; href: string; description?: string }> }>;
  className?: string;
}

export function NavMenu({ items, className }: NavMenuProps) {
  return (
    <NavigationMenu.Root className={cn("relative", className)}>
      <NavigationMenu.List className="flex items-center gap-1">
        {items.map((item) => (
          <NavigationMenu.Item key={item.href}>
            {item.children ? (
              <>
                <NavigationMenu.Trigger className="text-xs text-steel-400 hover:text-amber-500 uppercase tracking-widest font-medium transition-colors whitespace-nowrap flex items-center gap-1 px-3 py-2 rounded focus-visible:outline-2 focus-visible:outline-amber-500">
                  {item.label}
                  <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content
                  className="absolute top-full left-0 mt-2 bg-steel-900 border border-steel-800 rounded-lg p-4 min-w-[240px] shadow-xl z-50 data-[starting-style]:opacity-0 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[ending-style]:scale-95 transition-opacity transition-transform duration-200"
                >
                  {item.children.map((child) => (
                    <NavigationMenu.Link key={child.href} href={child.href} className="flex items-start gap-3 px-3 py-2.5 rounded hover:bg-steel-800 transition-colors group">
                      <div>
                        <p className="text-sm text-zinc-200 group-hover:text-zinc-50 font-medium">{child.label}</p>
                        {child.description && (
                          <p className="text-xs text-steel-500 mt-0.5 leading-relaxed">{child.description}</p>
                        )}
                      </div>
                    </NavigationMenu.Link>
                  ))}
                </NavigationMenu.Content>
              </>
            ) : (
              <NavigationMenu.Link
                href={item.href}
                className="text-xs text-steel-400 hover:text-amber-500 uppercase tracking-widest font-medium transition-colors whitespace-nowrap px-3 py-2 rounded focus-visible:outline-2 focus-visible:outline-amber-500"
              />
            )}
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
      <NavigationMenu.Viewport
        className="absolute top-full left-0 w-full h-0 pointer-events-none"
      />
    </NavigationMenu.Root>
  );
}

export function SimpleNav({ items, className }: { items: Array<{ label: string; href: string }>; className?: string }) {
  return (
    <nav className={cn("hidden md:flex items-center gap-1", className)} aria-label="Main navigation">
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className="text-xs text-steel-400 hover:text-amber-500 uppercase tracking-widest font-medium transition-colors whitespace-nowrap px-3 py-2 rounded focus-visible:outline-2 focus-visible:outline-amber-500"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}