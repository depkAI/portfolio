"use client";
import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { playWebShoot } from "@/utils/playWebShoot";

const RED = "#E23636";

function generateWebPaths(fx: number, fy: number, tx: number, ty: number): string[] {
  const paths: string[] = [];
  const dx = tx - fx;
  const dy = ty - fy;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const px = -dy / dist;
  const py = dx / dist;
  for (let i = 0; i < 6; i++) {
    const isMain = i === 0;
    const ss = isMain ? 0 : (Math.random() - 0.5) * 24;
    const se = isMain ? 0 : (Math.random() - 0.5) * 8;
    const sx = fx + px * ss, sy = fy + py * ss;
    const ex = tx + px * se, ey = ty + py * se;
    const c = isMain ? (Math.random() - 0.5) * dist * 0.06 : (Math.random() - 0.5) * dist * 0.18;
    const c1x = sx + dx * 0.3 + px * c, c1y = sy + dy * 0.3 + py * c;
    const c2x = sx + dx * 0.7 + px * c * 0.4, c2y = sy + dy * 0.7 + py * c * 0.4;
    paths.push(`M${sx.toFixed(1)},${sy.toFixed(1)} C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}`);
  }
  return paths;
}

export default function WebReveal({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const [coverGone, setCoverGone] = useState(false);
  const [fired, setFired] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const splatRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (fired) return;
      setFired(true);
      playWebShoot();

      const svg = svgRef.current;
      const cover = coverRef.current;
      const container = containerRef.current;
      const glow = glowRef.current;
      const splat = splatRef.current;
      const flash = flashRef.current;
      if (!svg || !cover || !container || !glow || !splat || !flash) return;

      const rect = container.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const handX = rect.width / 2;
      const handY = rect.height;

      const cx = rect.width / 2, cy = rect.height / 2;
      const pdx = clickX - cx, pdy = clickY - cy;
      const pd = Math.sqrt(pdx * pdx + pdy * pdy) || 1;
      const pnx = pdx / pd, pny = pdy / pd;

      const strandPaths = generateWebPaths(handX, handY, clickX, clickY);
      const pathEls: SVGPathElement[] = [];
      strandPaths.forEach((d, i) => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", d);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", i === 0 ? "rgba(255,255,255,0.95)" : `rgba(255,255,255,${(0.4 + Math.random() * 0.35).toFixed(2)})`);
        path.setAttribute("stroke-width", i === 0 ? "2.5" : `${(0.8 + Math.random() * 1.2).toFixed(1)}`);
        path.setAttribute("stroke-linecap", "round");
        svg.appendChild(path);
        const len = path.getTotalLength();
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = `${len}`;
        pathEls.push(path);
      });

      const burstLines: SVGLineElement[] = [];
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", `${clickX}`); line.setAttribute("y1", `${clickY}`);
        line.setAttribute("x2", `${clickX + Math.cos(a) * 3}`);
        line.setAttribute("y2", `${clickY + Math.sin(a) * 3}`);
        line.setAttribute("stroke", RED);
        line.setAttribute("stroke-width", `${1.5 + Math.random()}`);
        line.setAttribute("stroke-linecap", "round");
        line.setAttribute("opacity", "0");
        svg.appendChild(line);
        burstLines.push(line);
      }

      gsap.set(splat, { left: clickX, top: clickY, xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });

      const tl = gsap.timeline({ onComplete: () => setCoverGone(true) });

      gsap.set(glow, { left: handX - 50, bottom: 0 });
      tl.fromTo(glow, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 2, duration: 0.07, ease: "power2.out" }, 0);
      tl.to(glow, { opacity: 0, scale: 0.3, duration: 0.3, ease: "power3.in" }, 0.07);

      tl.to(pathEls, { strokeDashoffset: 0, duration: 0.16, ease: "power4.out", stagger: 0.01 }, 0.02);
      tl.fromTo(svg, { filter: "drop-shadow(0 0 0px rgba(255,255,255,0))" }, { filter: "drop-shadow(0 0 10px rgba(255,255,255,0.6))", duration: 0.1, ease: "power2.out" }, 0.02);
      tl.to(svg, { filter: "drop-shadow(0 0 3px rgba(255,255,255,0.15))", duration: 0.3 }, 0.15);

      burstLines.forEach((line, i) => {
        const a = (i / 10) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const ed = 30 + Math.random() * 25;
        tl.to(line, { attr: { x2: clickX + Math.cos(a) * ed, y2: clickY + Math.sin(a) * ed }, opacity: 1, duration: 0.1, ease: "power2.out" }, 0.17);
        tl.to(line, { opacity: 0, duration: 0.2 }, 0.3);
      });

      tl.to(splat, { scale: 1, opacity: 1, duration: 0.08, ease: "power2.out" }, 0.17);
      tl.to(splat, { opacity: 0, scale: 1.3, duration: 0.3 }, 0.28);

      const shakes = [{ x: 3, y: -2, d: 0.02 }, { x: -4, y: 3, d: 0.02 }, { x: 2, y: -1, d: 0.025 }, { x: 0, y: 0, d: 0.03 }];
      let st = 0.18;
      shakes.forEach(k => { tl.to(container, { x: k.x, y: k.y, duration: k.d }, st); st += k.d; });

      tl.to(cover, { x: pnx * 15, y: pny * 15, scale: 1.01, duration: 0.22, ease: "power2.inOut" }, 0.35);

      const pullMag = Math.max(rect.width, rect.height) * 1.3;
      tl.to(cover, { x: pnx * pullMag, y: pny * pullMag, scale: 0.75, rotation: pnx * 8, opacity: 0, duration: 0.5, ease: "expo.out" }, 0.57);

      tl.to(pathEls, { opacity: 0, duration: 0.3, stagger: 0.01 }, 0.65);

      tl.fromTo(flash, { opacity: 0 }, { opacity: 0.15, duration: 0.06 }, 0.6);
      tl.to(flash, { opacity: 0, duration: 0.4 }, 0.66);

      tl.call(() => setRevealed(true), [], 0.7);
    },
    [fired]
  );

  return (
    <div ref={containerRef} className="relative" style={{ willChange: "transform" }}>
      <div style={{ opacity: revealed ? 1 : 0, transition: "opacity 0.5s ease", pointerEvents: revealed ? "auto" : "none" }}>
        {children}
      </div>

      {!coverGone && (
        <div className="absolute inset-0 cursor-pointer" style={{ zIndex: 20 }} onClick={handleClick}>
          <div ref={coverRef} className="absolute inset-0" style={{ background: "#0a0a14", willChange: "transform, opacity", transformOrigin: "center" }}>
            <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(226,54,54,0.04), transparent 70%)" }} />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" style={{ opacity: 0.5 }}>
                <ellipse cx="50" cy="52" rx="9" ry="12" fill={RED} />
                <circle cx="50" cy="37" r="5.5" fill={RED} />
                <path d="M59 45 Q70 40,82 25" stroke={RED} strokeWidth="2.5" strokeLinecap="round" />
                <path d="M59 52 Q72 50,86 44" stroke={RED} strokeWidth="2.5" strokeLinecap="round" />
                <path d="M59 57 Q72 59,86 66" stroke={RED} strokeWidth="2.5" strokeLinecap="round" />
                <path d="M59 62 Q70 68,82 80" stroke={RED} strokeWidth="2.5" strokeLinecap="round" />
                <path d="M41 45 Q30 40,18 25" stroke={RED} strokeWidth="2.5" strokeLinecap="round" />
                <path d="M41 52 Q28 50,14 44" stroke={RED} strokeWidth="2.5" strokeLinecap="round" />
                <path d="M41 57 Q28 59,14 66" stroke={RED} strokeWidth="2.5" strokeLinecap="round" />
                <path d="M41 62 Q30 68,18 80" stroke={RED} strokeWidth="2.5" strokeLinecap="round" />
              </svg>

              <p style={{ fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "#fff", letterSpacing: "0.04em", lineHeight: 1 }}>
                {title}
              </p>

              {subtitle && (
                <p style={{ fontFamily: "var(--font-orbitron)", fontSize: 10, letterSpacing: "0.3em", color: "rgba(226,54,54,0.5)", textTransform: "uppercase", animation: "flicker 3s infinite" }}>
                  {subtitle}
                </p>
              )}

              <p style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "rgba(255,255,255,0.25)", marginTop: 8 }}>
                Click anywhere to reveal
              </p>
            </div>
          </div>

          <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 25, overflow: "visible" }} />
          <div ref={glowRef} className="absolute pointer-events-none" style={{ width: 100, height: 100, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, ${RED} 30%, rgba(226,54,54,0.3) 50%, transparent 70%)`, opacity: 0, zIndex: 25, willChange: "transform, opacity" }} />
          <div ref={splatRef} className="absolute pointer-events-none" style={{ width: 32, height: 32, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 50%, transparent 70%)", boxShadow: `0 0 18px rgba(255,255,255,0.6), 0 0 40px ${RED}40`, zIndex: 25, willChange: "transform, opacity" }} />
          <div ref={flashRef} className="absolute inset-0 pointer-events-none" style={{ background: "white", opacity: 0, zIndex: 22 }} />
        </div>
      )}
    </div>
  );
}
