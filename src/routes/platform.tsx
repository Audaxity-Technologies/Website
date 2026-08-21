import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { CTABand, PageHeader, Pipeline, Section, StatementGrid } from "@/components/site/blocks";
import { KnowledgeNetwork } from "@/components/site/KnowledgeNetwork";

const title = "Platform — The Audaxity intelligence architecture";
const description =
  "Input, understanding, intelligence, structure, action: the reusable architecture Audaxity uses to turn unstructured human information into knowledge-aware outcomes.";

export const Route = createFileRoute("/platform")({
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
  component: PlatformPage,
});

const AGENT_STEPS = [
  ["Understands", "Speech, language, terminology and intent — before anything else happens."],
  ["Remembers", "Prior sessions, decisions and context persist as retrievable structure."],
  ["Reasons", "Relationships between concepts, obligations and people are inferred, not guessed."],
  ["Decides", "The system determines whether an outcome is warranted, and which one."],
  ["Uses tools", "Calendars, task systems, knowledge bases and APIs become executable surfaces."],
  ["Acts", "A task, an answer with provenance, an updated knowledge base, a triggered workflow."],
];

function PlatformPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform"
        title="Nothing acts before it understands."
        intro="The Audaxity platform is one architecture applied consistently: information enters unstructured, and leaves as knowledge that can be reasoned over and acted upon."
      />

      <div className="shell pb-10">
        <Reveal className="relative h-[300px] border border-border bg-cream md:h-[420px]">
          <KnowledgeNetwork order={1} />
        </Reveal>
      </div>

      <Section index="01" eyebrow="Architecture">
        <Pipeline
          stages={[
            { label: "Input", items: ["voice", "text", "documents", "events"] },
            { label: "Understanding", items: ["speech", "language", "context", "intent"] },
            { label: "Intelligence", items: ["LLMs", "knowledge", "memory", "reasoning"] },
            { label: "Structure", items: ["entities", "relationships", "knowledge graph"] },
            { label: "Action", items: ["agents", "tools", "workflows", "APIs"] },
          ]}
        />
      </Section>

      <Section index="02" eyebrow="Toward knowledge-aware action">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <h2 className="display-lg">
              Agents are only useful with memory and context.
            </h2>
            <p className="lead mt-6">
              We don't ship autonomy for its own sake. Each capability below is a step the system
              must earn before the next one is safe.
            </p>
          </Reveal>
          <ol className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {AGENT_STEPS.map(([t, b], i) => (
              <Reveal key={t} delay={i * 60} className="bg-background p-6">
                <span className="tech-label text-signal">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-lg font-medium">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section index="03" eyebrow="Design constraints">
        <StatementGrid
          items={[
            {
              title: "Provenance by default",
              body: "Every structured fact points back to the moment it came from. Answers cite the source inside the organisation, not the open web.",
            },
            {
              title: "Domain-shaped structure",
              body: "A syllabus is not a sprint board. The knowledge model adapts to the vocabulary of the domain it serves.",
            },
            {
              title: "Human checkpoints",
              body: "Actions that affect people surface for confirmation. Automation earns trust incrementally.",
            },
          ]}
        />
      </Section>

      <CTABand
        title="The architecture, applied."
        body="Minutes is the first full implementation of this platform, built for higher education."
      />
    </>
  );
}
