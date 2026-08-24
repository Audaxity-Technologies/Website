import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/site/ThemeToggle";

const LINKS = [
  { to: "/platform", label: "Platform" },
  { to: "/minutes", label: "Minutes" },
  { to: "/vision", label: "Vision" },
  { to: "/about", label: "About" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <nav className="shell flex h-16 items-center justify-between" aria-label="Primary">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="signal-dot inline-block size-1.5 rounded-full bg-signal" />
          <span className="font-display text-[0.95rem] font-semibold tracking-[0.22em] uppercase">
            Audaxity
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link to="/minutes" className="btn-base btn-solid !px-4 !py-2 text-[0.8rem]">
            Explore Minutes
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex size-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={cn(
              "h-px w-5 bg-foreground transition-transform",
              open && "translate-y-[3px] rotate-45",
            )}
          />
          <span
            className={cn(
              "h-px w-5 bg-foreground transition-transform",
              open && "-translate-y-[3px] -rotate-45",
            )}
          />
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="shell flex flex-col py-4">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 text-base last:border-0"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 py-3 border-b border-border">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
            <Link
              to="/minutes"
              onClick={() => setOpen(false)}
              className="btn-base btn-solid mt-4 self-start"
            >
              Explore Minutes
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
