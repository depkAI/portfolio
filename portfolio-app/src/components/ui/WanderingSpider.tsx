"use client";
import { useEffect, useRef, useState } from "react";

export default function WanderingSpider() {
  const spiderRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 200, y: 300 });
  const [target, setTarget] = useState({ x: 500, y: 600 });
  const [flip, setFlip] = useState(false);
  const trailRef = useRef<SVGSVGElement>(null);
  const pathsRef = useRef<{ x1: number; y1: number; x2: number; y2: number; opacity: number }[]>([]);

  // Pick a new random target
  const pickTarget = () => {
    const margin = 60;
    return {
      x: margin + Math.random() * (window.innerWidth - margin * 2),
      y: margin + Math.random() * (document.body.scrollHeight - margin * 2),
    };
  };

  useEffect(() => {
    let animId: number;
    let prevX = pos.x;

    const speed = 1.2;

    const step = () => {
      setPos((prev) => {
        const dx = target.x - prev.x;
        const dy = target.y - prev.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 5) {
          setTarget(pickTarget());
          return prev;
        }

        const nx = (dx / dist) * speed;
        const ny = (dy / dist) * speed;
        const newX = prev.x + nx;
        const newY = prev.y + ny;

        // Flip spider based on direction
        if (newX > prevX + 0.1) setFlip(false);
        else if (newX < prevX - 0.1) setFlip(true);
        prevX = newX;

        // Add web trail segment
        pathsRef.current.push({
          x1: prev.x,
          y1: prev.y,
          x2: newX,
          y2: newY,
          opacity: 0.15,
        });

        // Keep only last 200 segments
        if (pathsRef.current.length > 200) {
          pathsRef.current = pathsRef.current.slice(-200);
        }

        // Fade trails
        pathsRef.current = pathsRef.current
          .map((p) => ({ ...p, opacity: p.opacity - 0.0004 }))
          .filter((p) => p.opacity > 0);

        return { x: newX, y: newY };
      });

      // Draw trails
      const svg = trailRef.current;
      if (svg) {
        const paths = pathsRef.current;
        // Only redraw every 3 frames for performance
        if (paths.length % 3 === 0) {
          svg.innerHTML = paths
            .map(
              (p) =>
                `<line x1="${p.x1}" y1="${p.y1}" x2="${p.x2}" y2="${p.y2}" stroke="rgba(226,54,54,${p.opacity})" stroke-width="0.5"/>`
            )
            .join("");
        }
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [target]);

  return (
    <>
      {/* Web trail */}
      <svg
        ref={trailRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      {/* Spider */}
      <div
        ref={spiderRef}
        style={{
          position: "absolute",
          left: pos.x - 10,
          top: pos.y - 10,
          width: 20,
          height: 20,
          zIndex: 6,
          pointerEvents: "none",
          transform: flip ? "scaleX(-1)" : "scaleX(1)",
          transition: "transform 0.3s",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 100 100" fill="none">
          {/* Body */}
          <ellipse cx="50" cy="55" rx="12" ry="16" fill="#E23636" />
          <circle cx="50" cy="35" r="8" fill="#E23636" />
          {/* Legs */}
          <path d="M62 45 Q75 38,88 22" stroke="#E23636" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M62 52 Q78 50,92 42" stroke="#E23636" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M62 58 Q78 60,92 68" stroke="#E23636" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M62 64 Q75 70,88 84" stroke="#E23636" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M38 45 Q25 38,12 22" stroke="#E23636" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M38 52 Q22 50,8 42" stroke="#E23636" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M38 58 Q22 60,8 68" stroke="#E23636" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M38 64 Q25 70,12 84" stroke="#E23636" strokeWidth="2.5" strokeLinecap="round" />
          {/* Eyes */}
          <ellipse cx="44" cy="33" rx="3" ry="4" fill="#fff" opacity="0.9" />
          <ellipse cx="56" cy="33" rx="3" ry="4" fill="#fff" opacity="0.9" />
        </svg>
      </div>
    </>
  );
}
