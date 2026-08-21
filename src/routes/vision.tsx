import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { CTABand, PageHeader, Section } from "@/components/site/blocks";

const title = "Vision — The intelligence layer for human knowledge | Audaxity";
const description =
  "Audaxity starts in higher education with Minutes and extends the same understanding-to-action pattern to research, organisations and other knowledge-heavy domains.";

export const Route = createFileRoute("/vision")({
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
  component: VisionPage,
});

const DOMAINS = [
  {
    tag: "Live — Minutes",
    name: "Education",
    flow: "Lecture → concepts → course context → student & teacher outcomes",
    status: "current",
  },
  {
    tag: "Exploration",
    name: "Organisations",
    flow: "Meetings → decisions → owners → workflows",
    status: "future",
  },
  {
    tag: "Exploration",
    name: "Research",
    flow: "Papers → concepts → connections → open questions",
    status: "future",
  },
  {
    tag: "Exploration",
    name: "Business",
    flow: "Communication → context → decisions → actions",
    status: "future",
  },
];

function VisionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Vision"
        title="Start narrow. Prove the pattern. Extend the layer."
        intro="The same transformation — understand, structure, act — applies wherever organisations run on human knowledge. We earn the right to each new domain by finishing the first one properly."
      />

      <Section index="01" eyebrow="Where the pattern travels">
        <ul className="grid gap-px border border-border bg-border">
          {DOMAINS.map((d, i) => (
            <Reveal
              key={d.name}
              delay={i * 70}
              as="li"
              className="flex flex-col gap-3 bg-background p-6 md:flex-row md:items-center md:justify-between md:p-8"
            >
              <div className="flex items-baseline gap-5">
                <span
                  className={
                    d.status === "current"
                      ? "tech-label text-signal"
                      : "tech-label"
                  }
                >
                  {d.tag}
                </span>
                <h3 className="font-display text-2xl font-medium">{d.name}</h3>
              </div>
              <p className="font-mono text-[0.72rem] text-muted-foreground">{d.flow}</p>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={120}>
          <p className="mt-6 max-w-2xl text-sm text-muted-foreground">
            Only Minutes is being built today. The other domains describe where the architecture can
            go — not products that exist.
          </p>
        </Reveal>
      </Section>

      <Section index="02" eyebrow="The long view">
        <Reveal>
          <blockquote className="display-lg max-w-4xl">
            “The bottleneck was never generating text. It was understanding what already
            <span className="text-signal"> happened</span>.”
          </blockquote>
        </Reveal>
        <Reveal delay={120}>
          <p className="lead mt-8">
            If a system genuinely understands an organisation's record — what was said, decided,
            taught and agreed — then acting on it stops being automation and starts being judgement
            support. That layer is what Audaxity is building.
          </p>
        </Reveal>
      </Section>

      <CTABand
        title="We're building the first layer now."
        body="Minutes is where the thesis gets tested against real classrooms."
      />
    </>
  );
}
