"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { playWebShoot } from "@/utils/playWebShoot";

/* ── colour palette ── */
const COLORS = ["#FFD700", "#E23636", "#FF6B35", "#9747FF", "#FF3366", "#C0C0C0"];

/* ── achievement data ── */
const ACHIEVEMENTS = [
  {
    id: "A01",
    year: "2024",
    icon: "\uD83D\uDCDC",
    title: "NPTEL Java Certification",
    org: "NPTEL",
    desc: "Earned NPTEL Certification in Java Programming, demonstrating strong fundamentals in core Java and problem-solving.",
  },
  {
    id: "A02",
    year: "2024",
    icon: "\uD83C\uDFAF",
    title: "Event Coordinator & Leader",
    org: "College",
    desc: "Successfully coordinated 10+ events, including a National Symposium, showcasing leadership and organizational skills.",
  },
  {
    id: "A03",
    year: "2024",
    icon: "\uD83C\uDFC6",
    title: "Competition Achiever",
    org: "Inter-College",
    desc: "Actively participated in multiple inter-college competitions such as Debates, Ideathons, and Hackathons, securing prize-winning positions.",
  },
  {
    id: "A04",
    year: "2024",
    icon: "\uD83D\uDCBB",
    title: "Full-Stack Development Course",
    org: "Hejex Technology",
    desc: "Completed a Full-Stack Development Course from Hejex Technology, gaining hands-on experience in modern web technologies.",
  },
  {
    id: "A05",
    year: "2024",
    icon: "\uD83D\uDE80",
    title: "Startup India Conferences",
    org: "Startup India",
    desc: "Attended 3+ National Conferences organized by Startup India, expanding knowledge in innovation and entrepreneurship.",
  },
  {
    id: "A06",
    year: "2024",
    icon: "\u26A1",
    title: "Neurostack \u2014 1+ Year Experience",
    org: "Neurostack (Startup)",
    desc: "Working more than 1 year of professional experience at Neurostack, contributing to real-world projects and startup ecosystem growth.",
  },
];

/* ── web-visualization helpers ── */
const CX = 250;
const CY = 250;
const RINGS = [60, 120, 180, 230];
const SPOKE_ANGLES = Array.from({ length: 8 }, (_, i) => (Math.PI * 2 * i) / 8);

function ringPoint(ring: number, spoke: number) {
  const r = RINGS[ring];
  const a = SPOKE_ANGLES[spoke];
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
}

function octagonPath(ring: number) {
  return SPOKE_ANGLES.map((_, i) => {
    const { x, y } = ringPoint(ring, i);
    return `${i === 0 ? "M" : "L"}${x},${y}`;
  }).join(" ") + " Z";
}

const NODE_POSITIONS = [
  ringPoint(3, 0),
  ringPoint(3, 1),
  ringPoint(2, 3),
  ringPoint(3, 4),
  ringPoint(2, 5),
  ringPoint(3, 7),
];

/* ── modal ── */
function Modal({
  achievement,
  color,
  onClose,
}: {
  achievement: (typeof ACHIEVEMENTS)[number];
  color: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ backdropFilter: "blur(10px)", background: "rgba(0,0,0,0.7)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-md rounded-2xl border overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #111119 0%, #1a1a2e 100%)",
          borderColor: color + "44",
        }}
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 22, stiffness: 260 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* corner accent — top-left */}
        <div
          className="pointer-events-none absolute top-0 left-0 h-16 w-16"
          style={{
            borderTop: `2px solid ${color}`,
            borderLeft: `2px solid ${color}`,
            borderTopLeftRadius: "1rem",
          }}
        />
        {/* corner accent — bottom-right */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-16 w-16"
          style={{
            borderBottom: `2px solid ${color}`,
            borderRight: `2px solid ${color}`,
            borderBottomRightRadius: "1rem",
          }}
        />

        {/* close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-white/50 hover:text-white transition-colors cursor-pointer z-10"
        >
          &times;
        </button>

        <div className="p-10 pl-12">
          {/* icon */}
          <div className="text-4xl mb-4">{achievement.icon}</div>

          {/* id & year */}
          <div className="flex items-center gap-3 mb-2">
            <span
              className="text-xs font-mono tracking-widest px-2 py-0.5 rounded"
              style={{ background: color + "22", color }}
            >
              {achievement.id}
            </span>
            <span className="text-xs text-white/40 font-mono">{achievement.year}</span>
          </div>

          {/* title */}
          <h3 className="text-xl font-bold text-white mb-1">{achievement.title}</h3>

          {/* org */}
          <p className="text-sm font-medium mb-4" style={{ color }}>
            {achievement.org}
          </p>

          {/* animated gradient divider */}
          <motion.div
            className="h-[2px] rounded-full mb-4"
            style={{
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          {/* description */}
          <p className="text-[15px] leading-relaxed text-white/70">{achievement.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── main section ── */
export default function AchievementsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section
      id="achievements"
      ref={ref}
      className="relative min-h-screen py-28 overflow-hidden"
      style={{ background: "#0b0b16" }}
    >
      {/* radial glow overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(226,54,54,0.08) 0%, transparent 70%)",
        }}
      />

      {/* inline keyframes */}
      <style>{`
        @keyframes spider-crawl {
          0%   { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
        @keyframes web-pulse {
          0%, 100% { opacity: 0.25; }
          50%      { opacity: 0.55; }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* header */}
        <motion.div
          className="mb-20 flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="hidden sm:block h-[2px] w-16 bg-red-600 rounded-full" />
          <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            WEB OF ACCOMPLISHMENTS
          </h2>
          <span className="hidden sm:block h-[2px] w-16 bg-red-600 rounded-full" />
        </motion.div>

        {/* SVG web visualization */}
        <motion.div
          className="mx-auto mb-16 flex justify-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <svg
            viewBox="-40 -40 580 580"
            width="500"
            height="500"
            className="w-full max-w-[500px]"
            style={{ overflow: "visible" }}
          >
            {/* octagon rings */}
            {RINGS.map((_, ri) => (
              <path
                key={ri}
                d={octagonPath(ri)}
                fill="none"
                stroke="#E23636"
                strokeWidth={ri === 0 ? 1.2 : 0.7}
                opacity={0.2}
                style={{ animation: "web-pulse 4s ease-in-out infinite", animationDelay: `${ri * 0.4}s` }}
              />
            ))}

            {/* spokes */}
            {SPOKE_ANGLES.map((a, i) => {
              const outer = RINGS[RINGS.length - 1];
              return (
                <line
                  key={i}
                  x1={CX}
                  y1={CY}
                  x2={CX + outer * Math.cos(a)}
                  y2={CY + outer * Math.sin(a)}
                  stroke="#E23636"
                  strokeWidth={0.7}
                  opacity={0.18}
                />
              );
            })}

            {/* center dot */}
            <circle cx={CX} cy={CY} r={4} fill="#E23636" opacity={0.6} />

            {/* achievement nodes */}
            {NODE_POSITIONS.map((pos, i) => (
              <g
                key={i}
                className="cursor-pointer"
                onClick={() => {
                  playWebShoot();
                  setSelected(i);
                }}
              >
                {/* glow */}
                <circle cx={pos.x} cy={pos.y} r={28} fill={COLORS[i]} opacity={0.08} />
                {/* outer ring */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={22}
                  fill="none"
                  stroke={COLORS[i]}
                  strokeWidth={1.5}
                  opacity={0.5}
                />
                {/* inner fill */}
                <circle cx={pos.x} cy={pos.y} r={18} fill="#111119" />
                {/* icon */}
                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={16}
                >
                  {ACHIEVEMENTS[i].icon}
                </text>
              </g>
            ))}

            {/* crawling spider */}
            <text
              fontSize={18}
              style={{
                offsetPath: `path('${octagonPath(2)}')`,
                animation: "spider-crawl 20s linear infinite",
              }}
            >
              🕷️
            </text>
          </svg>
        </motion.div>

        {/* achievement legend grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.button
              key={a.id}
              className="group relative rounded-xl border p-4 text-left transition-colors hover:border-opacity-60 cursor-pointer"
              style={{
                background: "#111119",
                borderColor: COLORS[i] + "33",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              whileHover={{
                scale: 1.03,
                borderColor: COLORS[i] + "88",
                boxShadow: `0 0 20px ${COLORS[i]}22`,
              }}
              onClick={() => {
                playWebShoot();
                setSelected(i);
              }}
            >
              <div className="text-2xl mb-2">{a.icon}</div>
              <span
                className="text-[10px] font-mono tracking-widest px-1.5 py-0.5 rounded"
                style={{ background: COLORS[i] + "18", color: COLORS[i] }}
              >
                {a.id}
              </span>
              <h4 className="mt-2 text-sm font-semibold text-white leading-tight line-clamp-2">
                {a.title}
              </h4>
              <p className="mt-1 text-xs text-white/40">{a.org}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* modal */}
      <AnimatePresence>
        {selected !== null && (
          <Modal
            achievement={ACHIEVEMENTS[selected]}
            color={COLORS[selected]}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
