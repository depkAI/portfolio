"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import WebReveal from "@/components/ui/WebReveal";

/* ------------------------------------------------------------------ */
/*  CONSTANTS                                                         */
/* ------------------------------------------------------------------ */
const RED = "#E23636";

const SKILLS = [
  { name: "React / Next.js", percent: 85 },
  { name: "Python / Django", percent: 80 },
  { name: "JavaScript / TypeScript", percent: 85 },
  { name: "HTML / CSS / Tailwind", percent: 90 },
  { name: "Node.js", percent: 70 },
];

const STATS = [
  { value: "20+", label: "Projects" },
  { value: "1+", label: "Years Exp" },
  { value: "8.4", label: "CGPA" },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                         */
/* ------------------------------------------------------------------ */
export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [animatedPercents, setAnimatedPercents] = useState<number[]>(
    SKILLS.map(() => 0)
  );

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setAnimatedPercents(SKILLS.map((s) => Math.round(s.percent * ease)));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView]);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: "#0a0a14",
        minHeight: "100vh",
        padding: "80px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <WebReveal title="About Me" subtitle="Behind The Mask">
        {/* ---- Container ---- */}
        <div
          style={{
            width: "90%",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          {/* ---- Header ---- */}
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span
              style={{
                display: "inline-block",
                fontFamily: "Orbitron, sans-serif",
                fontSize: 12,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: RED,
                border: `1px solid ${RED}44`,
                padding: "6px 18px",
                borderRadius: 20,
                marginBottom: 16,
              }}
            >
              Identity Reveal
            </span>
            <h2
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
                color: "#fff",
                margin: 0,
                lineHeight: 1,
              }}
            >
              About Me
            </h2>
          </div>

          {/* ---- Two-Column Grid ---- */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
              gap: "clamp(24px, 6vw, 48px)",
            }}
            className="about-grid"
          >
            {/* ======== LEFT COLUMN ======== */}
            <div>
              {/* Avatar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  marginBottom: 28,
                }}
              >
                <div
                  style={{
                    width: "clamp(80px, 20vw, 120px)",
                    height: "clamp(80px, 20vw, 120px)",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${RED}, #1a1a2e)`,
                    border: `3px solid ${RED}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 48,
                    flexShrink: 0,
                  }}
                >
                  🕷️
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      fontSize: "clamp(1.5rem, 3vw, 2rem)",
                      color: "#fff",
                      margin: 0,
                      letterSpacing: 2,
                    }}
                  >
                    DEEPAK S
                  </h3>
                </div>
              </div>

              {/* Bio */}
              <p
                style={{
                  color: "#999",
                  fontSize: 14,
                  lineHeight: 1.75,
                  margin: "0 0 16px 0",
                }}
              >
                I&apos;m a passionate full-stack developer and Computer Science
                student who loves building clean, interactive web experiences.
                With a strong foundation in both frontend and backend
                technologies, I bring ideas to life through code.
              </p>
              <p
                style={{
                  color: "#999",
                  fontSize: 14,
                  lineHeight: 1.75,
                  margin: "0 0 32px 0",
                }}
              >
                When I&apos;m not coding, you&apos;ll find me exploring new
                technologies, participating in hackathons, or contributing to
                the tech community.
              </p>

              {/* Stats Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 12,
                }}
              >
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      background: `${RED}0a`,
                      border: `1px solid ${RED}22`,
                      borderRadius: 12,
                      padding: "18px 12px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Orbitron, sans-serif",
                        fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                        fontWeight: 700,
                        color: RED,
                        lineHeight: 1.2,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#888",
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        marginTop: 4,
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ======== RIGHT COLUMN ======== */}
            <div>
              {/* Skills */}
              <h4
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: 16,
                  color: RED,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  marginTop: 0,
                  marginBottom: 24,
                }}
              >
                Spider Powers
              </h4>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {SKILLS.map((skill, i) => (
                  <div key={skill.name}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          color: "#ccc",
                          fontSize: 13,
                          fontWeight: 500,
                        }}
                      >
                        {skill.name}
                      </span>
                      <span
                        style={{
                          color: RED,
                          fontSize: 13,
                          fontFamily: "Orbitron, sans-serif",
                        }}
                      >
                        {animatedPercents[i]}%
                      </span>
                    </div>
                    {/* Track */}
                    <div
                      style={{
                        width: "100%",
                        height: 8,
                        background: "#1a1a2e",
                        borderRadius: 4,
                        overflow: "hidden",
                      }}
                    >
                      {/* Fill */}
                      <div
                        style={{
                          width: `${animatedPercents[i]}%`,
                          height: "100%",
                          background: `linear-gradient(90deg, ${RED}, #ff6b6b)`,
                          borderRadius: 4,
                          transition: "width 0.05s linear",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div
                style={{
                  marginTop: 40,
                  background: `${RED}08`,
                  border: `1px solid ${RED}22`,
                  borderRadius: 12,
                  padding: "24px 28px",
                }}
              >
                <div
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: 11,
                    letterSpacing: 3,
                    color: RED,
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  EDUCATION
                </div>
                <div
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  B.E — CS &amp; Engineering
                </div>
                <div
                  style={{
                    color: "#888",
                    fontSize: 13,
                    marginBottom: 8,
                  }}
                >
                  Jeppiaar Engineering College · 2023–2027
                </div>
                <div
                  style={{
                    color: RED,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  CGPA: 8.4 / 10.0
                </div>
              </div>
            </div>
          </div>
        </div>
      </WebReveal>

      {/* ---- Responsive styles ---- */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
