import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Brain,
  Cloud,
  Code2,
  Database,
  Server,
  Wrench,
} from "lucide-react";

export const SKILL_ORBIT_CATEGORIES = [
  {
    id: "ai",
    title: "AI & GenAI",
    description: "Python, LangChain, LangGraph, RAG, OpenAI, Gemini, Mistral, Hugging Face",
    icon: Brain,
    accent: "#7C6CF0",
    slot: "top-left",
  },
  {
    id: "frontend",
    title: "Frontend Development",
    description: "React.js, JavaScript, HTML, CSS, Tailwind CSS, Vite",
    icon: Code2,
    accent: "#3B82F6",
    slot: "top-right",
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "FastAPI, Spring Boot, Node.js, Express.js, REST APIs, JWT",
    icon: Server,
    accent: "#0EA5E9",
    slot: "left",
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    description: "Docker, Azure, Render, Netlify, Vercel",
    icon: Cloud,
    accent: "#14B8A6",
    slot: "right",
  },
  {
    id: "databases",
    title: "Databases",
    description: "PostgreSQL, MongoDB, Pinecone, Qdrant, Weaviate",
    icon: Database,
    accent: "#F59E0B",
    slot: "bottom-left",
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    description: "Git, GitHub, Postman, Cursor, n8n",
    icon: Wrench,
    accent: "#EC4899",
    slot: "bottom-right",
  },
];

const SLOT_STYLES = {
  "top-left": "lg:left-[2%] lg:top-[6%] xl:left-[4%] xl:top-[8%]",
  "top-right": "lg:right-[2%] lg:top-[6%] xl:right-[4%] xl:top-[8%]",
  left: "lg:left-0 lg:top-[42%] xl:left-[1%]",
  right: "lg:right-0 lg:top-[42%] xl:right-[1%]",
  "bottom-left": "lg:left-[6%] lg:bottom-[4%] xl:left-[10%] xl:bottom-[6%]",
  "bottom-right": "lg:right-[6%] lg:bottom-[4%] xl:right-[10%] xl:bottom-[6%]",
};

const NODE_POSITIONS = {
  "top-left": { x: 28, y: 22 },
  "top-right": { x: 72, y: 22 },
  left: { x: 18, y: 50 },
  right: { x: 82, y: 50 },
  "bottom-left": { x: 30, y: 78 },
  "bottom-right": { x: 70, y: 78 },
};

function SkillCard({ category, active, onHover, index, reduceMotion }) {
  const Icon = category.icon;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, delay: 0.08 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => onHover(category.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(category.id)}
      onBlur={() => onHover(null)}
      tabIndex={0}
      className={`group relative z-20 w-full rounded-2xl border bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)] outline-none transition-all duration-300 lg:absolute lg:w-[min(240px,28%)] xl:w-[260px] ${SLOT_STYLES[category.slot]} ${
        active ? "-translate-y-1 shadow-[0_18px_40px_rgba(15,23,42,0.12)]" : "hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.1)]"
      }`}
      style={{
        borderColor: active
          ? `color-mix(in srgb, ${category.accent} 45%, #E2E8F0)`
          : "rgba(226, 232, 240, 0.95)",
      }}
      aria-label={`${category.title}: ${category.description}`}
    >
      <div className="flex items-start gap-3">
        <div
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: `color-mix(in srgb, ${category.accent} 14%, white)`,
            color: category.accent,
          }}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold tracking-tight text-slate-900">{category.title}</h3>
          <p className="mt-1.5 font-mono text-[11px] leading-5 text-slate-500 sm:text-[12px]">
            {category.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function TechOrbit({ categories = SKILL_ORBIT_CATEGORIES }) {
  const [activeId, setActiveId] = useState(null);
  const reduceMotion = useReducedMotion();
  const items = categories.length ? categories : SKILL_ORBIT_CATEGORIES;
  const active = items.find((item) => item.id === activeId);

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      {/* Mobile / tablet: hub + stacked cards */}
      <div className="flex flex-col items-center gap-8 lg:hidden">
        <OrbitHub reduceMotion={reduceMotion} pulse />
        <div className="grid w-full gap-3 sm:grid-cols-2">
          {items.map((category, index) => (
            <SkillCard
              key={category.id}
              category={category}
              index={index}
              active={activeId === category.id}
              onHover={setActiveId}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>

      {/* Desktop orbital composition */}
      <div className="relative hidden min-h-[640px] w-full lg:block xl:min-h-[700px]">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className="absolute h-[520px] w-[520px] rounded-full xl:h-[580px] xl:w-[580px]"
            style={{
              background:
                "radial-gradient(circle, rgba(124,108,240,0.16) 0%, rgba(124,108,240,0.06) 38%, transparent 70%)",
            }}
          />

          {[180, 250, 320, 390].map((size, i) => (
            <motion.div
              key={size}
              className="absolute rounded-full border border-dashed"
              style={{
                width: size,
                height: size,
                borderColor: active
                  ? `color-mix(in srgb, ${active.accent} 35%, rgba(148,163,184,0.35))`
                  : "rgba(148, 163, 184, 0.35)",
              }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      rotate: i % 2 === 0 ? 360 : -360,
                      opacity: active ? [0.55, 0.85, 0.55] : [0.45, 0.7, 0.45],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      rotate: { duration: 48 + i * 14, repeat: Infinity, ease: "linear" },
                      opacity: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                    }
              }
            />
          ))}

          <svg
            className="absolute h-[420px] w-[420px] overflow-visible xl:h-[480px] xl:w-[480px]"
            viewBox="0 0 100 100"
            aria-hidden
          >
            {items.map((category) => {
              const node = NODE_POSITIONS[category.slot];
              const isActive = activeId === category.id;
              return (
                <g key={category.id}>
                  <line
                    x1="50"
                    y1="50"
                    x2={node.x}
                    y2={node.y}
                    stroke={isActive ? category.accent : "rgba(148,163,184,0.45)"}
                    strokeWidth={isActive ? 0.45 : 0.28}
                    strokeDasharray={isActive ? "0" : "1.2 1.4"}
                    className="transition-all duration-300"
                  />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isActive ? 1.35 : 1.05}
                    fill={isActive ? category.accent : "#94A3B8"}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>

          <OrbitHub reduceMotion={reduceMotion} pulse={!activeId} />
        </div>

        {items.map((category, index) => (
          <SkillCard
            key={category.id}
            category={category}
            index={index}
            active={activeId === category.id}
            onHover={setActiveId}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </div>
  );
}

function OrbitHub({ reduceMotion, pulse }) {
  return (
    <motion.div
      className="relative z-10 flex h-28 w-28 flex-col items-center justify-center rounded-full border bg-white text-center shadow-[0_12px_40px_rgba(124,108,240,0.18)] sm:h-32 sm:w-32"
      style={{ borderColor: "rgba(124, 108, 240, 0.28)" }}
      animate={
        reduceMotion || !pulse
          ? undefined
          : { scale: [1, 1.04, 1], boxShadow: ["0 12px 40px rgba(124,108,240,0.16)", "0 16px 48px rgba(124,108,240,0.28)", "0 12px 40px rgba(124,108,240,0.16)"] }
      }
      whileHover={reduceMotion ? undefined : { scale: 1.06 }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <div
        className="mb-1 flex h-10 w-10 items-center justify-center rounded-full"
        style={{ background: "color-mix(in srgb, #7C6CF0 14%, white)", color: "#7C6CF0" }}
      >
        <Brain className="h-5 w-5" />
      </div>
      <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-800">GS</span>
      <span className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.16em] text-slate-400">AI Stack</span>
    </motion.div>
  );
}
