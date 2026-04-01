"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { playWebShoot } from "@/utils/playWebShoot";

const RED = "#E23636";
const CARD_ACCENTS = ["#E23636", "#1E90FF", "#FFB020", "#A855F7", "#10B981", "#F43F5E"];

const projects = [
  {
    id: "01",
    title: "EMS — Frontend",
    subtitle: "Frontend · React",
    description:
      "Developed a responsive frontend for an Employee Management System using HTML, CSS, and React (Vite), focusing on clean UI design and efficient component-based architecture.",
    tech: ["HTML", "CSS", "React", "Vite"],
    status: "completed",
  },
  {
    id: "02",
    title: "EMS — Backend",
    subtitle: "Backend · Django",
    description:
      "Built the backend using Django with RESTful APIs to handle employee data, authentication, and system operations.",
    tech: ["Python", "Django", "REST API"],
    status: "completed",
  },
  {
    id: "03",
    title: "Tempy — Temp File Manager",
    subtitle: "Desktop App · Python",
    description:
      "Created a desktop application using Python (Tkinter) that helps manage temporary files efficiently, improving system cleanup and storage optimization.",
    tech: ["Python", "Tkinter"],
    status: "completed",
  },
  {
    id: "04",
    title: "Chime Website Recreation",
    subtitle: "Frontend · Web Design",
    description:
      "Recreated the Chime website UI for educational purposes, focusing on layout structuring, responsiveness, and modern frontend practices.",
    tech: ["HTML", "CSS", "JavaScript"],
    status: "completed",
  },
  {
    id: "05",
    title: "Personal Portfolio",
    subtitle: "Full-Stack · Next.js",
    description:
      "Designed and developed a modern, responsive portfolio using HTML, Tailwind CSS, and Next.js, showcasing projects, skills, and interactive UI experiences.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    status: "completed",
  },
  {
    id: "06",
    title: "Gym Management App",
    subtitle: "Full-Stack · In Development",
    description:
      "Currently developing a gym management system to handle memberships, workout tracking, and user management with a focus on scalability and user-friendly design.",
    tech: ["React", "Node.js", "MongoDB"],
    status: "in-progress",
  },
];

function ProjectCard({
  project,
  index,
  isVisible,
}: {
  project: (typeof projects)[number];
  index: number;
  isVisible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 20,
        delay: index * 0.1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        borderColor: hovered ? `${accent}44` : "rgba(255,255,255,0.06)",
        boxShadow: hovered ? `0 0 30px ${accent}15` : "none",
      }}
    >
      {/* Top accent gradient line */}
      <div
        style={{
          height: 2,
          background: `linear-gradient(90deg, ${accent}, transparent)`,
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Scan line on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ top: 0, opacity: 0 }}
            animate={{ top: "100%", opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "linear" }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        )}
      </AnimatePresence>

      <div style={{ padding: "24px 24px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header row: ID and arrow */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 14,
              letterSpacing: 2,
              color: accent,
            }}
          >
            {project.id}
          </span>
          <motion.span
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ color: "rgba(255,255,255,0.3)", fontSize: 18 }}
          >
            &#8599;
          </motion.span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 22,
            letterSpacing: 1,
            color: "#fff",
            margin: 0,
            marginBottom: 4,
          }}
        >
          {project.title}
        </h3>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 12,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            margin: 0,
            marginBottom: 14,
          }}
        >
          {project.subtitle}
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.5)",
            margin: 0,
            marginBottom: 18,
            flex: 1,
          }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 11,
                letterSpacing: 1,
                padding: "4px 10px",
                borderRadius: 6,
                background: hovered ? `${accent}18` : "rgba(255,255,255,0.05)",
                color: hovered ? accent : "rgba(255,255,255,0.4)",
                border: `1px solid ${hovered ? `${accent}30` : "rgba(255,255,255,0.08)"}`,
                transition: "all 0.3s ease",
                textTransform: "uppercase",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Bottom section: GitHub link + Status badge */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 16,
          }}
        >
          <motion.a
            href="https://github.com/repos"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playWebShoot()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              fontSize: 11,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = accent)}
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)")
            }
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ opacity: 0.7 }}
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </motion.a>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background:
                  project.status === "completed" ? "#10B981" : "#FFB020",
                display: "inline-block",
                animation:
                  project.status === "in-progress"
                    ? "pulse-dot 1.5s ease-in-out infinite"
                    : "none",
              }}
            />
            <span
              style={{
                fontSize: 10,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color:
                  project.status === "completed"
                    ? "rgba(16,185,129,0.7)"
                    : "rgba(255,176,32,0.7)",
              }}
            >
              {project.status === "completed" ? "COMPLETED" : "IN PROGRESS"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [sequence, setSequence] = useState(false);

  useEffect(() => {
    if (isInView) {
      setSequence(true);
    }
  }, [isInView]);

  return (
    <>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }
      `}</style>

      <section
        id="projects"
        ref={sectionRef}
        style={{
          background: "#0a0a14",
          padding: "100px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "88%",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={sequence ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: 60 }}
          >
            <span
              style={{
                display: "inline-block",
                fontSize: 14,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: RED,
                marginBottom: 16,
                fontFamily: "var(--font-orbitron, 'Orbitron', sans-serif)",
              }}
            >
              What I&apos;ve Built
            </span>
            <h2
              style={{
                fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)",
                fontSize: "clamp(3.5rem, 8vw, 6rem)",
                letterSpacing: 4,
                color: "#fff",
                margin: 0,
                marginBottom: 16,
                lineHeight: 1,
              }}
            >
              Projects
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.45)",
                maxWidth: 550,
                margin: "0 auto",
              }}
            >
              A collection of projects that showcase my skills, creativity, and passion for building
              impactful digital experiences.
            </p>
          </motion.div>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 28,
            }}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isVisible={sequence}
              />
            ))}
          </div>

          {/* Bottom divider with label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={sequence ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 60,
            }}
          >
            <div
              style={{
                flex: 1,
                height: 1,
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1))",
              }}
            />
            <span
              style={{
                fontSize: 11,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                fontFamily: "'Bebas Neue', sans-serif",
              }}
            >
              6 PROJECTS
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)",
              }}
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
