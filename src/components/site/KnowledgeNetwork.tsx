import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type NodeDef = {
  label: string;
  /** Structured position, normalized 0..1 */
  x: number;
  y: number;
  layer: 0 | 1 | 2 | 3 | 4;
  importance?: 'minor' | 'normal' | 'important' | 'action';
};

const NODES: NodeDef[] = [
  // INPUT LAYER - Unstructured Data Sources
  { label: "VOICE", x: 0.08, y: 0.12, layer: 0, importance: 'normal' },
  { label: "LECTURE", x: 0.08, y: 0.28, layer: 0, importance: 'normal' },
  { label: "DOCUMENT", x: 0.08, y: 0.44, layer: 0, importance: 'normal' },
  { label: "CONVERSATION", x: 0.08, y: 0.60, layer: 0, importance: 'normal' },
  { label: "MESSAGE", x: 0.08, y: 0.76, layer: 0, importance: 'normal' },
  { label: "EVENT", x: 0.08, y: 0.88, layer: 0, importance: 'normal' },

  // HIDDEN LAYER 1 - Understanding & Processing
  { label: "SPEECH", x: 0.28, y: 0.08, layer: 1, importance: 'important' },
  { label: "LANGUAGE", x: 0.28, y: 0.20, layer: 1, importance: 'important' },
  { label: "INTENT", x: 0.28, y: 0.32, layer: 1, importance: 'important' },
  { label: "CONTEXT", x: 0.28, y: 0.44, layer: 1, importance: 'important' },
  { label: "PEOPLE", x: 0.28, y: 0.56, layer: 1, importance: 'important' },
  { label: "MEANING", x: 0.28, y: 0.68, layer: 1, importance: 'important' },
  { label: "TERMINOLOGY", x: 0.28, y: 0.80, layer: 1, importance: 'important' },
  { label: "EMOTION", x: 0.28, y: 0.92, layer: 1, importance: 'important' },

  // HIDDEN LAYER 2 - Intelligence & Knowledge
  { label: "CONCEPT", x: 0.48, y: 0.06, layer: 2, importance: 'important' },
  { label: "RELATION", x: 0.48, y: 0.18, layer: 2, importance: 'important' },
  { label: "MEMORY", x: 0.48, y: 0.30, layer: 2, importance: 'important' },
  { label: "KNOWLEDGE", x: 0.48, y: 0.42, layer: 2, importance: 'important' },
  { label: "REASONING", x: 0.48, y: 0.54, layer: 2, importance: 'important' },
  { label: "COURSE", x: 0.48, y: 0.66, layer: 2, importance: 'important' },
  { label: "ENTITY", x: 0.48, y: 0.78, layer: 2, importance: 'important' },
  { label: "REFERENCE", x: 0.48, y: 0.90, layer: 2, importance: 'important' },

  // HIDDEN LAYER 3 - Structure & Organization
  { label: "GRAPH", x: 0.68, y: 0.10, layer: 3, importance: 'important' },
  { label: "TIMELINE", x: 0.68, y: 0.24, layer: 3, importance: 'important' },
  { label: "TAXONOMY", x: 0.68, y: 0.38, layer: 3, importance: 'important' },
  { label: "SUMMARY", x: 0.68, y: 0.52, layer: 3, importance: 'important' },
  { label: "INSIGHT", x: 0.68, y: 0.66, layer: 3, importance: 'important' },
  { label: "PATTERN", x: 0.68, y: 0.80, layer: 3, importance: 'important' },

  // OUTPUT LAYER - Structured Outcomes
  { label: "DECISION", x: 0.88, y: 0.12, layer: 4, importance: 'action' },
  { label: "ANSWER", x: 0.88, y: 0.28, layer: 4, importance: 'action' },
  { label: "TASK", x: 0.88, y: 0.44, layer: 4, importance: 'action' },
  { label: "DEADLINE", x: 0.88, y: 0.60, layer: 4, importance: 'action' },
  { label: "WORKFLOW", x: 0.88, y: 0.76, layer: 4, importance: 'action' },
  { label: "OUTCOME", x: 0.88, y: 0.88, layer: 4, importance: 'action' },
];

const EDGES: [number, number][] = [
  // INPUT LAYER (0-5) → HIDDEN LAYER 1 (6-13)
  // Each input connects to multiple processing nodes
  [0, 6], [0, 7], [0, 8],
  [1, 6], [1, 7], [1, 9], [1, 10],
  [2, 7], [2, 8], [2, 9],
  [3, 8], [3, 9], [3, 10], [3, 11],
  [4, 10], [4, 11], [4, 12],
  [5, 6], [5, 11], [5, 12], [5, 13],

  // HIDDEN LAYER 1 (6-13) → HIDDEN LAYER 2 (14-21)
  // Dense connections for processing
  [6, 14], [6, 15], [6, 16],
  [7, 14], [7, 15], [7, 16], [7, 17],
  [8, 15], [8, 16], [8, 17], [8, 18],
  [9, 16], [9, 17], [9, 18], [9, 19],
  [10, 17], [10, 18], [10, 19], [10, 20],
  [11, 18], [11, 19], [11, 20], [11, 21],
  [12, 19], [12, 20], [12, 21],
  [13, 20], [13, 21],

  // HIDDEN LAYER 2 (14-21) → HIDDEN LAYER 3 (22-27)
  // Structure and organization connections
  [14, 22], [14, 23],
  [15, 22], [15, 23], [15, 24],
  [16, 23], [16, 24], [16, 25],
  [17, 24], [17, 25], [17, 26],
  [18, 25], [18, 26], [18, 27],
  [19, 26], [19, 27],
  [20, 26], [20, 27],
  [21, 27],

  // HIDDEN LAYER 3 (22-27) → OUTPUT LAYER (28-33)
  // Final outcomes
  [22, 28], [22, 29],
  [23, 28], [23, 29], [23, 30],
  [24, 29], [24, 30], [24, 31],
  [25, 30], [25, 31], [25, 32],
  [26, 31], [26, 32], [26, 33],
  [27, 32], [27, 33],

  // Internal connections within layers (for neural network look)
  // HIDDEN LAYER 1 internal
  [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13],
  // HIDDEN LAYER 2 internal
  [14, 15], [15, 16], [16, 17], [17, 18], [18, 19], [19, 20], [20, 21],
  // HIDDEN LAYER 3 internal
  [22, 23], [23, 24], [24, 25], [25, 26], [26, 27],
  // OUTPUT LAYER internal
  [28, 29], [29, 30], [30, 31], [31, 32], [32, 33],
];

function getThemeColors() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  return {
    node: isDark ? 'rgb(216,208,199)' : 'rgb(216,208,199)',
    nodeSecondary: isDark ? 'rgb(143,137,130)' : 'rgb(110,105,99)',
    connection: isDark ? 'rgb(98,91,84)' : 'rgb(110,105,99)',
    pulse: isDark ? 'rgb(228,122,61)' : 'rgb(184,90,43)',
    signal: isDark ? 'rgb(216,111,56)' : 'rgb(184,90,43)',
    border: isDark ? 'rgb(57,52,46)' : 'rgb(216,208,199)',
  };
}

function hash(n: number) {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
}

export function KnowledgeNetwork({
  order,
  className,
  labels = true,
}: {
  /** 0 = scattered fragments, 1 = fully structured intelligence */
  order: number;
  className?: string;
  labels?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const orderRef = useRef(order);
  const themeRef = useRef(document.documentElement.getAttribute('data-theme'));

  orderRef.current = order;

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let mobile = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      w = rect.width;
      h = rect.height;

      mobile = w < 640;

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ro = new ResizeObserver(resize);

    ro.observe(canvas);

    resize();

    /*
     * Keep the full network visible on desktop.
     *
     * On very small screens we hide only labels, not the network itself,
     * so the visual still reads as a connected knowledge system.
     */
    const visible = (i: number) => {
      if (!mobile) return true;

      // Keep most nodes visible on mobile.
      return i % 5 !== 0;
    };

    const draw = (t: number) => {
      const o = Math.min(1, Math.max(0, orderRef.current));

      const ease = o * o * (3 - 2 * o);

      const time = reduce ? 0 : t / 1000;

      const colors = getThemeColors();

      ctx.clearRect(0, 0, w, h);

      /*
       * Generate node positions.
       *
       * At order = 0:
       *   Nodes are slightly scattered.
       *
       * At order = 1:
       *   Nodes settle into the intentional network structure.
       *
       * This keeps the network visible in the hero while still
       * preserving the "unstructured → organized" concept.
       */
      const pts = NODES.map((n, i) => {
        const cx = 0.08 + hash(i + 1) * 0.84;
        const cy = 0.08 + hash(i + 9) * 0.84;

        const scatterStrength = 0.22;

        const drift = reduce
          ? 0
          : (1 - ease) * 6;

        const targetX = n.x;
        const targetY = n.y;

        const scatteredX =
          targetX + (cx - targetX) * scatterStrength;

        const scatteredY =
          targetY + (cy - targetY) * scatterStrength;

        const px =
          (scatteredX +
            (targetX - scatteredX) * ease) *
            w +
          Math.sin(time * 0.35 + i * 1.7) * drift;

        const py =
          (scatteredY +
            (targetY - scatteredY) * ease) *
            h +
          Math.cos(time * 0.29 + i * 2.3) * drift;

        /*
         * IMPORTANT:
         * Return the calculated point.
         */
        return {
          x: px,
          y: py,
          n,
          i,
        };
      });

      // ------------------------------------------------------------
      // EDGES + TRAVELLING INFORMATION
      // ------------------------------------------------------------

      ctx.lineWidth = 1;

      EDGES.forEach(([a, b], ei) => {
        if (!visible(a) || !visible(b)) return;

        const A = pts[a];
        const B = pts[b];

        if (!A || !B) return;

        /*
         * Edges remain subtle but become increasingly visible
         * as the network becomes structured.
         */
        const alpha =
          Math.max(0, ease - 0.12) * 0.9;

        if (alpha <= 0.01) return;

        const mx = (A.x + B.x) / 2;

        const my =
          (A.y + B.y) / 2 -
          14 * ease;

        ctx.strokeStyle = `rgba(98,91,84,${
          alpha * 0.45
        })`;

        ctx.beginPath();

        ctx.moveTo(A.x, A.y);

        ctx.quadraticCurveTo(
          mx,
          my,
          B.x,
          B.y
        );

        ctx.stroke();

        // ----------------------------------------------------------
        // TRAVELLING KNOWLEDGE / INFORMATION PULSE
        // ----------------------------------------------------------

        if (!reduce && ease > 0.25) {
          const speed = 0.22;

          const k =
            (time * speed + hash(ei + 3)) % 1;

          const inv = 1 - k;

          /*
           * Quadratic Bézier position.
           */
          const qx =
            inv * inv * A.x +
            2 * inv * k * mx +
            k * k * B.x;

          const qy =
            inv * inv * A.y +
            2 * inv * k * my +
            k * k * B.y;

          const fade = Math.sin(k * Math.PI);

          const pulseAlpha =
            fade *
            Math.max(0, ease - 0.25) *
            1.25;

          /*
           * Small orange particle represents information
           * travelling from one concept to another.
           */
          ctx.fillStyle = colors.pulse.replace(')', `,${pulseAlpha})`).replace('rgb', 'rgba');

          ctx.beginPath();

          ctx.arc(
            qx,
            qy,
            2.2,
            0,
            Math.PI * 2
          );

          ctx.fill();
        }
      });

      // ------------------------------------------------------------
      // NODES
      // ------------------------------------------------------------

      pts.forEach(({ x, y, n, i }) => {
        if (!visible(i)) return;

        /*
         * Action nodes and important intelligence nodes
         * receive the signal/orange treatment.
         */
        const isSignal =
          n.importance === 'action' ||
          n.importance === 'important';

        const baseRadius = n.importance === 'minor' ? 2.5 : 
                          n.importance === 'normal' ? 3.5 :
                          n.importance === 'important' ? 4.5 : 5.5;

        const r =
          baseRadius +
          (isSignal ? 0.8 : 0) *
            ease;

        // Main node
        ctx.beginPath();

        ctx.arc(
          x,
          y,
          r,
          0,
          Math.PI * 2
        );

        const nodeColor = isSignal && ease > 0.5
          ? colors.signal
          : (n.importance === 'minor' ? colors.nodeSecondary : colors.node);

        ctx.fillStyle = nodeColor;

        ctx.globalAlpha =
          0.35 +
          ease * 0.65;

        ctx.fill();

        ctx.globalAlpha = 1;

        // Soft node ring
        if (ease > 0.45) {
          ctx.beginPath();

          ctx.arc(
            x,
            y,
            r +
              6 +
              Math.sin(
                time * 1.2 + i
              ) *
                1.2,
            0,
            Math.PI * 2
          );

          ctx.strokeStyle = colors.border.replace(')', `,${(ease - 0.45) * 1.4})`).replace('rgb', 'rgba');

          ctx.stroke();
        }

        // Labels - show if explicitly requested
        if (labels) {
          ctx.font =
            "600 11px 'IBM Plex Mono', monospace";

          ctx.fillStyle =
            isSignal && ease > 0.6
              ? colors.signal
              : colors.nodeSecondary;

          ctx.globalAlpha =
            Math.max(
              0.4,
              ease - 0.1
            ) * 1.2;

          ctx.fillText(
            n.label,
            x + 12,
            y + 4
          );

          ctx.globalAlpha = 1;
        }
      });

      // ------------------------------------------------------------
      // STRUCTURE FRAME
      // ------------------------------------------------------------

      if (ease > 0.6) {
        ctx.strokeStyle = colors.border;

        ctx.globalAlpha =
          (ease - 0.6) * 1.2;

        ctx.setLineDash([2, 6]);

        [0.22, 0.47, 0.73].forEach(
          (fx) => {
            ctx.beginPath();

            ctx.moveTo(
              fx * w,
              h * 0.04
            );

            ctx.lineTo(
              fx * w,
              h * 0.96
            );

            ctx.stroke();
          }
        );

        ctx.setLineDash([]);

        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [labels]);

  // Listen for theme changes and redraw
  useEffect(() => {
    const handleThemeChange = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme !== themeRef.current) {
        themeRef.current = currentTheme;
        // Force redraw by toggling a small state change
      }
    };

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "h-full w-full",
        className
      )}
    />
  );
}

/**
 * Small static-ish network used as decorative
 * texture in section headers.
 */
export function NetworkStrip({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-24 w-full",
        className
      )}
    >
      <KnowledgeNetwork
        order={1}
        labels={false}
      />
    </div>
  );
}