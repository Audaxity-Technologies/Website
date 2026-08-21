import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { CTABand, PageHeader, Section, StatementGrid } from "@/components/site/blocks";

const title = "About — Why Audaxity exists";
const description =
  "Audaxity Technologies builds AI systems that understand human knowledge before acting on it. Our philosophy, principles and how we work.";

export const Route = createFileRoute("/about")({
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
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="An intelligence company, not an app company."
        intro="Audaxity Technologies exists because the hardest part of applied AI is not generation — it is understanding the messy record humans actually produce, and doing something useful with it."
      />

      <Section index="01" eyebrow="Why we exist">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="display-lg max-w-lg">
              Software still expects humans to do the structuring.
            </h2>
          </Reveal>
          <Reveal delay={100} className="space-y-5 self-end">
            <p className="lead">
              Every organisation has the same silent tax: turning what happened into something a
              system can use. Notes rewritten, decisions re-explained, context lost between the
              conversation and the tool.
            </p>
            <p className="lead">
              We think that translation layer should be machine work — and that it only becomes
              trustworthy when the machine understands the domain, not just the words.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section index="02" eyebrow="Principles">
        <StatementGrid
          items={[
            {
              title: "Understanding before automation",
              body: "Comprehension is a prerequisite, not a feature. Systems that act without context create work instead of removing it.",
            },
            {
              title: "Structure creates leverage",
              body: "Knowledge is valuable when it is connected. We optimise for relationships, not output volume.",
            },
            {
              title: "Augmentation, not replacement",
              body: "Teachers, students and professionals keep authorship. We remove the mechanical part of knowledge work.",
            },
            {
              title: "Intelligence compounds",
              body: "Every captured moment should make the next one more useful. Memory is the point.",
            },
            {
              title: "Claims we can defend",
              body: "We describe what we've built and what we intend to build, and we keep those two things clearly separated.",
            },
            {
              title: "Depth over surface",
              body: "One domain understood properly is worth more than ten integrations that understand nothing.",
            },
          ]}
        />
      </Section>

      <Section index="03" eyebrow="Where we are">
        <Reveal>
          <h2 className="display-lg max-w-3xl">Early, focused, and building in one domain.</h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="lead mt-6">
            Audaxity is an early-stage company. Minutes is in active development with higher
            education as the first environment. We're not publishing customer counts or metrics we
            haven't earned — if you want to see the work, ask us.
          </p>
        </Reveal>
      </Section>

      <CTABand
        title="Want to see what we're building?"
        body="We share progress directly with people working in higher education and knowledge-heavy teams."
        primary={{ to: "/contact", label: "Get in touch" }}
        secondary={{ to: "/minutes", label: "Explore Minutes" }}
      />
    </>
  );
}
