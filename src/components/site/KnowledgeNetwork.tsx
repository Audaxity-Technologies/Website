import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type NodeDef = {
  label: string;
  /** structured position, normalized 0..1 */
  x: number;
  y: number;
  layer: 0 | 1 | 2 | 3;
};

const NODES: NodeDef[] = [
  { label: "VOICE", x: 0.07, y: 0.16, layer: 0 },
  { label: "LECTURE", x: 0.08, y: 0.42, layer: 0 },
  { label: "DOCUMENT", x: 0.06, y: 0.68, layer: 0 },
  { label: "CONVERSATION", x: 0.1, y: 0.9, layer: 0 },

  { label: "SPEECH", x: 0.31, y: 0.14, layer: 1 },
  { label: "LANGUAGE", x: 0.33, y: 0.38, layer: 1 },
  { label: "INTENT", x: 0.3, y: 0.63, layer: 1 },
  { label: "CONTEXT", x: 0.34, y: 0.88, layer: 1 },

  { label: "CONCEPT", x: 0.58, y: 0.2, layer: 2 },
  { label: "RELATION", x: 0.6, y: 0.45, layer: 2 },
  { label: "MEMORY", x: 0.56, y: 0.7, layer: 2 },
  { label: "COURSE", x: 0.62, y: 0.92, layer: 2 },

  { label: "DECISION", x: 0.85, y: 0.3, layer: 3 },
  { label: "ACTION", x: 0.88, y: 0.58, layer: 3 },
  { label: "ANSWER", x: 0.84, y: 0.84, layer: 3 },
];

const EDGES: [number, number][] = [
  [0, 4],
  [1, 4],
  [1, 5],
  [2, 5],
  [2, 6],
  [3, 6],
  [3, 7],
  [4, 8],
  [5, 8],
  [5, 9],
  [6, 9],
  [6, 10],
  [7, 10],
  [7, 11],
  [8, 9],
  [9, 10],
  [10, 11],
  [8, 12],
  [9, 12],
  [9, 13],
  [10, 13],
  [11, 13],
  [10, 14],
  [11, 14],
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

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

    const visible = (i: number) => !mobile || i % 3 !== 2;

    const draw = (t: number) => {
      const o = Math.min(1, Math.max(0, orderRef.current));
      const ease = o * o * (3 - 2 * o);
      const time = reduce ? 0 : t / 1000;

      ctx.clearRect(0, 0, w, h);

      const pts = NODES.map((n, i) => {
        const cx = 0.18 + hash(i + 1) * 0.66;
        const cy = 0.1 + hash(i + 9) * 0.8;
        const drift = reduce ? 0 : (1 - ease * 0.75) * 10;
        const px =
          (cx + (n.x - cx) * ease) * w +
          Math.sin(time * 0.35 + i * 1.7) * drift +
          Math.sin(time * 0.2 + i) * 2 * ease;
        const py =
          (cy + (n.y - cy) * ease) * h +
          Math.cos(time * 0.29 + i * 2.3) * drift +
          Math.cos(time * 0.24 + i) * 2 * ease;
        return { x: px, y: py, n, i };
      });

      // edges
      ctx.lineWidth = 1;
      EDGES.forEach(([a, b], ei) => {
        if (!visible(a) || !visible(b)) return;
        const A = pts[a];
        const B = pts[b];
        if (!A || !B) return;
        const alpha = Math.max(0, ease - 0.12) * 0.9;
        if (alpha <= 0.01) return;
        const mx = (A.x + B.x) / 2;
        const my = (A.y + B.y) / 2 - 14 * ease;
        ctx.strokeStyle = `rgba(110,105,99,${alpha * 0.45})`;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.quadraticCurveTo(mx, my, B.x, B.y);
        ctx.stroke();

        // travelling knowledge pulse
        if (!reduce && ease > 0.35) {
          const speed = 0.22;
          const k = (time * speed + hash(ei + 3)) % 1;
          const inv = 1 - k;
          const qx = inv * inv * A.x + 2 * inv * k * mx + k * k * B.x;
          const qy = inv * inv * A.y + 2 * inv * k * my + k * k * B.y;
          const fade = Math.sin(k * Math.PI);
          ctx.fillStyle = `rgba(184,90,43,${fade * (ease - 0.35) * 1.2})`;
          ctx.beginPath();
          ctx.arc(qx, qy, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // nodes
      pts.forEach(({ x, y, n, i }) => {
        if (!visible(i)) return;
        const isSignal = n.layer === 3 || (n.layer === 2 && i % 2 === 0);
        const r = 3 + (isSignal ? 1.2 : 0) * ease;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = isSignal && ease > 0.5 ? SIGNAL : INK;
        ctx.globalAlpha = 0.35 + ease * 0.65;
        ctx.fill();
        ctx.globalAlpha = 1;

        if (ease > 0.45) {
          ctx.beginPath();
          ctx.arc(x, y, r + 6 + Math.sin(time * 1.2 + i) * 1.2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(216,208,199,${(ease - 0.45) * 1.4})`;
          ctx.stroke();
        }

        if (labels && !mobile) {
          ctx.font = "500 9.5px 'IBM Plex Mono', monospace";
          ctx.fillStyle = isSignal && ease > 0.6 ? SIGNAL : GRAY;
          ctx.globalAlpha = Math.max(0, ease - 0.25) * 1.3;
          ctx.fillText(n.label, x + 10, y + 3.5);
          ctx.globalAlpha = 1;
        }
      });

      // structure frame
      if (ease > 0.6) {
        ctx.strokeStyle = BORDER;
        ctx.globalAlpha = (ease - 0.6) * 1.2;
        ctx.setLineDash([2, 6]);
        [0.22, 0.47, 0.73].forEach((fx) => {
          ctx.beginPath();
          ctx.moveTo(fx * w, h * 0.04);
          ctx.lineTo(fx * w, h * 0.96);
          ctx.stroke();
        });
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
      className={cn("h-full w-full", className)}
    />
  );
}

/** Small static-ish network used as decorative texture in section headers. */
export function NetworkStrip({ className }: { className?: string }) {
  return (
    <div className={cn("h-24 w-full", className)}>
      <KnowledgeNetwork order={1} labels={false} />
    </div>
  );
}
