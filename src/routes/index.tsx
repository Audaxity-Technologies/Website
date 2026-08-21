import { createFileRoute, Link } from "@tanstack/react-router";
import { KnowledgeNetwork } from "@/components/site/KnowledgeNetwork";
import { Reveal, useScrollProgress } from "@/components/site/Reveal";
import { CTABand, Pipeline, Section, StatementGrid } from "@/components/site/blocks";
import { LensDemo } from "@/components/site/LensDemo";
import { MinutesScene } from "@/components/site/MinutesScene";

const title = "Audaxity Technologies — Making messy human knowledge actionable";
const description =
  "Audaxity builds the intelligence layer between human knowledge and action: AI that understands conversations, documents and lectures, structures them, and turns them into outcomes. First product: Minutes, an AI academic intelligence platform.";

export const Route = createFileRoute("/")({
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
  component: Home,
});

function Hero() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  // hero starts scattered and organizes as the visitor begins to scroll
  const order = Math.min(1, Math.max(0, (progress - 0.42) * 3.4));

  return (
    <div ref={ref} className="relative overflow-hidden pt-28 pb-16 md:pt-40 md:pb-24">
      <div aria-hidden className="hairline-grid pointer-events-none absolute inset-0" />
      <div className="shell relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <Reveal>
            <p className="tech-label">Audaxity Technologies — Intelligence Systems</p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="display-xl mt-7">
              Making messy human
              <br />
              knowledge <span className="text-signal">actionable</span>.
            </h1>
          </Reveal>
          <Reveal delay={170}>
            <p className="lead mt-8">
              Organisations run on conversations, lectures, documents and decisions — and almost all
              of it stays unstructured. Audaxity builds the layer that understands that information,
              connects it, and turns it into action.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/minutes" className="btn-base btn-solid">
                Explore Minutes
              </Link>
              <a href="#how" className="btn-base btn-ghost">
                See how it works
              </a>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <p className="mt-10 max-w-md border-l border-border pl-4 text-sm text-muted-foreground">
              First product — <span className="text-foreground">Minutes</span>, an AI academic
              intelligence platform for higher education.
            </p>
          </Reveal>
        </div>

        <div className="relative h-[340px] sm:h-[420px] lg:h-[560px]">
          <KnowledgeNetwork order={0.34 + order * 0.66} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between">
            <span className="tech-label">Input</span>
            <span className="tech-label">Understanding</span>
            <span className="tech-label">Structure</span>
            <span className="tech-label text-signal">Action</span>
          </div>
        </div>
      </div>

      <div className="shell mt-16 flex items-center gap-4">
        <span className="tech-label">Scroll — the system organises itself</span>
        <span aria-hidden className="h-px flex-1 bg-border" />
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      <Hero />

      <Section id="how" index="01" eyebrow="The problem">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <h2 className="display-lg max-w-xl">
              Information is everywhere.
              <br />
              Context isn't.
            </h2>
          </Reveal>
          <Reveal delay={120} className="self-end">
            <p className="lead">
              A lecture, a thread, a decision made in a hallway. Humans produce knowledge in the
              messiest possible format, then spend hours re-typing it into software that never
              understood it in the first place.
            </p>
          </Reveal>
        </div>
        <Reveal delay={180} className="mt-14 flex flex-wrap gap-2">
          {[
            "voice notes",
            "lecture recordings",
            "hallway decisions",
            "PDF chapters",
            "chat threads",
            "annotations",
            "announcements",
            "whiteboards",
            "half-written notes",
            "deadlines",
            "assumptions",
            "context nobody wrote down",
          ].map((f, i) => (
            <span
              key={f}
              className="border border-border px-3 py-1.5 font-mono text-[0.7rem] text-muted-foreground"
              style={{ transform: `rotate(${((i % 5) - 2) * 0.8}deg)` }}
            >
              {f}
            </span>
          ))}
        </Reveal>
      </Section>

      <Section index="02" eyebrow="The aha moment">
        <Reveal>
          <h2 className="display-lg max-w-2xl">
            Then something reads it properly.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="lead mt-6">
            Drag the lens. The same information, understood — then structured, then acted on.
          </p>
        </Reveal>
        <div className="mt-14">
          <LensDemo />
        </div>
      </Section>

      <Section index="03" eyebrow="The pattern">
        <Reveal>
          <h2 className="display-lg max-w-2xl">Built around understanding.</h2>
        </Reveal>
        <Reveal delay={90}>
          <p className="lead mt-6">
            One architecture, applied end to end. Nothing acts before it understands.
          </p>
        </Reveal>
        <div className="mt-14">
          <Pipeline
            stages={[
              { label: "Input", items: ["voice", "text", "documents", "events"] },
              { label: "Understanding", items: ["speech", "language", "intent", "context"] },
              { label: "Intelligence", items: ["LLMs", "memory", "reasoning", "retrieval"] },
              { label: "Structure", items: ["entities", "relationships", "knowledge graph"] },
              { label: "Action", items: ["agents", "tools", "workflows", "APIs"] },
            ]}
          />
        </div>
        <Reveal delay={120} className="mt-8">
          <Link to="/platform" className="btn-base btn-ghost">
            Inside the platform
          </Link>
        </Reveal>
      </Section>

      <Section index="04" eyebrow="First product">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Reveal>
              <p className="tech-label text-signal">Audaxity → Education → Minutes</p>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="display-lg mt-6">
                The first intelligence layer built for academia.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="lead mt-6">
                Minutes understands what happens in a course — lectures, discussions, materials,
                deadlines — and keeps it as structured, course-aware knowledge students and teachers
                can actually use.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <Link to="/minutes" className="btn-base btn-solid mt-8">
                Explore Minutes
              </Link>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <MinutesScene />
          </Reveal>
        </div>
      </Section>

      <Section index="05" eyebrow="Why Audaxity">
        <Reveal>
          <h2 className="display-lg max-w-2xl">
            AI is useful when it understands what happened before.
          </h2>
        </Reveal>
        <div className="mt-14">
          <StatementGrid
            items={[
              {
                title: "Understand first",
                body: "No automation before comprehension. The system establishes meaning, entities and intent before it does anything at all.",
              },
              {
                title: "Context is the product",
                body: "An answer without the last six weeks of a course, a project or a case is just fluent text.",
              },
              {
                title: "Structure compounds",
                body: "Each captured moment connects to earlier knowledge. Value accumulates instead of resetting every session.",
              },
              {
                title: "Outcomes, not paragraphs",
                body: "The goal is a task created, a question answered with evidence, a workflow moved forward.",
              },
              {
                title: "Augmentation by design",
                body: "People keep authorship and judgement. The system removes the transcription tax, not the thinker.",
              },
              {
                title: "Narrow, then wide",
                body: "Prove the pattern in academia with Minutes. Extend the same layer to other knowledge-heavy domains.",
              },
            ]}
          />
        </div>
      </Section>

      <CTABand
        title="See the pattern in a real product."
        body="Minutes is where Audaxity's intelligence layer meets the classroom."
        primary={{ to: "/minutes", label: "Explore Minutes" }}
        secondary={{ to: "/platform", label: "Read the architecture" }}
      />
    </>
  );
}
