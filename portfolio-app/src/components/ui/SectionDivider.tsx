"use client";
import { motion } from "framer-motion";

const RED = "#E23636";

export default function SectionDivider({ variant = "web" }: { variant?: "web" | "line" | "dots" }) {
  if (variant === "line") {
    return (
      <div className="relative" style={{ height: 80, background: "#0a0a14" }}>
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2" style={{ height: 1 }}>
          <div style={{ height: "100%", maxWidth: 600, margin: "0 auto", background: `linear-gradient(90deg, transparent, ${RED}40 30%, ${RED}80 50%, ${RED}40 70%, transparent)` }} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            style={{ width: 8, height: 8, background: RED, transform: "rotate(45deg)", boxShadow: `0 0 12px ${RED}60` }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className="relative flex items-center justify-center" style={{ height: 60, background: "#0a0a14" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ height: 1, width: 60, background: `linear-gradient(90deg, transparent, ${RED}30)` }} />
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              style={{ width: 4, height: 4, borderRadius: "50%", background: RED }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
          <div style={{ height: 1, width: 60, background: `linear-gradient(90deg, ${RED}30, transparent)` }} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ height: 100, overflow: "hidden", background: "#0a0a14" }}>
      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" width="200" height="80" viewBox="0 0 200 80" fill="none" style={{ opacity: 0.25 }}>
        <line x1="0" y1="40" x2="200" y2="40" stroke={RED} strokeWidth="0.5" />
        <line x1="100" y1="0" x2="100" y2="80" stroke={RED} strokeWidth="0.5" />
        <line x1="40" y1="10" x2="160" y2="70" stroke={RED} strokeWidth="0.5" />
        <line x1="160" y1="10" x2="40" y2="70" stroke={RED} strokeWidth="0.5" />
        <ellipse cx="100" cy="40" rx="30" ry="12" stroke={RED} strokeWidth="0.5" fill="none" />
        <ellipse cx="100" cy="40" rx="60" ry="24" stroke={RED} strokeWidth="0.5" fill="none" />
        <ellipse cx="100" cy="40" rx="90" ry="36" stroke={RED} strokeWidth="0.5" fill="none" />
      </svg>
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {"\u{1F577}\uFE0F"}
      </motion.div>
    </div>
  );
}
