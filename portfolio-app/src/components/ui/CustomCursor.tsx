"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        animate={{ x: pos.x - 6, y: pos.y - 6, scale: clicking ? 0.6 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{ width: 12, height: 12, borderRadius: "50%", background: "#E23636" }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        animate={{ x: pos.x - 20, y: pos.y - 20, scale: clicking ? 0.8 : 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(226,54,54,0.3)" }}
      />
    </>
  );
}
