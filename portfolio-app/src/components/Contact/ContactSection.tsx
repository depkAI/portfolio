"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playWebShoot } from "@/utils/playWebShoot";

const RED = "#E23636";

function HangingSpiderman({ revealed }: { revealed: boolean }) {
  return (
    <div
      style={{
        width: "clamp(200px, 80vw, 300px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        margin: "0 auto",
      }}
    >
      {/* Web strand */}
      <motion.div
        initial={{ height: 0 }}
        animate={revealed ? { height: 120 } : { height: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          width: 2,
          background: "linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.15))",
          transformOrigin: "top center",
        }}
      />

      {/* Spider-Man image swinging */}
      <motion.img
        src="/spiderman.png"
        alt="Spider-Man"
        initial={{ opacity: 0, scale: 0 }}
        animate={
          revealed
            ? { opacity: 1, scale: 1, rotate: [0, 8, -8, 5, -5, 0] }
            : { opacity: 0, scale: 0 }
        }
        transition={{
          opacity: { duration: 0.4, delay: 0.6 },
          scale: { duration: 0.4, delay: 0.6 },
          rotate: {
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 1,
          },
        }}
        style={{
          width: "clamp(150px, 50vw, 220px)",
          height: "clamp(150px, 50vw, 220px)",
          objectFit: "contain",
          transformOrigin: "top center",
          filter: "drop-shadow(0 0 30px rgba(226, 54, 54, 0.4))",
          userSelect: "none",
        }}
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          color: RED,
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 14,
          letterSpacing: 2,
          marginTop: 16,
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        Your Friendly Neighbourhood
      </motion.p>
    </div>
  );
}

export default function ContactSection() {
  const [revealed, setRevealed] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playWebShoot();
    setSending(true);
    setError("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "4200dacd-71e8-46ac-b0b1-66bf35477dcb",
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio Contact from ${form.name}`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        setError("Failed to send. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleReveal = () => {
    setRevealed(true);
    const audio = new Audio("/audio/friendly-neighborhood.mp3");
    audio.play().catch(() => {});
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    color: "#fff",
    fontSize: 15,
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.3s",
  };

  return (
    <section
      id="contact"
      style={{
        background: "#0b0b16",
        minHeight: "100vh",
        padding: "80px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "92%",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              color: RED,
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 13,
              letterSpacing: 4,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Get In Touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.5rem, 10vw, 4rem)",
              color: "#fff",
              margin: 0,
              lineHeight: 1,
            }}
          >
            Contact
          </motion.h2>
        </div>

        {/* Two-column layout */}
        <div
          style={{
            display: "flex",
            gap: "clamp(24px, 6vw, 48px)",
            alignItems: "flex-start",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* LEFT SIDE */}
          <div
            style={{
              flex: "0 0 auto",
              display: "flex",
              justifyContent: "center",
              width: "100%",
              maxWidth: 300,
            }}
          >
            <AnimatePresence mode="wait">
              {!revealed ? (
                <motion.div
                  key="mystery-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  transition={{ duration: 0.5 }}
                  onClick={handleReveal}
                  style={{
                    width: "clamp(220px, 75vw, 280px)",
                    height: "clamp(300px, 80vw, 380px)",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 16,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  whileHover={{
                    borderColor: "rgba(226, 54, 54, 0.4)",
                    boxShadow: "0 0 40px rgba(226, 54, 54, 0.15)",
                  }}
                >
                  {/* Spider silhouette SVG */}
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 100 100"
                    fill="none"
                    style={{ marginBottom: 24, opacity: 0.6 }}
                  >
                    <ellipse cx="50" cy="40" rx="18" ry="14" fill={RED} />
                    <ellipse cx="50" cy="62" rx="24" ry="20" fill={RED} />
                    {/* Legs left */}
                    <path d="M26 52 Q10 30 2 20" stroke={RED} strokeWidth="2.5" fill="none" />
                    <path d="M28 58 Q8 50 0 50" stroke={RED} strokeWidth="2.5" fill="none" />
                    <path d="M28 66 Q8 70 0 80" stroke={RED} strokeWidth="2.5" fill="none" />
                    <path d="M30 72 Q16 88 8 98" stroke={RED} strokeWidth="2.5" fill="none" />
                    {/* Legs right */}
                    <path d="M74 52 Q90 30 98 20" stroke={RED} strokeWidth="2.5" fill="none" />
                    <path d="M72 58 Q92 50 100 50" stroke={RED} strokeWidth="2.5" fill="none" />
                    <path d="M72 66 Q92 70 100 80" stroke={RED} strokeWidth="2.5" fill="none" />
                    <path d="M70 72 Q84 88 92 98" stroke={RED} strokeWidth="2.5" fill="none" />
                  </svg>

                  <p
                    style={{
                      color: "#fff",
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 28,
                      letterSpacing: 3,
                      margin: 0,
                    }}
                  >
                    WHO&apos;S THERE?
                  </p>

                  <motion.p
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: 13,
                      marginTop: 12,
                      fontFamily: "'Orbitron', sans-serif",
                      letterSpacing: 1,
                    }}
                  >
                    Click to reveal
                  </motion.p>
                </motion.div>
              ) : (
                <motion.div
                  key="spiderman"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <HangingSpiderman revealed={revealed} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE */}
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                style={{ flex: 1 }}
              >
                {!sent ? (
                  <form onSubmit={handleSubmit}>
                    {/* Name + Email grid */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
                        gap: 16,
                        marginBottom: 16,
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Name"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        style={inputStyle}
                        onFocus={(e) =>
                          (e.currentTarget.style.borderColor = RED)
                        }
                        onBlur={(e) =>
                          (e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.1)")
                        }
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        style={inputStyle}
                        onFocus={(e) =>
                          (e.currentTarget.style.borderColor = RED)
                        }
                        onBlur={(e) =>
                          (e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.1)")
                        }
                      />
                    </div>

                    {/* Message textarea */}
                    <textarea
                      placeholder="Your message..."
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                        marginBottom: 24,
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = RED)
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.1)")
                      }
                    />

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      disabled={sending}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        width: "100%",
                        padding: "16px 32px",
                        background: sending
                          ? "rgba(226,54,54,0.4)"
                          : `linear-gradient(135deg, ${RED}, #b71c1c)`,
                        border: "none",
                        borderRadius: 10,
                        color: "#fff",
                        fontSize: 16,
                        fontFamily: "'Orbitron', sans-serif",
                        fontWeight: 700,
                        letterSpacing: 3,
                        cursor: sending ? "not-allowed" : "pointer",
                        textTransform: "uppercase",
                      }}
                    >
                      {sending ? "Sending..." : "SHOOT WEB"}
                    </motion.button>

                    {error && (
                      <p
                        style={{
                          color: RED,
                          fontSize: 14,
                          marginTop: 12,
                          textAlign: "center",
                        }}
                      >
                        {error}
                      </p>
                    )}

                    {/* Contact info links */}
                    <div
                      style={{
                        display: "flex",
                        gap: 32,
                        marginTop: 32,
                        flexWrap: "wrap",
                      }}
                    >
                      <a
                        href="mailto:deepak29092005@gmail.com"
                        style={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: 14,
                          textDecoration: "none",
                          transition: "color 0.3s",
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = RED)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color =
                            "rgba(255,255,255,0.6)")
                        }
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                        deepak29092005@gmail.com
                      </a>
                      <a
                        href="https://linkedin.com/in/deepak-s-06a56b291"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: 14,
                          textDecoration: "none",
                          transition: "color 0.3s",
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = RED)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color =
                            "rgba(255,255,255,0.6)")
                        }
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                        LinkedIn
                      </a>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      textAlign: "center",
                      padding: "60px 20px",
                    }}
                  >
                    <div
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${RED}, #b71c1c)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 24px",
                        fontSize: 48,
                      }}
                    >
                      🕷️
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 48,
                        color: "#fff",
                        margin: "0 0 12px",
                        letterSpacing: 3,
                      }}
                    >
                      WEB SENT!
                    </h3>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.6)",
                        fontSize: 16,
                        margin: 0,
                      }}
                    >
                      I&apos;ll swing by within 24 hours
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
