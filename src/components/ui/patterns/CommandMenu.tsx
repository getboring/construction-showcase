import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DialogRoot, DialogTrigger, DialogContent, DialogClose } from "../primitives";

const commands = [
  { label: "Home", href: "/", icon: "H" },
  { label: "About", href: "/about", icon: "A" },
  { label: "Services", href: "/services", icon: "S" },
  { label: "Projects", href: "/projects", icon: "P" },
  { label: "Process", href: "/process", icon: "P" },
  { label: "Fleet", href: "/fleet", icon: "F" },
  { label: "Safety", href: "/safety", icon: "S" },
  { label: "Careers", href: "/careers", icon: "C" },
  { label: "Contact", href: "/contact", icon: "C" },
  { label: "Get a Quote", href: "/quote", icon: "Q" },
  { label: "Blog", href: "/blog", icon: "B" },
];

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      navigate(href);
    },
    [navigate],
  );

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger className="hidden md:inline-flex items-center gap-2 font-mono text-xs text-steel-500 uppercase tracking-widest px-3 py-1.5 border border-steel-800 rounded hover:border-steel-600 transition-colors">
        <span>Search</span>
        <kbd className="text-[10px] bg-steel-800 px-1.5 py-0.5 rounded border border-steel-700">⌘K</kbd>
      </DialogTrigger>

      <DialogContent className="!max-w-lg !p-0 overflow-hidden">
        <DialogClose className="!top-3 !right-3">&times;</DialogClose>
        <div className="p-4 border-b border-steel-800">
          <input
            type="text"
            placeholder="Search pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-zinc-50 text-sm placeholder:text-steel-600 focus:outline-none font-mono"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
        </div>
        <div className="max-h-64 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="text-steel-500 text-sm text-center py-4 font-mono">No results found</p>
          )}
          {filtered.map((cmd) => (
            <button
              key={cmd.href}
              onClick={() => handleSelect(cmd.href)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-left hover:bg-steel-800 transition-colors group"
            >
              <span className="w-8 h-8 rounded bg-steel-800 group-hover:bg-amber-500/10 border border-steel-700 group-hover:border-amber-500/20 flex items-center justify-center font-display text-sm text-amber-500 transition-colors">
                {cmd.icon}
              </span>
              <span className="text-sm text-zinc-200 group-hover:text-zinc-50 transition-colors">{cmd.label}</span>
              <span className="ml-auto font-mono text-[10px] text-steel-600">{cmd.href}</span>
            </button>
          ))}
        </div>
        <div className="border-t border-steel-800 px-4 py-2 flex items-center gap-4">
          <span className="font-mono text-[10px] text-steel-600">Navigate</span>
          <span className="font-mono text-[10px] text-steel-500">↑↓ select</span>
          <span className="font-mono text-[10px] text-steel-500">↵ open</span>
          <span className="font-mono text-[10px] text-steel-500">esc close</span>
        </div>
      </DialogContent>
    </DialogRoot>
  );
}