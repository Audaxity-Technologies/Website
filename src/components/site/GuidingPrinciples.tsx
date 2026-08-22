export function GuidingPrinciples() {
  const principles = [
    {
      num: '01',
      title: 'Understanding before automation',
      description: 'We don\'t automate blindly. Every workflow starts by genuinely understanding the input — its structure, context, and intent — before deciding what action follows.'
    },
    {
      num: '02',
      title: 'Structure creates leverage',
      description: 'Unstructured information is hard to search, measure, and act on. Structuring it isn\'t cosmetic — it\'s what makes information usable at all.'
    },
    {
      num: '03',
      title: 'Domains differ, the pattern doesn\'t',
      description: 'A lecture, a sales call, and a legal interview look nothing alike. The underlying need — turn conversation into structured, actionable knowledge — is the same.'
    },
    {
      num: '04',
      title: 'Augmentation, not replacement',
      description: 'Our tools support the people already doing the work. We remove repetitive overhead and surface what matters — we don\'t replace judgment.'
    },
    {
      num: '05',
      title: 'Start narrow, prove the pattern',
      description: 'We validate our core thesis deeply in one domain before expanding. One strong proof point beats shallow presence across many.'
    },
    {
      num: '06',
      title: 'Correctness and trust come first',
      description: 'Structured knowledge is only useful if people trust it. Accuracy and easy human review come before feature breadth.'
    },
  ];

  return (
    <div className="grid gap-px border border-border bg-background sm:grid-cols-2 lg:grid-cols-3">
      {principles.map((principle) => (
        <div
          key={principle.num}
          className="group relative bg-background p-6 md:p-7 min-h-[180px] overflow-hidden cursor-default transition-all"
        >
          <p className="font-mono text-[0.6875rem] text-ember mb-3.5">{principle.num}</p>
          <h3 className="font-display text-lg font-medium mb-2.5 leading-tight group-hover:text-violet transition-colors">
            {principle.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed max-h-0 opacity-0 overflow-hidden transition-all duration-350 group-hover:max-h-[140px] group-hover:opacity-100">
            {principle.description}
          </p>
        </div>
      ))}
    </div>
  );
}
