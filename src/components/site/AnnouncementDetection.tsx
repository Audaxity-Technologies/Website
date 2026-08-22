export function AnnouncementDetection() {
  return (
    <div className="border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5 font-mono text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-ember" />
          <span className="font-semibold text-foreground">MINUTES · Announcement detection</span>
        </span>
        <span>CS-402 · Lecture 12</span>
      </div>

      <div className="p-5.5 space-y-4">
        <div className="announce-card">
          <div className="head">Important announcement detected</div>
          <p className="announce-meta">Timestamp: 41:08 · Confidence: 94%</p>
          <p className="announce-body">
            Bring an exam pad and calculator for tomorrow's test. Class starts sharp at 9:00 AM — no late entries.
          </p>
          <div className="raw-quote">
            "Prof. Rao announced near the end of class: bring an exam pad and calculator for tomorrow's test, and the class starts sharp at 9:00 AM — no late entries mentioned, so don't cut it close."
          </div>
        </div>

        <div className="border border-border p-3.5">
          <p className="font-mono text-[0.625rem] uppercase tracking-widest text-violet mb-2">Extracted details</p>
          <ul className="space-y-1.5 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-ember mt-0.5">→</span>
              <span>Event: Test tomorrow</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-ember mt-0.5">→</span>
              <span>Requirements: Exam pad, calculator</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-ember mt-0.5">→</span>
              <span>Start time: 9:00 AM sharp</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-ember mt-0.5">→</span>
              <span>Constraint: No late entries</span>
            </li>
          </ul>
        </div>
      </div>

      <p className="border-t border-border py-3.5 text-center font-mono text-[0.625rem] text-muted-foreground tracking-wide uppercase opacity-70">
        Interface shown is a product simulation · Minutes is currently in pilot development
      </p>
    </div>
  );
}
