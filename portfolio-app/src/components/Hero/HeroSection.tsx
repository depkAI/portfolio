"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { playWebShoot } from "@/utils/playWebShoot";

/* ------------------------------------------------------------------ */
/*  CONSTANTS                                                         */
/* ------------------------------------------------------------------ */
const RED = "#E23636";
const DARK_RED = "#B52020";
const WEB_WHITE = "#F0F0F0";
const BG = "#0a0a14";

const NAME_LETTERS = "DEEPAK".split("");
const SUBTITLE_LINES = [
  "Building web experiences with great power & great responsibility.",
  "React \u00b7 Next.js \u00b7 Node \u00b7 TypeScript \u00b7 Python",
  "Turning ideas into production-grade software.",
];

const STATS = [
  { label: "PROJECTS", value: "20+" },
  { label: "EXPERIENCE", value: "3 YRS" },
  { label: "COMMITS", value: "2K+" },
  { label: "COFFEES", value: "\u221E" },
];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                           */
/* ------------------------------------------------------------------ */
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

/* ------------------------------------------------------------------ */
/*  WEB PARTICLE CANVAS                                               */
/* ------------------------------------------------------------------ */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const WebParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      resize();
      const count = Math.floor((canvas.width * canvas.height) / 12000);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(226,54,54,0.35)";
        ctx.fill();
      }

      const linkDist = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(226,54,54,${0.12 * (1 - dist / linkDist)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

/* ------------------------------------------------------------------ */
/*  NYC SKYLINE SVG                                                   */
/* ------------------------------------------------------------------ */
const NYCSkyline: React.FC = () => (
  <svg
    viewBox="0 0 1440 200"
    preserveAspectRatio="none"
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "100px",
      zIndex: 1,
      opacity: 0.08,
    }}
  >
    <path
      d="M0 200 L0 140 L30 140 L30 100 L50 100 L50 120 L70 120 L70 80 L90 80 L90 110
         L110 110 L110 60 L120 60 L120 45 L130 45 L130 60 L140 60 L140 110 L160 110
         L160 90 L180 90 L180 70 L195 70 L195 50 L210 50 L210 70 L225 70 L225 100
         L260 100 L260 65 L280 65 L280 100 L310 100 L310 55 L320 55 L320 30 L330 30
         L330 55 L340 55 L340 100 L370 100 L370 80 L400 80 L400 50 L410 50 L410 25
         L420 25 L420 50 L430 50 L430 80 L460 80 L460 95 L500 95 L500 70 L520 70
         L520 40 L530 40 L530 15 L540 15 L540 40 L550 40 L550 70 L570 70 L570 95
         L610 95 L610 75 L640 75 L640 60 L660 60 L660 45 L680 45 L680 60 L700 60
         L700 85 L740 85 L740 100 L780 100 L780 70 L800 70 L800 50 L810 50 L810 20
         L820 20 L820 50 L830 50 L830 70 L850 70 L850 100 L890 100 L890 80 L920 80
         L920 55 L935 55 L935 35 L950 35 L950 55 L965 55 L965 80 L1000 80 L1000 100
         L1040 100 L1040 70 L1060 70 L1060 45 L1080 45 L1080 70 L1100 70 L1100 95
         L1140 95 L1140 85 L1170 85 L1170 60 L1185 60 L1185 30 L1195 30 L1195 60
         L1210 60 L1210 85 L1240 85 L1240 100 L1280 100 L1280 75 L1310 75 L1310 90
         L1340 90 L1340 110 L1380 110 L1380 130 L1440 130 L1440 200 Z"
      fill={WEB_WHITE}
    />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  TYPEWRITER HOOK                                                   */
/* ------------------------------------------------------------------ */
function useTypewriter(lines: string[], speed = 45, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = lines[lineIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setCharIdx(0);
      setLineIdx((l) => (l + 1) % lines.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, lineIdx, lines, pause, speed]);

  return display;
}

/* ------------------------------------------------------------------ */
/*  MAIN HERO SECTION                                                 */
/* ------------------------------------------------------------------ */
const HeroSection: React.FC = () => {
  const coverRef = useRef<HTMLDivElement>(null);
  const [coverGone, setCoverGone] = useState(false);
  const subtitle = useTypewriter(SUBTITLE_LINES);

  /* GSAP cover rip animation */
  useEffect(() => {
    if (!coverRef.current) return;

    const tl = gsap.timeline({
      delay: 0.4,
      onComplete: () => setCoverGone(true),
    });

    tl.to(coverRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1.2,
      ease: "power4.inOut",
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleCTA = useCallback(
    (id: string) => {
      playWebShoot();
      scrollTo(id);
    },
    []
  );

  /* ---- RENDER ---- */
  return (
    <section
      id="home"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: BG,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Particle background */}
      <WebParticleCanvas />

      {/* NYC skyline */}
      <NYCSkyline />

      {/* GSAP cover overlay */}
      <AnimatePresence>
        {!coverGone && (
          <div
            ref={coverRef}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 50,
              background: `linear-gradient(135deg, ${DARK_RED} 0%, ${RED} 50%, ${BG} 100%)`,
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Spider emblem on cover */}
            <svg
              width="80"
              height="80"
              viewBox="0 0 100 100"
              fill="none"
              style={{ opacity: 0.6 }}
            >
              <ellipse cx="50" cy="50" rx="18" ry="28" stroke={WEB_WHITE} strokeWidth="2" />
              <ellipse cx="50" cy="50" rx="10" ry="16" stroke={WEB_WHITE} strokeWidth="1.5" />
              <line x1="50" y1="22" x2="50" y2="0" stroke={WEB_WHITE} strokeWidth="1.5" />
              <line x1="50" y1="78" x2="50" y2="100" stroke={WEB_WHITE} strokeWidth="1.5" />
              <line x1="32" y1="35" x2="10" y2="15" stroke={WEB_WHITE} strokeWidth="1.5" />
              <line x1="68" y1="35" x2="90" y2="15" stroke={WEB_WHITE} strokeWidth="1.5" />
              <line x1="32" y1="65" x2="10" y2="85" stroke={WEB_WHITE} strokeWidth="1.5" />
              <line x1="68" y1="65" x2="90" y2="85" stroke={WEB_WHITE} strokeWidth="1.5" />
              <line x1="32" y1="50" x2="5" y2="50" stroke={WEB_WHITE} strokeWidth="1.5" />
              <line x1="68" y1="50" x2="95" y2="50" stroke={WEB_WHITE} strokeWidth="1.5" />
            </svg>
          </div>
        )}
      </AnimatePresence>

      {/* ---- MAIN CONTENT ---- */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 1.5rem",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {/* Label */}
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          style={{
            fontFamily: "var(--font-orbitron, 'Orbitron', sans-serif)",
            fontSize: "0.75rem",
            letterSpacing: "0.35em",
            color: RED,
            textTransform: "uppercase",
            marginBottom: "1.2rem",
            border: `1px solid ${RED}`,
            padding: "0.35rem 1.2rem",
            borderRadius: "2px",
          }}
        >
          Full-Stack Developer
        </motion.span>

        {/* NAME with web strands */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.15em",
            marginBottom: "0.5rem",
          }}
        >
          {NAME_LETTERS.map((letter, i) => (
            <motion.div
              key={i}
              initial={{ y: -300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 1.6 + i * 0.12,
                duration: 0.8,
                type: "spring",
                stiffness: 120,
                damping: 12,
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transformOrigin: "top center",
              }}
            >
              {/* Web strand */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 1.5 + i * 0.12, duration: 0.5 }}
                style={{
                  width: "1px",
                  height: "48px",
                  background: `linear-gradient(to bottom, transparent, ${WEB_WHITE}55, ${WEB_WHITE})`,
                  transformOrigin: "top",
                  marginBottom: "4px",
                }}
              />
              {/* Letter — swinging pendulum effect */}
              <motion.span
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, (i % 2 === 0 ? 6 : -6), (i % 2 === 0 ? -4 : 4), (i % 2 === 0 ? 2 : -2), 0] }}
                transition={{
                  delay: 2.2 + i * 0.1,
                  duration: 2.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                  repeatDelay: 1 + i * 0.3,
                }}
                style={{
                  fontFamily: "var(--font-orbitron, 'Orbitron', sans-serif)",
                  fontSize: "clamp(3.5rem, 10vw, 7rem)",
                  fontWeight: 900,
                  color: WEB_WHITE,
                  lineHeight: 1,
                  textShadow: `0 0 30px ${RED}66, 0 0 60px ${RED}33`,
                  display: "inline-block",
                  transformOrigin: "top center",
                }}
              >
                {letter}
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Red gradient underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.4, duration: 0.8, ease: "easeOut" }}
          style={{
            width: "clamp(180px, 50vw, 280px)",
            height: "3px",
            background: `linear-gradient(90deg, transparent, ${RED}, ${DARK_RED}, transparent)`,
            marginBottom: "1.5rem",
            transformOrigin: "center",
          }}
        />

        {/* Typewriter subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.6 }}
          style={{
            fontFamily: "var(--font-inter, 'Inter', sans-serif)",
            fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
            color: `${WEB_WHITE}cc`,
            minHeight: "1.8em",
            marginBottom: "2.5rem",
            maxWidth: "600px",
          }}
        >
          {subtitle}
          <span
            style={{
              display: "inline-block",
              width: "2px",
              height: "1.1em",
              background: RED,
              marginLeft: "2px",
              verticalAlign: "text-bottom",
              animation: "blink 1s step-end infinite",
            }}
          />
          <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 0.6 }}
          style={{
            display: "flex",
            gap: "1.2rem",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "3rem",
          }}
        >
          {/* VIEW PROJECTS — outline */}
          <button
            onClick={() => handleCTA("projects")}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = `${RED}18`;
              (e.currentTarget as HTMLButtonElement).style.borderColor = RED;
              (e.currentTarget as HTMLButtonElement).style.color = RED;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.borderColor = WEB_WHITE;
              (e.currentTarget as HTMLButtonElement).style.color = WEB_WHITE;
            }}
            style={{
              fontFamily: "var(--font-orbitron, 'Orbitron', sans-serif)",
              fontSize: "clamp(0.65rem, 2vw, 0.8rem)",
              letterSpacing: "0.15em",
              padding: "clamp(0.6rem, 2vw, 0.85rem) clamp(1.2rem, 4vw, 2rem)",
              border: `2px solid ${WEB_WHITE}`,
              borderRadius: "3px",
              background: "transparent",
              color: WEB_WHITE,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            VIEW PROJECTS
          </button>

          {/* CONTACT ME — filled */}
          <button
            onClick={() => handleCTA("contact")}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = DARK_RED;
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 6px 25px ${RED}55`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = RED;
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 20px ${RED}44`;
            }}
            style={{
              fontFamily: "var(--font-orbitron, 'Orbitron', sans-serif)",
              fontSize: "clamp(0.65rem, 2vw, 0.8rem)",
              letterSpacing: "0.15em",
              padding: "clamp(0.6rem, 2vw, 0.85rem) clamp(1.2rem, 4vw, 2rem)",
              border: `2px solid ${RED}`,
              borderRadius: "3px",
              background: RED,
              color: WEB_WHITE,
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: `0 4px 20px ${RED}44`,
            }}
          >
            CONTACT ME
          </button>
        </motion.div>

        {/* Telemetry strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.4, duration: 0.8 }}
          style={{
            display: "flex",
            gap: "clamp(1rem, 4vw, 2.5rem)",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "clamp(0.6rem, 2vw, 1rem) clamp(1rem, 3vw, 2rem)",
            background: `${WEB_WHITE}06`,
            border: `1px solid ${WEB_WHITE}10`,
            borderRadius: "4px",
            backdropFilter: "blur(6px)",
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.2rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-orbitron, 'Orbitron', sans-serif)",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: RED,
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-orbitron, 'Orbitron', sans-serif)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  color: `${WEB_WHITE}88`,
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
