export function TeacherDashboard() {
  return (
    <div className="border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5 font-mono text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-ember" />
          <span className="font-semibold text-foreground">MINUTES · CS-402 · Prof. Rao</span>
        </span>
        <span>Semester 6, Week 9</span>
      </div>

      <div className="grid gap-px bg-border md:grid-cols-[1.3fr_1fr]">
        {/* Left cell */}
        <div className="bg-background p-5.5">
          <p className="font-mono text-[0.6875rem] uppercase tracking-widest text-muted-foreground mb-4">
            Syllabus coverage
          </p>
          <div className="mb-4.5 flex flex-wrap gap-6">
            <div className="flex-1 min-w-[120px]">
              <div className="text-3xl font-bold tracking-tight text-ember">68%</div>
              <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-widest text-muted-foreground">
                Covered
              </p>
            </div>
            <div className="flex-1 min-w-[120px]">
              <div className="text-3xl font-bold tracking-tight text-violet">+4%</div>
              <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-widest text-muted-foreground">
                Ahead of expected pace
              </p>
            </div>
            <div className="flex-1 min-w-[120px]">
              <div className="text-3xl font-bold tracking-tight">3</div>
              <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-widest text-muted-foreground">
                Topics flagged
              </p>
            </div>
          </div>

          <p className="font-mono text-[0.6875rem] uppercase tracking-widest text-muted-foreground mb-2">
            Pace vs. expected
          </p>
          <div className="relative h-2 bg-cream-2 rounded-full overflow-hidden mb-2">
            <div className="absolute inset-y-0 left-0 bg-ember rounded-full" style={{ width: '68%' }} />
            <div className="absolute top-[-4px] left-[64%] w-[2px] h-4 bg-ink" />
          </div>
          <p className="font-mono text-[0.6875rem] text-muted-foreground">
            Marker = expected pace at Week 9 · Bar = actual coverage
          </p>

          <div className="mt-4 border border-violet bg-violet-soft p-3.5 text-sm leading-relaxed">
            <span className="font-semibold text-violet">Missed-topic alert.</span> "Backpropagation through time" was scheduled for Week 7 but hasn't appeared in any lecture transcript. Flagged for Module 4 review before Assignment 5.
          </div>
        </div>

        {/* Right cell */}
        <div className="bg-background p-5.5">
          <p className="font-mono text-[0.6875rem] uppercase tracking-widest text-muted-foreground mb-4">
            Lecture coverage timeline
          </p>
          <ul className="space-y-0">
            <li className="flex justify-between items-center py-2.5 border-b border-border text-sm">
              <span>Self-attention</span>
              <span className="font-mono text-[0.625rem] uppercase tracking-widest bg-ember-soft text-ember px-2 py-1 rounded-full">
                Covered
              </span>
            </li>
            <li className="flex justify-between items-center py-2.5 border-b border-border text-sm">
              <span>Positional encoding</span>
              <span className="font-mono text-[0.625rem] uppercase tracking-widest bg-ember-soft text-ember px-2 py-1 rounded-full">
                Covered
              </span>
            </li>
            <li className="flex justify-between items-center py-2.5 border-b border-border text-sm">
              <span>Backpropagation through time</span>
              <span className="font-mono text-[0.625rem] uppercase tracking-widest bg-violet-soft text-violet px-2 py-1 rounded-full">
                Gap
              </span>
            </li>
            <li className="flex justify-between items-center py-2.5 border-b border-border text-sm">
              <span>Encoder–decoder stack</span>
              <span className="font-mono text-[0.625rem] uppercase tracking-widest bg-ember-soft text-ember px-2 py-1 rounded-full">
                Covered
              </span>
            </li>
            <li className="flex justify-between items-center py-2.5 text-sm">
              <span>Beam search decoding</span>
              <span className="font-mono text-[0.625rem] uppercase tracking-widest bg-cream-2 text-muted-foreground px-2 py-1 rounded-full">
                Upcoming
              </span>
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
