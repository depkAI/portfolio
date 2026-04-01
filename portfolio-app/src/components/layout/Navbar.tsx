"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playWebShoot } from "@/utils/playWebShoot";

const RED = "#E23636";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(navLinks[i].href.slice(1));
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(navLinks[i].label);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string, label: string) => {
    setActive(label);
    setMenuOpen(false);
    playWebShoot();
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a14]/90 backdrop-blur-xl shadow-lg shadow-black/30"
            : "bg-transparent"
        }`}
        style={{
          borderBottom: scrolled ? "1px solid rgba(226,54,54,0.1)" : "1px solid transparent",
        }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-20 lg:px-28 flex items-center justify-between h-16">

          {/* Logo */}
          <motion.a
            href="#home"
            onClick={() => handleNav("#home", "Home")}
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${RED}, #B52020)`,
                boxShadow: `0 0 16px rgba(226,54,54,0.3)`,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 100 100" fill="none">
                <ellipse cx="50" cy="52" rx="9" ry="12" fill="#fff" />
                <circle cx="50" cy="37" r="5.5" fill="#fff" />
                <path d="M59 45 Q70 40,82 25" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                <path d="M59 52 Q72 50,86 44" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                <path d="M59 57 Q72 59,86 66" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                <path d="M59 62 Q70 68,82 80" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                <path d="M41 45 Q30 40,18 25" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                <path d="M41 52 Q28 50,14 44" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                <path d="M41 57 Q28 59,14 66" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                <path d="M41 62 Q30 68,18 80" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <span
              className="text-sm font-bold tracking-[0.3em] hidden sm:block"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              <span style={{ color: RED }}>D</span>
              <span style={{
                background: "linear-gradient(180deg, #fff 0%, #C0C0C0 60%, #8A8A8A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>EEP</span>
              <span style={{ color: RED }}>AK</span>
            </span>
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.button
                key={link.label}
                onClick={() => handleNav(link.href, link.label)}
                className="relative px-4 py-2 text-[11px] tracking-[0.2em] cursor-pointer"
                style={{
                  fontFamily: "var(--font-orbitron)",
                  color: active === link.label ? "#fff" : "#8A8A8A",
                  background: "transparent",
                  border: "none",
                }}
                whileHover={{ color: "#fff" }}
              >
                {link.label.toUpperCase()}
                {active === link.label && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
                    style={{ background: RED, width: "60%" }}
                    layoutId="nav-underline"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none" }}
          >
            <motion.span className="block w-5 h-[2px] bg-white" animate={menuOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }} />
            <motion.span className="block w-5 h-[2px] bg-white" animate={{ opacity: menuOpen ? 0 : 1 }} />
            <motion.span className="block w-5 h-[2px] bg-white" animate={menuOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center"
            style={{ background: "rgba(10,10,20,0.95)", backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => handleNav(link.href, link.label)}
                  className="text-xl tracking-[0.3em] cursor-pointer"
                  style={{
                    fontFamily: "var(--font-orbitron)",
                    color: active === link.label ? RED : "#8A8A8A",
                    background: "none",
                    border: "none",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ color: "#fff" }}
                >
                  {link.label.toUpperCase()}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
