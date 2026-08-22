import { useEffect, useState, useRef } from "react";

export function InformationDecay() {
  const [countdown, setCountdown] = useState(6);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const startDecay = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);

    setFading(false);
    let count = 6;
    setCountdown(count);

    countdownRef.current = setInterval(() => {
      count--;
      setCountdown(Math.max(count, 0));
      if (count <= 0 && countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    }, 1000);

    timerRef.current = setTimeout(() => {
      setFading(true);
    }, 6000);
  };

  useEffect(() => {
    startDecay();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  return (
    <div className="border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5 font-mono text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-ember" />
          <span className="font-semibold text-foreground">Untracked · Team standup, 9:14 AM</span>
        </span>
        <span>Live</span>
      </div>

      <div className="p-12 relative min-h-[280px]">
        <div className="max-w-[420px] mx-auto text-left">
          <div className={`mb-4 transition-all duration-[2400ms] ease-in-out ${fading ? 'opacity-[0.15] blur-[1.5px]' : 'opacity-100 blur-0'}`}>
            <p className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground mb-2">Priya</p>
            <p className="text-sm leading-relaxed text-foreground mb-4">We're blocked on the vendor API until Thursday — can we move the demo?</p>
          </div>
          <div className={`mb-4 transition-all duration-[2400ms] ease-in-out ${fading ? 'opacity-[0.15] blur-[1.5px]' : 'opacity-100 blur-0'}`}>
            <p className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground mb-2">Arjun</p>
            <p className="text-sm leading-relaxed text-foreground mb-4">Yeah, let's push to Friday. I'll also need the updated deck by Wednesday EOD.</p>
          </div>
          <div className={`transition-all duration-[2400ms] ease-in-out ${fading ? 'opacity-[0.15] blur-[1.5px]' : 'opacity-100 blur-0'}`}>
            <p className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground mb-2">Priya</p>
            <p className="text-sm leading-relaxed text-foreground">Sure. Also — reminder, budget sign-off has to happen before we touch the vendor contract.</p>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="font-mono text-[0.6875rem] uppercase tracking-widest text-violet">
            Fading in <span className="font-bold">{countdown}</span>s — nobody wrote this down.
          </p>
          <button
            onClick={startDecay}
            className="mt-4 mx-auto block font-mono text-[0.6875rem] text-muted-foreground bg-transparent border border-border px-3.5 py-1.5 rounded-full hover:border-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            ↻ Replay
          </button>
        </div>
      </div>

      <p className="border-t border-border py-3.5 text-center font-mono text-[0.625rem] text-muted-foreground tracking-wide uppercase opacity-70 italic">
        This is what Audaxity exists to stop.
      </p>
    </div>
  );
}
