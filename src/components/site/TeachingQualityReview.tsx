export function TeachingQualityReview() {
  const metrics = [
    { label: 'Teaching pace', value: 8.4 },
    { label: 'Content depth', value: 8.9 },
    { label: 'Use of examples', value: 9.2 },
    { label: 'Student attention signal', value: 6.8 },
  ];

  return (
    <div className="border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5 font-mono text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-ember" />
          <span className="font-semibold text-foreground">MINUTES · Teaching quality</span>
        </span>
        <span>CS-402 · Prof. Rao · Week 9</span>
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-7 p-5.5 border-b border-border items-center">
        <div className="size-22 rounded-full border-[3px] border-violet flex flex-col items-center justify-center flex-shrink-0">
          <span className="text-2xl font-bold text-violet leading-none">8.1</span>
          <span className="font-mono text-[0.5625rem] text-muted-foreground">/ 10</span>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Strong on content depth and examples, slightly ahead of pace.</span> Student attention dipped briefly around the 30-minute mark — consistent with a longer unbroken explanation segment.
        </p>
      </div>

      <div className="p-5.5 space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="last:mb-0">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-foreground">{metric.label}</span>
              <span className="font-mono text-muted-foreground">{metric.value.toFixed(1)} / 10</span>
            </div>
            <div className="relative h-1.75 bg-cream-2 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-violet rounded-full"
                style={{ width: `${metric.value * 10}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mx-5.5 mb-5.5 p-3.5 border-l-2 border-border text-sm text-muted-foreground leading-relaxed italic">
        "Student attention signal" is inferred from note-taking activity, doubt frequency, and re-listen points — not classroom surveillance or personal ratings. Shared with the teacher first, before the HOD view, so it reads as coaching rather than scoring.
      </div>

      <p className="border-t border-border py-3.5 text-center font-mono text-[0.625rem] text-muted-foreground tracking-wide uppercase opacity-70">
        Interface shown is a product simulation · Minutes is currently in pilot development
      </p>
    </div>
  );
}
