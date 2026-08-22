import { useState } from "react";

type ResponseData = {
  q: string;
  a: string | null;
  custom?: string;
 _src: string;
};

const RESPONSES: Record<string, ResponseData> = {
  absent: {
    q: "I was absent — what did I miss?",
    a: "You missed Lecture 12 (42 min). The class covered self-attention and positional encoding, building on last week's attention mechanisms. Two things to prioritize before the next class: it's the foundation for Assignment 4, and Prof. Rao asked everyone to read Chapter 4 of the reference text first, since the next lecture builds directly on it.",
    _src: "Source: Lecture 12 transcript, 00:00–42:10 · Syllabus §3.2"
  },
  tomorrow: {
    q: "What should I bring tomorrow?",
    a: "Prof. Rao announced near the end of class: bring an exam pad and calculator for tomorrow's test, and the class starts sharp at 9:00 AM — no late entries mentioned, so don't cut it close.",
    _src: "Source: Lecture 12 transcript, 41:08 · Flagged as Important Announcement"
  },
  example: {
    q: "What example did she give about self-attention?",
    a: "She used the sentence \"The animal didn't cross the street because it was too tired\" to explain how self-attention resolves what \"it\" refers to — showing how the model learns to attend more strongly to \"animal\" than \"street\" when processing that pronoun.",
    _src: "Source: Lecture 12 transcript, 18:32–19:47"
  },
  quicksort: {
    a: null,
    q: "Explain quicksort from today's lecture",
    custom: "Today's lecture didn't cover quicksort — that was Lecture 8 in CS-201 (Data Structures), not this course. Want me to pull the explanation from that lecture instead?",
    _src: "No match in CS-402 · Lecture 12 — nearest match found in a different course"
  },
  assignment: {
    q: "When is Assignment 4 due?",
    a: "Assignment 4 is due before the review class, which is scheduled right after Lecture 13. It depends directly on today's self-attention material, so it's worth starting once you've gone through Chapter 4.",
    _src: "Source: Lecture 12 transcript, 40:20 · Linked to Assignment 4"
  }
};

export function RAGChatbot() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; content: string; source?: string }>>([
    { role: 'ai', content: 'Ask me anything about today\'s lecture — or tap a suggestion below to see how it works.' }
  ]);
  const [loading, setLoading] = useState(false);
  const [disabledChips, setDisabledChips] = useState<Set<string>>(new Set());

  const sendPreset = (key: string) => {
    if (disabledChips.has(key)) return;

    const data = RESPONSES[key as keyof typeof RESPONSES];
    if (!data) return;

    setMessages(prev => [...prev, { role: 'user', content: data.q }]);
    setLoading(true);
    setDisabledChips(prev => new Set(prev).add(key));

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: 'ai',
          content: data.a || data.custom || '',
          source: data._src
        }
      ]);
      setLoading(false);
    }, 900);
  };

  return (
    <div className="border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5 font-mono text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-ember" />
          <span className="font-semibold text-foreground">MINUTES · Ask CS-402 · Lecture 12</span>
        </span>
        <span>Self-attention &amp; positional encoding</span>
      </div>

      <div className="flex flex-col" style={{ height: '520px' }}>
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[78%] text-sm leading-relaxed p-3 rounded-lg ${
                msg.role === 'user'
                  ? 'ml-auto bg-ink text-cream rounded-tr-none'
                  : 'mr-auto bg-violet-soft text-foreground border border-violet/25 rounded-tl-none'
              }`}
            >
              {msg.role === 'ai' && (
                <span className="mb-1.5 block font-mono text-[0.625rem] uppercase tracking-widest text-violet">
                  Minutes AI
                </span>
              )}
              {msg.content}
              {msg.source && (
                <span className="mt-2 block border-t border-dashed border-border pt-1.5 font-mono text-[0.625rem] text-muted-foreground">
                  {msg.source}
                </span>
              )}
            </div>
          ))}
          {loading && (
            <div className="mr-auto max-w-[78%] rounded-tl-none rounded-lg bg-violet-soft border border-violet/25 p-3">
              <span className="mb-1.5 block font-mono text-[0.625rem] uppercase tracking-widest text-violet">
                Minutes AI
              </span>
              <span className="inline-flex items-center gap-0.5">
                <span className="size-1.25 rounded-full bg-violet animate-[pulse_1.2s_ease-in-out_infinite]" />
                <span className="size-1.25 rounded-full bg-violet animate-[pulse_1.2s_ease-in-out_0.2s_infinite]" />
                <span className="size-1.25 rounded-full bg-violet animate-[pulse_1.2s_ease-in-out_0.4s_infinite]" />
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-border bg-cream p-3.5">
          <button
            onClick={() => sendPreset('absent')}
            disabled={disabledChips.has('absent')}
            className="bg-white border border-border px-3.5 py-2 rounded-full text-sm text-foreground hover:border-ember hover:text-ember disabled:opacity-35 disabled:cursor-default disabled:hover:border-border disabled:hover:text-foreground transition-colors"
          >
            I was absent — what did I miss?
          </button>
          <button
            onClick={() => sendPreset('tomorrow')}
            disabled={disabledChips.has('tomorrow')}
            className="bg-white border border-border px-3.5 py-2 rounded-full text-sm text-foreground hover:border-ember hover:text-ember disabled:opacity-35 disabled:cursor-default disabled:hover:border-border disabled:hover:text-foreground transition-colors"
          >
            What should I bring tomorrow?
          </button>
          <button
            onClick={() => sendPreset('example')}
            disabled={disabledChips.has('example')}
            className="bg-white border border-border px-3.5 py-2 rounded-full text-sm text-foreground hover:border-ember hover:text-ember disabled:opacity-35 disabled:cursor-default disabled:hover:border-border disabled:hover:text-foreground transition-colors"
          >
            What example did she give about self-attention?
          </button>
          <button
            onClick={() => sendPreset('quicksort')}
            disabled={disabledChips.has('quicksort')}
            className="bg-white border border-border px-3.5 py-2 rounded-full text-sm text-foreground hover:border-ember hover:text-ember disabled:opacity-35 disabled:cursor-default disabled:hover:border-border disabled:hover:text-foreground transition-colors"
          >
            Explain quicksort from today's lecture
          </button>
          <button
            onClick={() => sendPreset('assignment')}
            disabled={disabledChips.has('assignment')}
            className="bg-white border border-border px-3.5 py-2 rounded-full text-sm text-foreground hover:border-ember hover:text-ember disabled:opacity-35 disabled:cursor-default disabled:hover:border-border disabled:hover:text-foreground transition-colors"
          >
            When is Assignment 4 due?
          </button>
        </div>

        <div className="flex items-center gap-2.5 border-t border-border px-5 py-3.5">
          <div className="flex-1 rounded-full border border-border bg-cream-2 px-4 py-2.5 text-sm text-muted-foreground cursor-not-allowed">
            Type your own question…
          </div>
          <div className="size-9 flex-shrink-0 rounded-full border border-border bg-cream-2 text-muted-foreground flex items-center justify-center cursor-not-allowed">
            →
          </div>
        </div>
        <p className="px-5 pb-3.5 font-mono text-[0.625rem] text-muted-foreground tracking-wide">
          Typing disabled in this preview · tap a suggestion above to see a real response
        </p>
      </div>

      <p className="border-t border-border py-3.5 text-center font-mono text-[0.625rem] text-muted-foreground tracking-wide uppercase opacity-70">
        Responses shown are pre-written examples of real RAG output · Minutes is currently in pilot development
      </p>
    </div>
  );
}
