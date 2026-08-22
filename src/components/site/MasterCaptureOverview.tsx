import { useState, useEffect } from "react";

export function MasterCaptureOverview() {
  const [activeScene, setActiveScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const scenes = [
    { label: "01", title: "Classroom capture" },
    { label: "02", title: "Live transcription" },
    { label: "03", title: "AI understanding" },
    { label: "04", title: "Teacher alert" },
    { label: "05", title: "HOD dashboard" },
    { label: "06", title: "Student Q&A" },
    { label: "07", title: "Structured notes" },
  ];

  const startCapture = () => {
    setActiveScene(0);
    setIsPlaying(true);
  };

  const sceneIsVisible = (sceneIndex: number) =>
    activeScene === sceneIndex &&
    (isPlaying || activeScene === scenes.length - 1);

  useEffect(() => {
    if (isPlaying) {
      const sceneDuration = 2500;
      const interval = setInterval(() => {
        setActiveScene((currentScene) => {
          const nextScene = currentScene + 1;
          if (nextScene >= scenes.length) {
            clearInterval(interval);
            setIsPlaying(false);
            return currentScene;
          }
          return nextScene;
        });
      }, sceneDuration);

      return () => clearInterval(interval);
    }
  }, [isPlaying, scenes.length]);

  return (
    <div className="border border-border bg-background">
      <div className="master-stage">
        {/* Progress rail */}
        <div className={`master-rail ${isPlaying ? "show" : ""}`}>
          {scenes.map((_, i) => (
            <div
              key={i}
              className={`seg ${i < activeScene ? "done" : i === activeScene ? "active" : ""}`}
              style={{ width: `${100 / scenes.length}%` }}
            >
              <div className="fill" />
            </div>
          ))}
        </div>

        {/* Initial capture button */}
        {!isPlaying && activeScene === 0 && (
          <div className="text-center">
            <button onClick={startCapture} className="capture-btn">
              <span className="rec-dot" />
              Start capture
            </button>
            <p className="capture-sub">Tap to see the full pipeline</p>
          </div>
        )}

        {/* Scene 1: Classroom */}
        <div className={`scene ${sceneIsVisible(0) ? "active" : ""}`}>
          <div className="scene-inner">
            <p className="scene-label">01</p>
            <h3 className="scene-title">Classroom capture</h3>
            <div className="classroom">
              <div className="figure teacher">
                <div className="head" />
                <div className="body" />
                <div className="sound-wave">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        height: `${6 + Math.random() * 8}px`,
                      }}
                    />
                  ))}
                </div>
              </div>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="figure">
                  <div className="head" />
                  <div className="body" />
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              LCS-402 · Lecture 12 · 9:14 AM
            </p>
          </div>
        </div>

        {/* Scene 2: Transcript */}
        <div className={`scene ${sceneIsVisible(1) ? "active" : ""}`}>
          <div className="scene-inner">
            <p className="scene-label">02</p>
            <h3 className="scene-title">Live transcription</h3>
            <div className="stream-box">
              <span className="live-dot" />
              <span className="live">
                The attention mechanism allows the model to focus on different
                parts of the input sequence when producing each output,
                effectively weighing the importance of each word in context.
              </span>
            </div>
          </div>
        </div>

        {/* Scene 3: AI Understanding */}
        <div className={`scene ${sceneIsVisible(2) ? "active" : ""}`}>
          <div className="scene-inner">
            <p className="scene-label">03</p>
            <h3 className="scene-title">AI understanding</h3>
            <div className="brain-visual">
              <span className="brain-label">LLM</span>
            </div>
            <div className="out-chips">
              {["Concepts", "Intent", "Entities", "Context"].map((chip, i) => (
                <span
                  key={chip}
                  className="out-chip"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scene 4: Teacher Alert */}
        <div className={`scene ${sceneIsVisible(3) ? "active" : ""}`}>
          <div className="scene-inner">
            <p className="scene-label">04</p>
            <h3 className="scene-title">Teacher alert</h3>
            <div className="phone-mock">
              <p className="ph-header">Minutes · Teacher</p>
              <div className="phone-alert">
                <p className="pa-title">Coverage alert</p>
                <p>
                  You're 12% behind syllabus pace for CS-402. Consider
                  accelerating Chapter 7 this week.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scene 5: HOD Dashboard */}
        <div className={`scene ${sceneIsVisible(4) ? "active" : ""}`}>
          <div className="scene-inner">
            <p className="scene-label">05</p>
            <h3 className="scene-title">HOD dashboard</h3>
            <div className="mini-heat">
              {[
                { label: "CS", color: "#D97A3F" },
                { label: "IT", color: "#6B2FA8" },
                { label: "EE", color: "#D97A3F" },
                { label: "ME", color: "#6B2FA8" },
              ].map((cell, i) => (
                <div
                  key={i}
                  className="cell"
                  style={{ background: cell.color }}
                >
                  {cell.label}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Department syllabus completion: 78%
            </p>
          </div>
        </div>

        {/* Scene 6: Student Q&A */}
        <div className={`scene ${sceneIsVisible(5) ? "active" : ""}`}>
          <div className="scene-inner">
            <p className="scene-label">06</p>
            <h3 className="scene-title">Student Q&A</h3>
            <div className="mini-chat">
              <div className="msg user">How does attention work?</div>
              <div className="msg ai">
                Attention allows the model to weigh the importance of each word
                in context when producing output. It's like focusing on relevant
                parts of the input sequence.
              </div>
            </div>
          </div>
        </div>

        {/* Scene 7: Student Notes */}
        <div className={`scene ${sceneIsVisible(6) ? "active" : ""}`}>
          <div className="scene-inner">
            <p className="scene-label">07</p>
            <h3 className="scene-title">Structured notes</h3>
            <div className="mini-note">
              <p className="t">Attention Mechanism</p>
              <p className="s">
                Contextual weighting of input sequence elements. Enables the
                model to focus on relevant parts when generating output.
              </p>
            </div>
          </div>
        </div>

        {/* Replay button */}
        <button
          onClick={startCapture}
          className={`replay-btn ${!isPlaying && activeScene === scenes.length - 1 ? "show" : ""}`}
        >
          ↻ Replay
        </button>
      </div>
      <p className="border-t border-border py-3.5 text-center font-mono text-[0.625rem] text-muted-foreground tracking-wide uppercase opacity-70">
        Interface shown is a product simulation · Minutes is currently in pilot
        development
      </p>
    </div>
  );
}
