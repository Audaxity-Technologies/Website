import { useState, useEffect } from "react";

export function WaveformTranscriptNotes() {
  const [transcript, setTranscript] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const fullTranscript = "The attention mechanism allows the model to focus on different parts of the input sequence when producing each output, effectively weighing the importance of each word in context.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullTranscript.length) {
        setTranscript(fullTranscript.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowNotes(true), 300);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const notes = [
    { key: "Concept", value: "Attention mechanism" },
    { key: "Function", value: "Contextual weighting" },
    { key: "Output", value: "Sequence-aware focus" },
    { key: "Domain", value: "Deep learning" },
  ];

  return (
    <div className="border border-border bg-background">
      <div className="flow-panel">
        {/* Waveform column */}
        <div className="flow-col">
          <p className="flow-col-label">Input</p>
          <div className="waveform">
            {[...Array(24)].map((_, i) => (
              <span
                key={i}
                style={{
                  animationDelay: `${i * 0.05}s`,
                  height: `${20 + Math.random() * 40}px`,
                }}
              />
            ))}
          </div>
          <p className="wf-caption">Live lecture audio</p>
        </div>

        {/* Transcript column */}
        <div className="flow-col">
          <p className="flow-col-label">Transcript</p>
          <div className="transcript-text">
            <span className="typed">{transcript}</span>
          </div>
        </div>

        {/* Notes column */}
        <div className="flow-col">
          <p className="flow-col-label">Structured notes</p>
          {showNotes && (
            <div>
              {notes.map((note, i) => (
                <div key={i} className="assemble-item">
                  <span className="k">{note.key}</span>
                  <div>{note.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <p className="sim-disclosure">
        Interface shown is a product simulation · Minutes is currently in pilot development
      </p>
    </div>
  );
}
