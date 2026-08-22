import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type NodeDef = {
  label: string;
  /** Structured position, normalized 0..1 */
  x: number;
  y: number;
  layer: 0 | 1 | 2 | 3;
};

const NODES: NodeDef[] = [
  // INPUT
  { label: "VOICE", x: 0.05, y: 0.12, layer: 0 },
  { label: "LECTURE", x: 0.08, y: 0.32, layer: 0 },
  { label: "DOCUMENT", x: 0.04, y: 0.55, layer: 0 },
  { label: "CONVERSATION", x: 0.08, y: 0.78, layer: 0 },
  { label: "MESSAGE", x: 0.14, y: 0.92, layer: 0 },
  { label: "EVENT", x: 0.20, y: 0.16, layer: 0 },

  // UNDERSTANDING
  { label: "SPEECH", x: 0.27, y: 0.10, layer: 1 },
  { label: "LANGUAGE", x: 0.30, y: 0.28, layer: 1 },
  { label: "INTENT", x: 0.25, y: 0.48, layer: 1 },
  { label: "CONTEXT", x: 0.30, y: 0.68, layer: 1 },
  { label: "PEOPLE", x: 0.25, y: 0.88, layer: 1 },
  { label: "MEANING", x: 0.40, y: 0.16, layer: 1 },

  // INTELLIGENCE
  { label: "CONCEPT", x: 0.48, y: 0.10, layer: 2 },
  { label: "RELATION", x: 0.50, y: 0.30, layer: 2 },
  { label: "MEMORY", x: 0.46, y: 0.52, layer: 2 },
  { label: "KNOWLEDGE", x: 0.52, y: 0.72, layer: 2 },
  { label: "REASONING", x: 0.46, y: 0.90, layer: 2 },
  { label: "COURSE", x: 0.62, y: 0.16, layer: 2 },
  { label: "ENTITY", x: 0.64, y: 0.42, layer: 2 },
  { label: "REFERENCE", x: 0.62, y: 0.66, layer: 2 },

  // ACTION
  { label: "DECISION", x: 0.76, y: 0.10, layer: 3 },
  { label: "ANSWER", x: 0.82, y: 0.30, layer: 3 },
  { label: "TASK", x: 0.76, y: 0.50, layer: 3 },
  { label: "DEADLINE", x: 0.84, y: 0.66, layer: 3 },
  { label: "ACTION", x: 0.76, y: 0.86, layer: 3 },
  { label: "WORKFLOW", x: 0.92, y: 0.42, layer: 3 },
  { label: "OUTCOME", x: 0.92, y: 0.76, layer: 3 },
];

const EDGES: [number, number][] = [
  // INPUT → UNDERSTANDING
  [0, 6],
  [0, 7],
  [1, 6],
  [1, 7],
  [1, 11],
  [2, 7],
  [2, 9],
  [3, 8],
  [3, 10],
  [4, 9],
  [5, 6],
  [5, 11],

  // UNDERSTANDING → INTELLIGENCE
  [6, 11],
  [6, 12],
  [7, 11],
  [7, 12],
  [7, 13],
  [8, 13],
  [8, 14],
  [8, 16],
  [9, 14],
  [9, 15],
  [9, 16],
  [10, 14],
  [10, 15],
  [11, 12],
  [11, 13],

  // INTELLIGENCE internal relationships
  [12, 13],
  [12, 17],
  [13, 14],
  [13, 18],
  [14, 15],
  [14, 16],
  [14, 19],
  [15, 16],
  [15, 18],
  [16, 17],
  [16, 19],
  [17, 18],
  [18, 19],

  // INTELLIGENCE → ACTION
  [12, 20],
  [13, 20],
  [13, 21],
  [14, 21],
  [15, 22],
  [15, 23],
  [16, 22],
  [16, 24],
  [17, 20],
  [17, 21],
  [18, 22],
  [18, 24],
  [19, 23],
  [19, 24],

  // ACTION relationships
  [20, 21],
  [21, 22],
  [21, 26],
  [22, 23],
  [22, 24],
  [23, 24],
  [23, 25],
  [24, 26],
  [25, 26],
];

const INK = "#2B2620";
const GRAY = "#6E6963";
const SIGNAL = "#B85A2B";
const BORDER = "#D8D0C7";

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

        ctx.strokeStyle = `rgba(110,105,99,${
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
          ctx.fillStyle = `rgba(184,90,43,${pulseAlpha})`;

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
          n.layer === 3 ||
          (n.layer === 2 && i % 2 === 0);

        const r =
          3 +
          (isSignal ? 1.2 : 0) *
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

        ctx.fillStyle =
          isSignal && ease > 0.5
            ? SIGNAL
            : INK;

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

          ctx.strokeStyle = `rgba(216,208,199,${
            (ease - 0.45) * 1.4
          })`;

          ctx.stroke();
        }

        // Labels
        if (labels && !mobile) {
          ctx.font =
            "500 9.5px 'IBM Plex Mono', monospace";

          ctx.fillStyle =
            isSignal && ease > 0.6
              ? SIGNAL
              : GRAY;

          ctx.globalAlpha =
            Math.max(
              0,
              ease - 0.25
            ) * 1.3;

          ctx.fillText(
            n.label,
            x + 10,
            y + 3.5
          );

          ctx.globalAlpha = 1;
        }
      });

      // ------------------------------------------------------------
      // STRUCTURE FRAME
      // ------------------------------------------------------------

      if (ease > 0.6) {
        ctx.strokeStyle = BORDER;

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