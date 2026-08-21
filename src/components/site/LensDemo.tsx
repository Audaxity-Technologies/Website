import { useState } from "react";
import { cn } from "@/lib/utils";

const TRANSCRIPT: { text: string; kind?: "concept" | "context" | "action" }[] = [
  { text: "so before we wrap up — " },
  { text: "the transformer architecture", kind: "concept" },
  { text: " we started " },
  { text: "last Thursday", kind: "context" },
  { text: " continues into attention, uh, " },
  { text: "self-attention specifically", kind: "concept" },
  { text: ", and that's really the part " },
  { text: "the assignment", kind: "action" },
  { text: " depends on. It's " },
  { text: "due before the review class", kind: "action" },
  { text: ", and please read " },
  { text: "chapter 4 of the reference text", kind: "context" },
  { text: " first, otherwise none of this will make sense." },
];

const STAGES = [
  { key: "messy", label: "Messy", note: "Raw speech. Nothing is retrievable." },
  { key: "understood", label: "Understood", note: "Meaning, entities and intent identified." },
  { key: "structured", label: "Structured", note: "Connected to the course knowledge graph." },
  { key: "actionable", label: "Actionable", note: "Outcomes created with full context." },
] as const;

const OUTPUT = {
  understood: [
    { label: "Topic", value: "Transformer architecture · self-attention" },
    { label: "Reference", value: "Lecture 12, last Thursday" },
    { label: "Intent", value: "Assignment obligation + prerequisite reading" },
  ],
  structured: [
    { label: "Concept node", value: "Self-attention → Attention → Transformers" },
    { label: "Course link", value: "CS-402 · Module 3 · Syllabus §3.2" },
    { label: "Prerequisite", value: "Reference text, chapter 4" },
  ],
  actionable: [
    { label: "Task", value: "Assignment: due before review class" },
    { label: "Revision", value: "Concept sheet + 6 checks generated" },
    { label: "Answerable", value: '"Explain what we discussed last Thursday"' },
  ],
};

export function LensDemo() {
  const [v, setV] = useState(40);
  const stage = v < 25 ? 0 : v < 55 ? 1 : v < 82 ? 2 : 3;

  const show = (kind?: "concept" | "context" | "action") => {
    if (!kind) return false;
    if (kind === "concept") return stage >= 1;
    if (kind === "context") return stage >= 2;
    return stage >= 3;
  };

  return (
    <div className="border border-border bg-paper">
      <div className="flex flex-col gap-4 border-b border-border p-5 md:flex-row md:items-center md:justify-between md:p-6">
        <div className="flex items-center gap-3">
          <span className="tech-label">Audaxity lens</span>
          <span className="font-mono text-[0.7rem] text-signal">{STAGES[stage]?.label}</span>
        </div>
        <label className="flex flex-1 items-center gap-4 md:max-w-md">
          <span className="sr-only">Drag from messy to actionable</span>
          <input
            type="range"
            min={0}
            max={100}
            value={v}
            onChange={(e) => setV(Number(e.target.value))}
            className="h-1 w-full cursor-ew-resize appearance-none rounded-full bg-border accent-signal"
          />
        </label>
      </div>

      <div className="grid gap-px bg-border md:grid-cols-2">
        <div className="bg-paper p-6 md:p-8">
          <p className="tech-label">Lecture capture — CS-402</p>
          <p
            className={cn(
              "mt-5 text-[0.95rem] leading-[1.85] transition-colors duration-500",
              stage === 0 ? "text-muted-foreground" : "text-foreground",
            )}
          >
            {TRANSCRIPT.map((t, i) => (
              <span
                key={i}
                className={cn(
                  "transition-all duration-500",
                  show(t.kind) &&
                    (t.kind === "action"
                      ? "bg-signal/12 text-signal decoration-signal underline decoration-dotted underline-offset-4"
                      : t.kind === "concept"
                        ? "border-b border-signal text-foreground"
                        : "bg-accent/50"),
                )}
              >
                {t.text}
              </span>
            ))}
          </p>
        </div>

        <div className="bg-cream p-6 md:p-8">
          <p className="tech-label">Structured output</p>
          <div className="mt-5 space-y-6">
            {(["understood", "structured", "actionable"] as const).map((k, idx) => (
              <div
                key={k}
                className={cn(
                  "transition-all duration-500",
                  stage >= idx + 1
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-2 opacity-0",
                )}
              >
                <p className="tech-label text-signal">{STAGES[idx + 1]?.label}</p>
                <ul className="mt-3 space-y-2 border-l border-border pl-4">
                  {OUTPUT[k].map((row) => (
                    <li key={row.label} className="text-sm">
                      <span className="font-mono text-[0.68rem] tracking-wide text-muted-foreground uppercase">
                        {row.label}
                      </span>
                      <span className="mt-0.5 block">{row.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {stage === 0 && (
              <p className="text-sm text-muted-foreground">
                Nothing yet. This is what most software does with a lecture.
              </p>
            )}
          </div>
        </div>
      </div>

      <p className="border-t border-border px-6 py-4 text-xs text-muted-foreground">
        {STAGES[stage]?.note}
      </p>
    </div>
  );
}
