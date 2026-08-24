import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { KnowledgeNetwork } from "./KnowledgeNetwork";

export function ScrollNetwork({ className }: { className?: string }) {
  const [order, setOrder] = useState(0);
  const [isLocked, setIsLocked] = useState(true);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    let currentScroll = 0;

    const handleWheel = (e: WheelEvent) => {
      if (!isLocked || hasCompleted) return;

      e.preventDefault();

      const delta = e.deltaY;
      const sensitivity = 0.002;

      currentScroll += delta * sensitivity;
      currentScroll = Math.max(0, Math.min(1, currentScroll));

      setOrder(currentScroll);

      if (currentScroll >= 1) {
        setHasCompleted(true);
        setIsLocked(false);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) startY = touch.clientY;
    };

    let startY = 0;

    const handleTouchMove = (e: TouchEvent) => {
      if (!isLocked || hasCompleted) return;

      const touch = e.touches[0];
      if (!touch) return;

      const deltaY = startY - touch.clientY;
      startY = touch.clientY;

      const sensitivity = 0.003;
      currentScroll += deltaY * sensitivity;
      currentScroll = Math.max(0, Math.min(1, currentScroll));

      setOrder(currentScroll);

      if (currentScroll >= 1) {
        setHasCompleted(true);
        setIsLocked(false);
      }
    };

    // Capture scroll events on the entire window, not just the container
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isLocked, hasCompleted]);

  return (
    <div className={cn("relative h-full w-full", className)}>
      <KnowledgeNetwork order={order} labels={true} />
      
      {!hasCompleted && (
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <p className="tech-label animate-pulse">
            {order < 0.3 ? "Scroll to organize knowledge" : 
             order < 0.7 ? "Connecting concepts..." : 
             "Almost there..."}
          </p>
          <div className="mt-2 h-1 w-32 overflow-hidden rounded-full bg-border">
            <div 
              className="h-full bg-signal transition-all duration-100"
              style={{ width: `${order * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
