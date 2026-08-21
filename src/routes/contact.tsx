import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHeader } from "@/components/site/blocks";

const title = "Contact — Audaxity Technologies";
const description =
  "Reach Audaxity Technologies about Minutes, higher-education partnerships, or the intelligence platform.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const ROUTES = [
  { label: "Minutes & institutions", value: "hello@audaxity.in" },
  { label: "General", value: "hello@audaxity.in" },
  { label: "Web", value: "audaxity.in" },
];

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us what you're trying to make sense of."
        intro="Departments, faculty and teams working with knowledge-heavy information are the people we most want to hear from."
      />

      <section className="shell pb-28">
        <div className="grid gap-px border border-border bg-border md:grid-cols-3">
          {ROUTES.map((r, i) => (
            <Reveal key={r.label} delay={i * 70} className="bg-background p-8">
              <p className="tech-label">{r.label}</p>
              <a
                href={r.value.includes("@") ? `mailto:${r.value}` : `https://${r.value}`}
                className="mt-4 block font-display text-xl font-medium break-all transition-colors hover:text-signal"
              >
                {r.value}
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={150}>
          <p className="mt-10 max-w-xl text-sm text-muted-foreground">
            We read everything. If you're a professor, a department head or a student who has felt
            this problem first-hand, that context is more useful to us than a formal enquiry.
          </p>
        </Reveal>
      </section>
    </>
  );
}
