export function HODDashboard() {
  const departments = [
    { code: 'CS-201', percent: 81, color: '#B5501E', teacher: 'Prof. Iyer' },
    { code: 'CS-304', percent: 74, color: '#D97A3F', teacher: 'Prof. Menon' },
    { code: 'CS-402', percent: 68, color: '#E4A374', teacher: 'Prof. Rao' },
    { code: 'CS-410', percent: 52, color: '#6B2FA8', teacher: 'Prof. Nair' },
    { code: 'CS-115', percent: 45, color: '#8A4FC4', teacher: 'Prof. Das' },
  ];

  const rankings = [
    { rank: 1, name: 'Prof. Iyer — CS-201', percent: 81 },
    { rank: 2, name: 'Prof. Menon — CS-304', percent: 74 },
    { rank: 3, name: 'Prof. Das — CS-115', percent: 45 },
  ];

  return (
    <div className="border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5 font-mono text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-ember" />
          <span className="font-semibold text-foreground">MINUTES · Dept. of Computer Science</span>
        </span>
        <span>Semester progress heatmap</span>
      </div>

      <div className="grid grid-cols-5 gap-px bg-border">
        {departments.map((dept) => (
          <div key={dept.code} className="bg-background p-4 text-center">
            <p className="font-mono text-[0.6875rem] uppercase tracking-widest text-muted-foreground mb-2.5">
              {dept.code}
            </p>
            <div
              className="mx-auto h-11 rounded-sm flex items-center justify-center font-mono text-sm font-semibold text-white mb-2"
              style={{ backgroundColor: dept.color }}
            >
              {dept.percent}%
            </div>
            <p className="text-xs text-muted-foreground">{dept.teacher}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-border bg-background p-5.5">
        <p className="font-mono text-[0.6875rem] uppercase tracking-widest text-muted-foreground mb-4">
          Teacher-wise syllabus completion (this semester)
        </p>
        <ul className="space-y-0">
          {rankings.map((item) => (
            <li
              key={item.rank}
              className="grid grid-cols-[24px_1fr_auto] gap-3 items-center py-2.5 border-b border-border text-sm last:border-b-0"
            >
              <span className="font-mono text-muted-foreground text-xs">
                {String(item.rank).padStart(2, '0')}
              </span>
              <div>
                <span>{item.name}</span>
                <div className="relative h-1.5 bg-cream-2 rounded-full overflow-hidden mt-1">
                  <div
                    className="absolute inset-y-0 left-0 bg-violet rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
              <span>{item.percent}%</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="border-t border-border py-3.5 text-center font-mono text-[0.625rem] text-muted-foreground tracking-wide uppercase opacity-70">
        Interface shown is a product simulation · Minutes is currently in pilot development
      </p>
    </div>
  );
}
