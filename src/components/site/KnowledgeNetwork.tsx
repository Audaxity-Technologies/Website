import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type NodeDef = {
  label: string;
  /** Structured position, normalized 0..1 */
  x: number;
  y: number;
  layer: 0 | 1 | 2 | 3;
  importance?: 'minor' | 'normal' | 'important' | 'action';
};

const NODES: NodeDef[] = [
  // INPUT
  { label: "VOICE", x: 0.05, y: 0.04, layer: 0, importance: 'minor' },
  { label: "LECTURE", x: 0.08, y: 0.20, layer: 0, importance: 'normal' },
  { label: "DOCUMENT", x: 0.04, y: 0.38, layer: 0, importance: 'minor' },
  { label: "CONVERSATION", x: 0.08, y: 0.56, layer: 0, importance: 'normal' },
  { label: "MESSAGE", x: 0.14, y: 0.72, layer: 0, importance: 'minor' },
  { label: "EVENT", x: 0.20, y: 0.08, layer: 0, importance: 'normal' },

  // UNDERSTANDING
  { label: "SPEECH", x: 0.27, y: 0.02, layer: 1, importance: 'normal' },
  { label: "LANGUAGE", x: 0.30, y: 0.18, layer: 1, importance: 'important' },
  { label: "INTENT", x: 0.25, y: 0.34, layer: 1, importance: 'important' },
  { label: "CONTEXT", x: 0.30, y: 0.50, layer: 1, importance: 'important' },
  { label: "PEOPLE", x: 0.25, y: 0.66, layer: 1, importance: 'normal' },
  { label: "MEANING", x: 0.40, y: 0.08, layer: 1, importance: 'important' },

  // INTELLIGENCE
  { label: "CONCEPT", x: 0.48, y: 0.02, layer: 2, importance: 'important' },
  { label: "RELATION", x: 0.50, y: 0.20, layer: 2, importance: 'normal' },
  { label: "MEMORY", x: 0.46, y: 0.38, layer: 2, importance: 'important' },
  { label: "KNOWLEDGE", x: 0.52, y: 0.54, layer: 2, importance: 'important' },
  { label: "REASONING", x: 0.46, y: 0.70, layer: 2, importance: 'important' },
  { label: "COURSE", x: 0.62, y: 0.08, layer: 2, importance: 'important' },
  { label: "ENTITY", x: 0.64, y: 0.30, layer: 2, importance: 'normal' },
  { label: "REFERENCE", x: 0.62, y: 0.50, layer: 2, importance: 'normal' },

  // ACTION
  { label: "DECISION", x: 0.76, y: 0.02, layer: 3, importance: 'action' },
  { label: "ANSWER", x: 0.82, y: 0.20, layer: 3, importance: 'action' },
  { label: "TASK", x: 0.76, y: 0.36, layer: 3, importance: 'action' },
  { label: "DEADLINE", x: 0.84, y: 0.50, layer: 3, importance: 'action' },
  { label: "ACTION", x: 0.76, y: 0.66, layer: 3, importance: 'action' },
  { label: "WORKFLOW", x: 0.92, y: 0.30, layer: 3, importance: 'action' },
  { label: "OUTCOME", x: 0.92, y: 0.58, layer: 3, importance: 'action' },
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
         * Edges animate from source to destination as network organizes.
         * Each edge has a staggered start time based on its index.
         */
        const edgeDelay = ei * 0.02;
        const edgeEase = Math.max(0, Math.min(1, (ease - edgeDelay) / (1 - edgeDelay)));
        
        if (edgeEase <= 0.01) return;

        const mx = (A.x + B.x) / 2;
        const my = (A.y + B.y) / 2 - 14 * ease;

        ctx.strokeStyle = `rgba(98,91,84,${edgeEase * 0.45})`;

        ctx.beginPath();

        ctx.moveTo(A.x, A.y);

        // Draw partial curve based on edgeEase
        if (edgeEase < 1) {
          // Calculate intermediate point on quadratic bezier
          const t = edgeEase;
          const inv = 1 - t;
          const px = inv * inv * A.x + 2 * inv * t * mx + t * t * B.x;
          const py = inv * inv * A.y + 2 * inv * t * my + t * t * B.y;
          
          // Draw partial curve
          const steps = 20;
          for (let i = 1; i <= steps; i++) {
            const stepT = (i / steps) * t;
            const stepInv = 1 - stepT;
            const stepX = stepInv * stepInv * A.x + 2 * stepInv * stepT * mx + stepT * stepT * B.x;
            const stepY = stepInv * stepInv * A.y + 2 * stepInv * stepT * my + stepT * stepT * B.y;
            ctx.lineTo(stepX, stepY);
          }
        } else {
          ctx.quadraticCurveTo(mx, my, B.x, B.y);
        }

        ctx.stroke();

        // ----------------------------------------------------------
        // TRAVELLING KNOWLEDGE / INFORMATION PULSE
        // ----------------------------------------------------------

        if (!reduce && edgeEase > 0.5) {
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
            (edgeEase - 0.5) * 2 *
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