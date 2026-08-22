export function SixPhaseRoadmap() {
  const steps = [
    { week: 'Weeks 1–2', name: 'Validation', desc: 'Interviews, ASR benchmarking', status: 'done' },
    { week: 'Weeks 3–4', name: 'Core pipeline', desc: 'Audio → transcript → notes', status: 'done' },
    { week: 'Weeks 5–6', name: 'Vertical slice', desc: 'Syllabus mapping + review', status: 'current' },
    { week: 'Weeks 7–8', name: 'Dashboards', desc: 'Teacher + HOD views', status: 'pending' },
    { week: 'Weeks 9–10', name: 'Closed pilot', desc: 'One institution, real classes', status: 'pending' },
    { week: 'Weeks 11–12', name: 'Live pilot', desc: 'Measure outcomes, iterate', status: 'pending' },
  ];

  return (
    <div className="border border-border bg-background p-2">
      <div className="relative pt-10 pb-2.5 px-2.5">
        <div className="absolute top-[52px] left-[5%] right-[5%] h-px bg-border" />
        <div className="absolute top-[52px] left-[5%] h-px bg-ember" style={{ width: '33%' }} />
        
        <div className="grid grid-cols-6 relative">
          {steps.map((step, i) => (
            <div key={i} className="text-center px-1.5">
              <div
                className={`
                  size-3.5 rounded-full border-2 mx-auto mb-3.5 relative z-10
                  ${step.status === 'done'
                    ? 'bg-ember border-ember'
                    : step.status === 'current'
                    ? 'bg-white border-violet shadow-[0_0_0_4px_rgba(107,47,168,0.1)]'
                    : 'bg-white border-border'
                  }
                `}
              />
              <p className="font-mono text-[0.625rem] text-muted-foreground uppercase tracking-widest mb-1.5">
                {step.week}
              </p>
              <p className="text-xs font-semibold leading-tight">{step.name}</p>
              <p className="text-xs text-muted-foreground mt-1.5 leading-tight">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
