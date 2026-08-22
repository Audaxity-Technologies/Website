import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { CTABand, PageHeader, Pipeline, Section, StatementGrid } from "@/components/site/blocks";
import { MinutesScene } from "@/components/site/MinutesScene";
import { WaitlistForm } from "@/components/site/WaitlistForm";
import { RAGChatbot } from "@/components/site/RAGChatbot";
import { TeacherDashboard } from "@/components/site/TeacherDashboard";
import { WeeklyPlanner } from "@/components/site/WeeklyPlanner";
import { HODDashboard } from "@/components/site/HODDashboard";
import { TeachingQualityReview } from "@/components/site/TeachingQualityReview";
import { WaveformTranscriptNotes } from "@/components/site/WaveformTranscriptNotes";
import { AnnouncementDetection } from "@/components/site/AnnouncementDetection";

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

      <Section index="01" eyebrow="How it works">
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
        <Reveal delay={150} className="mt-14">
          <WaveformTranscriptNotes />
        </Reveal>
      </Section>

      <Section index="02" eyebrow="Surfaces">
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

      <Section index="03" eyebrow="What students get">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <Reveal>
              <h2 className="display-lg max-w-xl mb-6">
                Structured knowledge that actually helps them study.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="lead mb-8">
                Not more recordings to watch. Minutes turns lectures into searchable, connected
                knowledge students can question and revise from.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-ember mt-0.5 flex-shrink-0">→</span>
                  <span>AI-generated structured lecture notes</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-ember mt-0.5 flex-shrink-0">→</span>
                  <span>Exam-ready summaries and revision material</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-violet mt-0.5 flex-shrink-0">→</span>
                  <span>AI doubt-solving assistant grounded in their own lectures (RAG-based)</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-ember mt-0.5 flex-shrink-0">→</span>
                  <span>Searchable lecture history across the whole course</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-ember mt-0.5 flex-shrink-0">→</span>
                  <span>Personalized learning support</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-ember mt-0.5 flex-shrink-0">→</span>
                  <span>Important announcements auto-detected (deadlines, materials, exam info)</span>
                </li>
              </ul>
            </Reveal>
          </div>
          <Reveal delay={150} className="space-y-6">
            <RAGChatbot />
            <AnnouncementDetection />
          </Reveal>
        </div>
      </Section>

      <Section index="04" eyebrow="What teachers get">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <Reveal>
              <h2 className="display-lg max-w-xl mb-6">
                Visibility into their own teaching without manual tracking.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="lead mb-8">
                No more guesswork about pace, coverage, or what students are actually asking. Minutes
                surfaces what matters from the lectures you're already giving.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-ember mt-0.5 flex-shrink-0">→</span>
                  <span>Automatic transcription and note generation</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-ember mt-0.5 flex-shrink-0">→</span>
                  <span>Syllabus tracking with live coverage percentage</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-ember mt-0.5 flex-shrink-0">→</span>
                  <span>Teaching-progress visibility (pace vs. expected)</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-ember mt-0.5 flex-shrink-0">→</span>
                  <span>Missed-topic alerts before they become a gap</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-ember mt-0.5 flex-shrink-0">→</span>
                  <span>Reduced repetitive workload (fewer repeat doubts, less manual note-writing)</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-ember mt-0.5 flex-shrink-0">→</span>
                  <span>Analytics on their own teaching pace, content depth, and student engagement</span>
                </li>
              </ul>
            </Reveal>
          </div>
          <Reveal delay={150} className="space-y-6">
            <TeacherDashboard />
            <WeeklyPlanner />
          </Reveal>
        </div>
      </Section>

      <Section index="05" eyebrow="What institutions get">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <Reveal>
              <h2 className="display-lg max-w-xl mb-6">
                Department-wide academic intelligence they currently have no way to access.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="lead mb-8">
                From individual classrooms to department-level insights. Minutes gives administrators
                the visibility they need without invasive surveillance.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-ember mt-0.5 flex-shrink-0">→</span>
                  <span>Institution-wide academic intelligence</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-ember mt-0.5 flex-shrink-0">→</span>
                  <span>Department- and teacher-wise syllabus tracking</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-ember mt-0.5 flex-shrink-0">→</span>
                  <span>Teaching-progress monitoring across the department</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-ember mt-0.5 flex-shrink-0">→</span>
                  <span>Centralized, searchable institutional knowledge repository</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-ember mt-0.5 flex-shrink-0">→</span>
                  <span>Academic transparency and data-driven decision support</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-ember mt-0.5 flex-shrink-0">→</span>
                  <span>Support for accreditation/compliance documentation</span>
                </li>
              </ul>
            </Reveal>
          </div>
          <Reveal delay={150} className="space-y-6">
            <HODDashboard />
            <TeachingQualityReview />
          </Reveal>
        </div>
      </Section>

      <Section id="waitlist" index="06" eyebrow="Get early access">
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
