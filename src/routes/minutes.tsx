import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { CTABand, PageHeader, Pipeline, Section, StatementGrid } from "@/components/site/blocks";
import { MinutesScene } from "@/components/site/MinutesScene";
import { WaitlistForm } from "@/components/site/WaitlistForm";

const title = "Minutes — AI Academic Intelligence Platform | Audaxity";
const description =
  "Minutes turns lectures, discussions and course material into structured, course-aware academic knowledge students and teachers can question, revise and act on.";

export const Route = createFileRoute("/minutes")({
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
  component: MinutesPage,
});

function MinutesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Product 01 — Higher education"
        title={
          <>
            Minutes understands
            <br />
            academic knowledge.
          </>
        }
        intro="An AI academic intelligence platform. Minutes captures what happens in a course and keeps it as structured, connected knowledge — not a pile of transcripts."
      />

      <div className="shell pb-8">
        <Reveal>
          <MinutesScene />
        </Reveal>
      </div>

      <Section index="01" eyebrow="The problem">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="display-lg max-w-lg">
              A course is knowledge, scattered across a semester.
            </h2>
          </Reveal>
          <Reveal delay={100} className="self-end">
            <p className="lead">
              Lectures, explanations, discussions, notes, PDFs, assignments, announcements,
              deadlines and syllabus requirements all describe the same course — but nothing holds
              them together. Students and teachers do that work by hand, every week.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section index="02" eyebrow="How it works">
        <Reveal>
          <h2 className="display-lg max-w-2xl">From the room to the knowledge graph.</h2>
        </Reveal>
        <div className="mt-14">
          <Pipeline
            stages={[
              { label: "Capture", items: ["lecture", "discussion", "material"] },
              { label: "Understand", items: ["speech", "terminology", "intent"] },
              { label: "Extract", items: ["concepts", "explanations", "obligations"] },
              { label: "Connect", items: ["course", "syllabus", "prior lectures"] },
              { label: "Use", items: ["ask", "revise", "act"] },
            ]}
          />
        </div>
      </Section>

      <Section index="03" eyebrow="Surfaces">
        <Reveal>
          <h2 className="display-lg max-w-2xl">Five ways the course becomes usable.</h2>
        </Reveal>
        <div className="mt-14">
          <StatementGrid
            items={[
              {
                title: "Lecture intelligence",
                body: "A recorded session becomes structured concepts, explanations and obligations — with the wording of the professor preserved where it matters.",
              },
              {
                title: "Knowledge map",
                body: "Concepts link across lectures, subjects, syllabus sections and references, so a topic can be traced through the whole semester.",
              },
              {
                title: "Ask your course",
                body: "Questions are answered from the actual course record, with the lecture and section the answer came from.",
              },
              {
                title: "Revision intelligence",
                body: "Concept sheets and checks generated from what was really taught, weighted by syllabus and assessment relevance.",
              },
              {
                title: "Teacher intelligence",
                body: "Coverage against the syllabus, concepts introduced versus revisited, and what students repeatedly ask about.",
              },
              {
                title: "Academic memory",
                body: "Every week compounds. Later lectures inherit the context of earlier ones instead of starting from zero.",
              },
            ]}
          />
        </div>
      </Section>

      <Section index="04" eyebrow="Positioning">
        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
          <Reveal className="bg-background p-8 md:p-12">
            <p className="tech-label">What Minutes is not</p>
            <p className="mt-5 font-display text-2xl leading-tight text-muted-foreground line-through decoration-signal/60">
              An AI note-taking app that summarises a recording.
            </p>
          </Reveal>
          <Reveal delay={100} className="bg-background p-8 md:p-12">
            <p className="tech-label text-signal">What Minutes is</p>
            <p className="mt-5 font-display text-2xl leading-tight">
              Academic intelligence infrastructure — a course that can be questioned, connected and
              acted on.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section id="waitlist" index="05" eyebrow="Get early access">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <Reveal>
              <h2 className="display-lg max-w-xl mb-6">
                Bring Minutes to your institution.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="lead mb-8">
                We're working with early higher-education partners as Minutes develops. Join the
                waitlist to get early access when we launch.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <WaitlistForm />
            </Reveal>
          </div>
          <Reveal delay={150} className="flex items-center">
            <div className="w-full">
              <div className="border border-border bg-background p-8">
                <h4 className="text-lg font-medium mb-4">What you'll get:</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-signal mt-1">→</span>
                    <span>Early access to Minutes for your department</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-signal mt-1">→</span>
                    <span>Direct input on product development</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-signal mt-1">→</span>
                    <span>Priority support during onboarding</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-signal mt-1">→</span>
                    <span>Exclusive updates on our progress</span>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTABand
        title="Bring Minutes to your department."
        body="We're working with early higher-education partners as Minutes develops."
        primary={{ to: "/contact", label: "Talk to us" }}
        secondary={{ to: "/platform", label: "See the architecture" }}
      />
    </>
  );
}
