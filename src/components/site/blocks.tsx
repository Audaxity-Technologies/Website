import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Section({
  id,
  index,
  eyebrow,
  children,
  className,
  bleed = false,
}: {
  id?: string;
  index?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  bleed?: boolean;
}) {
  return (
    <section id={id} className={cn("rule-top py-20 md:py-32", className)}>
      <div className={bleed ? "" : "shell"}>
        {(index || eyebrow) && (
          <Reveal className="mb-10 flex items-baseline gap-4 md:mb-14">
            {index && <span className="tech-label text-signal">{index}</span>}
            {eyebrow && <span className="tech-label">{eyebrow}</span>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
}) {
  return (
    <header className="shell pt-32 pb-16 md:pt-44 md:pb-24">
      <Reveal>
        <p className="tech-label text-signal">{eyebrow}</p>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="display-lg mt-6 max-w-4xl">{title}</h1>
      </Reveal>
      <Reveal delay={160}>
        <p className="lead mt-7 max-w-2xl">{intro}</p>
      </Reveal>
    </header>
  );
}

/** Horizontal (desktop) / vertical (mobile) pipeline diagram. */
export function Pipeline({
  stages,
}: {
  stages: { label: string; items: string[] }[];
}) {
  return (
    <ol className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-5">
      {stages.map((s, i) => (
        <li key={s.label} className="bg-background">
          <Reveal delay={i * 70} className="flex h-full flex-col p-6">
            <div className="flex items-center justify-between">
              <span className="tech-label">{String(i + 1).padStart(2, "0")}</span>
              {i < stages.length - 1 && (
                <span aria-hidden className="text-signal">
                  →
                </span>
              )}
            </div>
            <h3 className="mt-6 font-display text-lg font-medium">{s.label}</h3>
            <ul className="mt-4 space-y-1.5">
              {s.items.map((it) => (
                <li key={it} className="font-mono text-[0.7rem] tracking-wide text-muted-foreground">
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export function StatementGrid({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i * 60} className="bg-background p-7 md:p-9">
          <span className="tech-label text-signal">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-6 font-display text-xl font-medium">{it.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function CTABand({
  title,
  body,
  primary = { to: "/minutes", label: "Explore Minutes" },
  secondary = { to: "/contact", label: "Talk to us" },
}: {
  title: string;
  body: string;
  primary?: { to: string; label: string };
  secondary?: { to: string; label: string };
}) {
  return (
    <section className="rule-top py-20 md:py-28">
      <div className="shell">
        <Reveal className="flex flex-col gap-8 border border-border bg-cream p-8 md:flex-row md:items-end md:justify-between md:p-14">
          <div>
            <h2 className="display-md max-w-xl">{title}</h2>
            <p className="lead mt-4 text-[1rem]">{body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to={primary.to as never} className="btn-base btn-solid">
              {primary.label}
            </Link>
            <Link to={secondary.to as never} className="btn-base btn-ghost">
              {secondary.label}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const cols = [
    {
      title: "Company",
      links: [
        { to: "/platform", label: "Platform" },
        { to: "/vision", label: "Vision" },
        { to: "/about", label: "About" },
      ],
    },
    {
      title: "Product",
      links: [{ to: "/minutes", label: "Minutes" }],
    },
    {
      title: "Contact",
      links: [{ to: "/contact", label: "Get in touch" }],
    },
  ];

  return (
    <footer className="rule-top bg-cream">
      <div className="shell py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,minmax(0,0.6fr))]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-signal" />
              <span className="font-display text-sm font-semibold tracking-[0.22em] uppercase">
                Audaxity
              </span>
            </div>
            <p className="mt-5 max-w-xs font-display text-2xl leading-tight tracking-tight">
              Making messy human knowledge actionable.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="tech-label">{c.title}</p>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to as never}
                      className="text-sm text-muted-foreground transition-colors hover:text-signal"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Audaxity Technologies</p>
          <p className="font-mono tracking-[0.16em] uppercase">
            Information → Intelligence → Action
          </p>
        </div>
      </div>
    </footer>
  );
}
