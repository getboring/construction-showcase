import { Autocomplete } from "@base-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

interface SearchItem {
  label: string;
  href: string;
  group: string;
}

const allSearchItems: SearchItem[] = [
  { label: "Home", href: "/", group: "Pages" },
  { label: "About", href: "/about", group: "Pages" },
  { label: "Services", href: "/services", group: "Pages" },
  { label: "Projects", href: "/projects", group: "Pages" },
  { label: "Process", href: "/process", group: "Pages" },
  { label: "Fleet", href: "/fleet", group: "Pages" },
  { label: "Safety", href: "/safety", group: "Pages" },
  { label: "Careers", href: "/careers", group: "Pages" },
  { label: "Contact", href: "/contact", group: "Pages" },
  { label: "Get a Quote", href: "/quote", group: "Actions" },
  { label: "Blog", href: "/blog", group: "Pages" },
  { label: "General Contracting", href: "/services/general-contracting", group: "Services" },
  { label: "Design-Build", href: "/services/design-build", group: "Services" },
  { label: "Construction Management", href: "/services/construction-management", group: "Services" },
  { label: "Pre-Construction", href: "/services/pre-construction", group: "Services" },
  { label: "Steel Erection", href: "/services/steel-erection", group: "Services" },
  { label: "Concrete & Foundations", href: "/services/concrete", group: "Services" },
  { label: "Seaman Corporation Phase I", href: "/projects/seaman-corporation-phase-i", group: "Projects" },
  { label: "Towne Acres Elementary School", href: "/projects/towne-acres-elementary-school", group: "Projects" },
  { label: "Food City Store 706", href: "/projects/food-city-store-706", group: "Projects" },
  { label: "Blountville Recreational Center", href: "/projects/blountville-recreational-center", group: "Projects" },
  { label: "Wallace Ford Dealership", href: "/projects/wallace-ford-dealership", group: "Projects" },
];

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false);
      void navigate(href);
    },
    [navigate],
  );

  const filteredItems = query
    ? allSearchItems.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.href.toLowerCase().includes(query.toLowerCase()),
      )
    : allSearchItems;

  const grouped = filteredItems.reduce<Record<string, SearchItem[]>>((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});

  return (
    <Autocomplete.Root open={open} onOpenChange={setOpen}>
      <Autocomplete.Trigger className="hidden md:inline-flex items-center gap-2 font-mono text-xs text-steel-500 uppercase tracking-widest px-3 py-1.5 border border-steel-800 rounded hover:border-steel-600 transition-colors">
        <span>Search</span>
        <kbd className="text-[10px] bg-steel-800 px-1.5 py-0.5 rounded border border-steel-700">⌘K</kbd>
      </Autocomplete.Trigger>

      <Autocomplete.Portal>
        <Autocomplete.Backdrop className="fixed inset-0 bg-black/60 z-50" />
        <Autocomplete.Positioner className="fixed top-[20%] left-1/2 -translate-x-1/2 z-50 w-full max-w-lg" sideOffset={8}>
          <Autocomplete.Popup className="bg-steel-950 border border-steel-800 rounded-lg shadow-2xl overflow-hidden data-[starting-style]:opacity-0 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[ending-style]:scale-95 transition-[opacity,transform] duration-200">
            <Autocomplete.Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages, services, projects..."
              className="w-full bg-transparent text-zinc-50 text-sm placeholder:text-steel-400 focus:outline-none px-4 py-3 border-b border-steel-800"
            />

            <Autocomplete.List className="max-h-72 overflow-y-auto py-1">
              {Object.entries(grouped).map(([group, items]) => (
                <Autocomplete.Group key={group}>
                  <Autocomplete.GroupLabel className="px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-steel-500 sticky top-0 bg-steel-950">
                    {group}
                  </Autocomplete.GroupLabel>
                  {items.map((item) => (
                    <Autocomplete.Item
                      key={item.href}
                      value={item.label}
                      onClick={() => handleSelect(item.href)}
                      className="flex items-center gap-3 px-4 py-2.5 text-left cursor-default hover:bg-steel-800 data-[highlighted]:bg-steel-800 outline-none"
                    >
                      <span className="text-sm text-zinc-200 data-[highlighted]:text-zinc-50">{item.label}</span>
                      <span className="ml-auto font-mono text-[10px] text-steel-600">{item.href}</span>
                    </Autocomplete.Item>
                  ))}
                </Autocomplete.Group>
              ))}
              <Autocomplete.Empty className="text-steel-500 text-sm text-center py-4 font-mono">
                No results found
              </Autocomplete.Empty>
            </Autocomplete.List>

            <div className="border-t border-steel-800 px-4 py-2 flex items-center gap-4">
              <span className="font-mono text-[10px] text-steel-500">↑↓ navigate</span>
              <span className="font-mono text-[10px] text-steel-500">↵ select</span>
              <span className="font-mono text-[10px] text-steel-500">esc close</span>
            </div>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
}