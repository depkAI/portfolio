"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WEB_DIRECTIONS = [
  { angle: 0, label: "right" },
  { angle: 45, label: "bottom-right" },
  { angle: 90, label: "down" },
  { angle: 135, label: "bottom-left" },
  { angle: 180, label: "left" },
  { angle: 225, label: "top-left" },
  { angle: 270, label: "up" },
  { angle: 315, label: "top-right" },
];

function SpiderSVG({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="50" rx="10" ry="14" fill="#E23636" />
      <circle cx="50" cy="32" r="7" fill="#E23636" />
      <path d="M60 44 Q72 38, 85 20" stroke="#E23636" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M60 48 Q75 46, 90 40" stroke="#E23636" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M60 54 Q75 56, 90 62" stroke="#E23636" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M60 58 Q72 64, 85 82" stroke="#E23636" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 44 Q28 38, 15 20" stroke="#E23636" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 48 Q25 46, 10 40" stroke="#E23636" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 54 Q25 56, 10 62" stroke="#E23636" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 58 Q28 64, 15 82" stroke="#E23636" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function LoadingScreen() {
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [thwip, setThwip] = useState(false);
  const [show, setShow] = useState(true);
  const progressRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleEnter = useCallback(() => {
    try {
      const audio = new Audio("/audio/great power comes great responsibility.mp3");
      audio.volume = 0.85;
      audioRef.current = audio;
    } catch {
      // Audio not available
    }
    setStarted(true);
  }, []);

  useEffect(() => {
    if (!started) return;

    const startTime = Date.now();
    const duration = 1500;
    let raf: number;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(elapsed / duration, 1);
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      progressRef.current = Math.floor(eased * 100);
      setProgress(progressRef.current);

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        progressRef.current = 100;
        setProgress(100);
        setTimeout(() => {
          setThwip(true);
          audioRef.current?.play().catch(() => {});
          setTimeout(() => setShow(false), 300);
        }, 50);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started]);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#0a0a14" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-grid opacity-[0.06] pointer-events-none" />

          {!started && (
            <motion.div
              className="relative z-30 flex flex-col items-center gap-8 select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SpiderSVG size={90} />
              <div className="text-center">
                <p
                  className="text-[10px] tracking-[0.4em] text-[#8A8A8A] mb-6"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  IDENTIFY YOURSELF, CITIZEN
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEnter();
                  }}
                  className="flex flex-col items-center gap-4"
                >
                  <input
                    type="text"
                    placeholder="Enter your name..."
                    autoFocus
                    required
                    className="text-center text-sm text-white placeholder-[#555] outline-none"
                    style={{
                      fontFamily: "var(--font-orbitron)",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(226,54,54,0.3)",
                      borderRadius: 6,
                      padding: "12px 24px",
                      width: 280,
                      letterSpacing: "0.1em",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(226,54,54,0.6)";
                      e.currentTarget.style.boxShadow = "0 0 20px rgba(226,54,54,0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(226,54,54,0.3)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                  <motion.button
                    type="submit"
                    className="px-8 py-3 rounded cursor-pointer"
                    style={{
                      border: "1px solid rgba(226,54,54,0.4)",
                      background: "rgba(226,54,54,0.06)",
                      fontFamily: "var(--font-orbitron)",
                    }}
                    animate={{
                      boxShadow: [
                        "0 0 10px rgba(226,54,54,0.1)",
                        "0 0 25px rgba(226,54,54,0.3)",
                        "0 0 10px rgba(226,54,54,0.1)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    whileHover={{
                      background: "rgba(226,54,54,0.12)",
                      borderColor: "rgba(226,54,54,0.7)",
                    }}
                  >
                    <span className="text-[11px] tracking-[0.3em] text-[#E23636]">
                      ENTER THE WEB
                    </span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}

          {started && (
            <>
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={`ring-${i}`}
                  className="absolute rounded-full border pointer-events-none"
                  style={{
                    borderColor: "#E23636",
                    width: 80,
                    height: 80,
                    left: "50%",
                    top: "50%",
                    marginLeft: -40,
                    marginTop: -40,
                  }}
                  animate={{
                    scale: [1, 6 + i * 2],
                    opacity: [0.6, 0],
                    borderWidth: ["2px", "0.5px"],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.4,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              ))}

              {WEB_DIRECTIONS.map((dir, i) => {
                const strandLength = Math.min(progress / 100, 1);
                const radians = (dir.angle * Math.PI) / 180;
                const maxLen = 600;
                const len = strandLength * maxLen;
                const x2 = Math.cos(radians) * len;
                const y2 = Math.sin(radians) * len;

                return (
                  <motion.svg
                    key={dir.label}
                    className="absolute pointer-events-none"
                    style={{ left: "50%", top: "50%", overflow: "visible", width: 1, height: 1 }}
                  >
                    <motion.line
                      x1={0} y1={0} x2={x2} y2={y2}
                      stroke="#F0F0F0"
                      strokeWidth={1}
                      strokeOpacity={0.25 + strandLength * 0.3}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.0, delay: i * 0.06, ease: "easeOut" }}
                    />
                  </motion.svg>
                );
              })}

              <motion.div
                className="relative z-10"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "backOut" }}
              >
                <SpiderSVG size={80} />
              </motion.div>

              <motion.div
                className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-[#8A8A8A] text-xs tracking-[0.3em] mb-2" style={{ fontFamily: "var(--font-orbitron)" }}>
                  SPIDER-SENSE TINGLING
                </p>
                <div className="w-48 h-[2px] bg-[#1a1a2e] mx-auto rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #E23636, #B52020)",
                      boxShadow: "0 0 12px rgba(226,54,54,0.6)",
                      width: `${progress}%`,
                    }}
                    transition={{ duration: 0.05 }}
                  />
                </div>
                <p className="text-[#E23636] text-sm mt-2 tracking-widest" style={{ fontFamily: "var(--font-orbitron)" }}>
                  {progress}%
                </p>
              </motion.div>

              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={thwip ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
              >
                <span
                  className="font-black tracking-widest"
                  style={{
                    fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)",
                    fontSize: "clamp(8rem, 25vw, 22rem)",
                    color: "#E23636",
                    textShadow: "0 0 60px rgba(226,54,54,0.8), 0 0 120px rgba(226,54,54,0.4)",
                    lineHeight: 1,
                  }}
                >
                  THWIP!
                </span>
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
