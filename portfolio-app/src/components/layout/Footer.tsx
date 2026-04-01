"use client";
import { motion } from "framer-motion";
import { playWebShoot } from "@/utils/playWebShoot";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "GitHub", abbr: "GH", href: "https://github.com/depkAI" },
  { label: "LinkedIn", abbr: "LI", href: "https://www.linkedin.com/in/deepak-s-06a56b291/" },
];

export default function Footer() {
  return (
    <footer className="relative" style={{ background: "#0a0a14" }}>
      <div
        className="h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent 5%, rgba(226,54,54,0.4) 20%, rgba(226,54,54,0.9) 50%, rgba(226,54,54,0.4) 80%, transparent 95%)",
          boxShadow: "0 0 15px rgba(226,54,54,0.3)",
        }}
      />

      <div className="px-6" style={{ maxWidth: 1100, margin: "0 auto", paddingTop: 60, paddingBottom: 48 }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "clamp(24px, 6vw, 48px)" }}>
          <div style={{ flex: "0 1 auto", minWidth: "min(100%, 280px)" }}>
            <motion.div
              className="font-bold tracking-[0.35em] text-2xl mb-5"
              style={{ fontFamily: "var(--font-orbitron)" }}
              whileHover={{ scale: 1.05 }}
            >
              <span style={{ color: "#E23636" }}>D</span>
              <span style={{
                background: "linear-gradient(180deg, #fff 0%, #C0C0C0 60%, #8A8A8A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>EEP</span>
              <span style={{ color: "#E23636" }}>AK</span>
            </motion.div>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#777", marginBottom: 20 }}>
              Full-stack developer crafting web experiences with creativity and precision.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {socialLinks.map((s) => (
                <motion.a
                  key={s.abbr}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontFamily: "var(--font-orbitron)", color: "#777",
                    border: "1px solid rgba(226,54,54,0.25)", borderRadius: 6,
                  }}
                  whileHover={{ color: "#E23636", borderColor: "rgba(226,54,54,0.6)", boxShadow: "0 0 12px rgba(226,54,54,0.25)" }}
                >
                  {s.abbr}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: "var(--font-orbitron)", fontSize: 12, letterSpacing: "0.3em", color: "#E23636", marginBottom: 24, textTransform: "uppercase" }}>
              Quick Links
            </h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {quickLinks.map((link) => (
                <li key={link.label} style={{ listStyle: "none" }}>
                  <motion.a
                    href={link.href}
                    onClick={() => playWebShoot()}
                    style={{ fontSize: 15, color: "#777", textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}
                    whileHover={{ x: 5, color: "#fff" }}
                    transition={{ duration: 0.2 }}
                  >
                    <span style={{ width: 8, height: 1, background: "rgba(226,54,54,0.5)", flexShrink: 0 }} />
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: "var(--font-orbitron)", fontSize: 12, letterSpacing: "0.3em", color: "#E23636", marginBottom: 24, textTransform: "uppercase" }}>
              Get In Touch
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <a href="mailto:deepak29092005@gmail.com" style={{ fontSize: 15, color: "#777", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#777")}
              >deepak29092005@gmail.com</a>
              <a href="https://www.linkedin.com/in/deepak-s-06a56b291/" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 15, color: "#777", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#777")}
              >linkedin.com/in/deepak-s-06a56b291</a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: 1, maxWidth: 1100, margin: "0 auto", background: "linear-gradient(90deg, transparent, rgba(226,54,54,0.2) 30%, rgba(226,54,54,0.35) 50%, rgba(226,54,54,0.2) 70%, transparent)" }} />

      <div style={{ padding: "24px 24px 28px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-orbitron)", fontSize: 11, letterSpacing: "0.35em", color: "rgba(138,138,138,0.6)", marginBottom: 8 }}>
          WITH GREAT POWER COMES GREAT RESPONSIBILITY
        </p>
        <p style={{ fontSize: 13, color: "rgba(138,138,138,0.35)" }}>
          &copy; {new Date().getFullYear()} Deepak &middot; Built with Next.js &middot; Framer Motion &middot; Spider Power
        </p>
      </div>
    </footer>
  );
}
