import { cn } from "@/lib/utils";

/** Product mockup: course-aware academic intelligence surface. */
export function MinutesScene({ className }: { className?: string }) {
  return (
    <div className={cn("border border-border bg-paper shadow-[0_24px_60px_-40px_rgba(43,38,32,0.5)]", className)}>
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="signal-dot inline-block size-1.5 rounded-full bg-signal" />
          <span className="font-mono text-[0.68rem] tracking-[0.16em] uppercase">
            Minutes · CS-402
          </span>
        </div>
        <span className="font-mono text-[0.65rem] text-muted-foreground">Lecture 12</span>
      </div>

      <div className="grid gap-px bg-border sm:grid-cols-[1.15fr_1fr]">
        <div className="bg-paper p-5">
          <p className="tech-label">Extracted concepts</p>
          <ul className="mt-4 space-y-2.5">
            {[
              ["Self-attention", "new"],
              ["Positional encoding", "linked"],
              ["Encoder–decoder stack", "revisited"],
              ["Softmax scaling", "prerequisite"],
            ].map(([c, tag]) => (
              <li key={c} className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-sm">{c}</span>
                <span className="font-mono text-[0.62rem] tracking-wide text-signal uppercase">
                  {tag}
                </span>
              </li>
            ))}
          </ul>

          <p className="tech-label mt-7">Course connections</p>
          <div className="mt-3 space-y-2 font-mono text-[0.68rem] text-muted-foreground">
            <p>Lecture 12 → Module 3 → Syllabus §3.2</p>
            <p>Self-attention → Attention (Lecture 10)</p>
            <p>Assignment 4 → due before review class</p>
          </div>
        </div>

        <div className="bg-cream p-5">
          <p className="tech-label">Ask your course</p>
          <div className="mt-4 border border-border bg-paper p-3 text-sm">
            “Explain the concept we discussed last Thursday.”
          </div>
          <div className="mt-3 border-l-2 border-signal bg-paper/60 p-3 text-sm leading-relaxed">
            Lecture 12 covered <span className="text-signal">self-attention</span>, extending the
            attention mechanism from Lecture 10. It underpins Assignment 4 and Section 3.2 of the
            syllabus.
          </div>
          <p className="tech-label mt-7">Generated</p>
          <ul className="mt-3 space-y-2">
            {["Revision sheet · 6 concept checks", "Task · Assignment 4", "Reading · Chapter 4"].map(
              (o) => (
                <li key={o} className="flex items-center gap-2 text-sm">
                  <span className="size-1 rounded-full bg-signal" />
                  {o}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
