import { useState } from "react";

export function CaptureActDemo() {
  const [activeTab, setActiveTab] = useState<'capture' | 'understand' | 'structure' | 'act'>('capture');

  return (
    <div className="border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5 font-mono text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-ember" />
          <span className="font-semibold text-foreground">Audaxity · Same conversation, structured</span>
        </span>
        <span>Team standup, 9:14 AM</span>
      </div>

      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab('capture')}
          className={`flex-1 py-3.5 text-center font-mono text-xs cursor-pointer border-r border-border transition-colors ${
            activeTab === 'capture'
              ? 'bg-ember-soft text-foreground border-b-2 border-b-ember'
              : 'text-muted-foreground hover:bg-cream-2'
          }`}
        >
          Capture
        </button>
        <button
          onClick={() => setActiveTab('understand')}
          className={`flex-1 py-3.5 text-center font-mono text-xs cursor-pointer border-r border-border transition-colors ${
            activeTab === 'understand'
              ? 'bg-ember-soft text-foreground border-b-2 border-b-ember'
              : 'text-muted-foreground hover:bg-cream-2'
          }`}
        >
          Understand
        </button>
        <button
          onClick={() => setActiveTab('structure')}
          className={`flex-1 py-3.5 text-center font-mono text-xs cursor-pointer border-r border-border transition-colors ${
            activeTab === 'structure'
              ? 'bg-ember-soft text-foreground border-b-2 border-b-ember'
              : 'text-muted-foreground hover:bg-cream-2'
          }`}
        >
          Structure
        </button>
        <button
          onClick={() => setActiveTab('act')}
          className={`flex-1 py-3.5 text-center font-mono text-xs cursor-pointer transition-colors ${
            activeTab === 'act'
              ? 'bg-ember-soft text-foreground border-b-2 border-b-ember'
              : 'text-muted-foreground hover:bg-cream-2'
          }`}
        >
          Act
        </button>
      </div>

      <div className="p-6.5">
        {activeTab === 'capture' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-sm leading-relaxed text-muted-foreground border-l-2 border-border pl-4 mb-4.5">
              "We're blocked on the vendor API until Thursday — can we move the demo? Yeah, let's push to Friday. I'll also need the updated deck by Wednesday EOD. Also — reminder, budget sign-off has to happen before we touch the vendor contract."
            </p>
            <div className="border border-border p-3.5 max-w-[320px]">
              <p className="font-mono text-[0.625rem] uppercase tracking-widest text-violet mb-2">Raw input</p>
              <p className="text-sm text-muted-foreground">Unstructured audio from a 90-second standup — no one is taking notes.</p>
            </div>
          </div>
        )}

        {activeTab === 'understand' && (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="border border-border p-3.5">
              <p className="font-mono text-[0.625rem] uppercase tracking-widest text-violet mb-2">Entities</p>
              <p className="text-sm text-muted-foreground">Vendor API, demo date, deck, budget sign-off</p>
            </div>
            <div className="border border-border p-3.5">
              <p className="font-mono text-[0.625rem] uppercase tracking-widest text-violet mb-2">Intent</p>
              <p className="text-sm text-muted-foreground">Reschedule request + two dependent deadlines</p>
            </div>
            <div className="border border-border p-3.5">
              <p className="font-mono text-[0.625rem] uppercase tracking-widest text-violet mb-2">Speakers</p>
              <p className="text-sm text-muted-foreground">Priya (blocker owner), Arjun (deck owner)</p>
            </div>
            <div className="border border-border p-3.5">
              <p className="font-mono text-[0.625rem] uppercase tracking-widest text-violet mb-2">Context</p>
              <p className="text-sm text-muted-foreground">Demo was previously set for Thursday</p>
            </div>
          </div>
        )}

        {activeTab === 'structure' && (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="border border-border p-3.5">
              <p className="font-mono text-[0.625rem] uppercase tracking-widest text-violet mb-2">Decision</p>
              <p className="text-sm text-muted-foreground">Demo moved: Thursday → Friday</p>
            </div>
            <div className="border border-border p-3.5">
              <p className="font-mono text-[0.625rem] uppercase tracking-widest text-violet mb-2">Task · Arjun</p>
              <p className="text-sm text-muted-foreground">Updated deck, due Wednesday EOD</p>
            </div>
            <div className="border border-border p-3.5">
              <p className="font-mono text-[0.625rem] uppercase tracking-widest text-violet mb-2">Dependency</p>
              <p className="text-sm text-muted-foreground">Budget sign-off blocks vendor contract</p>
            </div>
            <div className="border border-border p-3.5">
              <p className="font-mono text-[0.625rem] uppercase tracking-widest text-violet mb-2">Blocker · Priya</p>
              <p className="text-sm text-muted-foreground">Vendor API, resolves Thursday</p>
            </div>
          </div>
        )}

        {activeTab === 'act' && (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="border border-border p-3.5">
              <p className="font-mono text-[0.625rem] uppercase tracking-widest text-violet mb-2">Triggered</p>
              <p className="text-sm text-muted-foreground">Calendar invite moved to Friday, both attendees notified</p>
            </div>
            <div className="border border-border p-3.5">
              <p className="font-mono text-[0.625rem] uppercase tracking-widest text-violet mb-2">Triggered</p>
              <p className="text-sm text-muted-foreground">Task created for Arjun, due Wed EOD, linked to the deck doc</p>
            </div>
            <div className="border border-border p-3.5">
              <p className="font-mono text-[0.625rem] uppercase tracking-widest text-violet mb-2">Answerable</p>
              <p className="text-sm text-muted-foreground">"What's blocking the vendor contract?" → answered instantly, with source</p>
            </div>
            <div className="border border-border p-3.5">
              <p className="font-mono text-[0.625rem] uppercase tracking-widest text-violet mb-2">Retained</p>
              <p className="text-sm text-muted-foreground">Searchable permanently — not lost when the call ends</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
