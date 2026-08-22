import { useState } from "react";

export function WeeklyPlanner() {
  const [selectedWeek, setSelectedWeek] = useState(9);

  const weeks = [
    { num: 1, status: 'done' },
    { num: 2, status: 'done' },
    { num: 3, status: 'done' },
    { num: 4, status: 'done' },
    { num: 5, status: 'done' },
    { num: 6, status: 'done' },
    { num: 7, status: 'done' },
    { num: 8, status: 'done' },
    { num: 9, status: 'current' },
    { num: 10, status: 'upcoming' },
    { num: 11, status: 'upcoming' },
    { num: 12, status: 'upcoming' },
  ];

  const getWeekContent = (week: number) => {
    if (week === 9) {
      return (
        <>
          <span className="inline-block font-mono text-[0.625rem] uppercase tracking-widest bg-violet-soft text-violet px-2.5 py-1 rounded-full mb-3.5">
            In progress · Week 9
          </span>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="font-mono text-[0.6875rem] uppercase tracking-widest text-muted-foreground mb-2.5">
                Covered this week
              </p>
              <div className="flex items-center gap-2 py-1.5 text-sm">
                <span className="size-3.5 flex-shrink-0 rounded-sm bg-ember flex items-center justify-center text-[0.5625rem] text-white font-semibold">✓</span>
                <span>Self-attention</span>
              </div>
              <div className="flex items-center gap-2 py-1.5 text-sm">
                <span className="size-3.5 flex-shrink-0 rounded-sm bg-ember flex items-center justify-center text-[0.5625rem] text-white font-semibold">✓</span>
                <span>Positional encoding</span>
              </div>
            </div>
            <div>
              <p className="font-mono text-[0.6875rem] uppercase tracking-widest text-muted-foreground mb-2.5">
                Still to cover this week
              </p>
              <div className="flex items-center gap-2 py-1.5 text-sm">
                <span className="size-3.5 flex-shrink-0 rounded-sm border border-border" />
                <span>Encoder–decoder stack</span>
              </div>
              <div className="flex items-center gap-2 py-1.5 text-sm">
                <span className="size-3.5 flex-shrink-0 rounded-sm border border-border" />
                <span>Softmax scaling</span>
              </div>
            </div>
          </div>
          <div className="mt-4.5 pt-4.5 border-t border-border flex flex-wrap gap-7">
            <div>
              <div className="text-2xl font-bold tracking-tight text-ember">68%</div>
              <p className="mt-0.5 font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
                Syllabus covered
              </p>
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tight">31 / 42</div>
              <p className="mt-0.5 font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
                Students opened this week's notes
              </p>
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tight text-ember">4</div>
              <p className="mt-0.5 font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
                Doubts asked this week
              </p>
            </div>
          </div>
        </>
      );
    }
    if (week === 10) {
      return (
        <>
          <span className="inline-block font-mono text-[0.625rem] uppercase tracking-widest bg-cream-2 text-muted-foreground px-2.5 py-1 rounded-full mb-3.5">
            Upcoming · Week 10
          </span>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="font-mono text-[0.6875rem] uppercase tracking-widest text-muted-foreground mb-2.5">
                Planned for this week
              </p>
              <div className="flex items-center gap-2 py-1.5 text-sm">
                <span className="size-3.5 flex-shrink-0 rounded-sm border border-border" />
                <span>Beam search decoding</span>
              </div>
              <div className="flex items-center gap-2 py-1.5 text-sm">
                <span className="size-3.5 flex-shrink-0 rounded-sm border border-border" />
                <span>Attention masking</span>
              </div>
            </div>
            <div>
              <p className="font-mono text-[0.6875rem] uppercase tracking-widest text-muted-foreground mb-2.5">
                Prerequisite check
              </p>
              <div className="flex items-center gap-2 py-1.5 text-sm">
                <span className="size-3.5 flex-shrink-0 rounded-sm bg-ember flex items-center justify-center text-[0.5625rem] text-white font-semibold">✓</span>
                <span>Encoder–decoder stack (from Week 9)</span>
              </div>
              <div className="flex items-center gap-2 py-1.5 text-sm text-violet">
                <span>⚠</span>
                <span>Softmax scaling not yet covered — flagged as a gap before Week 10 begins</span>
              </div>
            </div>
          </div>
        </>
      );
    }
    if (week === 7) {
      return (
        <>
          <span className="inline-block font-mono text-[0.625rem] uppercase tracking-widest bg-ember-soft text-ember px-2.5 py-1 rounded-full mb-3.5">
            Completed · Week 7
          </span>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="font-mono text-[0.6875rem] uppercase tracking-widest text-muted-foreground mb-2.5">
                Covered
              </p>
              <div className="flex items-center gap-2 py-1.5 text-sm">
                <span className="size-3.5 flex-shrink-0 rounded-sm bg-ember flex items-center justify-center text-[0.5625rem] text-white font-semibold">✓</span>
                <span>Recurrent neural networks</span>
              </div>
              <div className="flex items-center gap-2 py-1.5 text-sm">
                <span className="size-3.5 flex-shrink-0 rounded-sm bg-ember flex items-center justify-center text-[0.5625rem] text-white font-semibold">✓</span>
                <span>Vanishing gradients</span>
              </div>
            </div>
            <div>
              <p className="font-mono text-[0.6875rem] uppercase tracking-widest text-muted-foreground mb-2.5">
                Notes usage since
              </p>
              <div className="py-1.5 text-sm">39 / 42 students opened notes</div>
              <div className="py-1.5 text-sm">Revision mode used by 27 students</div>
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <span className="inline-block font-mono text-[0.625rem] uppercase tracking-widest bg-cream-2 text-muted-foreground px-2.5 py-1 rounded-full mb-3.5">
          Week {week}
        </span>
        <p className="text-sm text-muted-foreground">
          Detailed content for Week {week} will be added as the semester progresses.
        </p>
      </>
    );
  };

  return (
    <div className="border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5 font-mono text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-ember" />
          <span className="font-semibold text-foreground">MINUTES · CS-402 · Semester plan</span>
        </span>
        <span>Prof. Rao</span>
      </div>

      <div className="flex overflow-x-auto border-b border-border scrollbar-hide">
        {weeks.map((week) => (
          <button
            key={week.num}
            onClick={() => setSelectedWeek(week.num)}
            className={`
              flex-shrink-0 px-4.5 py-3.5 text-center font-mono text-xs cursor-pointer border-r border-border border-b-2 transition-colors min-w-[4rem]
              ${selectedWeek === week.num
                ? 'bg-violet-soft border-b-violet text-foreground'
                : 'bg-white border-b-transparent text-muted-foreground hover:bg-cream-2'
              }
            `}
          >
            <span className="block text-sm font-semibold mb-1">W{week.num}</span>
            <span
              className={`
                block size-1.5 rounded-full mx-auto
                ${week.status === 'done' ? 'bg-ember' : week.status === 'current' ? 'bg-violet' : 'bg-border'}
              `}
            />
          </button>
        ))}
      </div>

      <div className="p-5.5">
        {getWeekContent(selectedWeek)}
      </div>

      <p className="border-t border-border py-3.5 text-center font-mono text-[0.625rem] text-muted-foreground tracking-wide uppercase opacity-70">
        Interface shown is a product simulation · Minutes is currently in pilot development
      </p>
    </div>
  );
}
