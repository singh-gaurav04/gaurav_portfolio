import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Brain,
  Briefcase,
  Calendar,
  Clock3,
  Download,
  Grid2x2,
  MapPin,
  Server,
} from "lucide-react";
import { trackVisit } from "../api/public";
import { usePortfolio } from "../hooks/usePortfolio";
import { HeroSkeleton } from "./Skeleton";

const FALLBACK_IMAGE = "/assets/images/profile.jpg";

const HIGHLIGHT_PHRASES = [
  "ship to production.",
  "answer real questions.",
  "cut manual work.",
  "scale with traffic.",
];

const HEADLINE_LINES = ["I design and ship", "AI systems that"];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const wordReveal = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.12 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function ExpertiseCard({ icon: Icon, title, children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`rounded-2xl border p-4 shadow-[0_14px_34px_rgba(6,28,58,0.08)] backdrop-blur ${className}`}
      style={{
        borderColor: "color-mix(in srgb, var(--lsw-border) 16%, transparent)",
        background: "color-mix(in srgb, var(--lsw-white) 92%, transparent)",
      }}
    >
      <div
        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl"
        style={{
          background: "color-mix(in srgb, var(--lsw-warning) 16%, var(--lsw-white))",
          color: "var(--lsw-warning)",
        }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "var(--lsw-warning)" }}>
        {title}
      </p>
      <div className="mt-2 text-sm leading-6" style={{ color: "var(--lsw-text-muted)" }}>
        {children}
      </div>
    </motion.div>
  );
}

function InfoItem({ icon: Icon, label, value, withBorder = true }) {
  return (
    <div
      className={`flex items-center gap-3 ${withBorder ? "pr-6 md:border-r" : ""}`}
      style={withBorder ? { borderColor: "color-mix(in srgb, var(--lsw-border) 16%, transparent)" } : undefined}
    >
      <div
        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl"
        style={{
          background: "color-mix(in srgb, var(--lsw-warning) 12%, var(--lsw-white))",
          color: "var(--lsw-warning)",
        }}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--lsw-text-muted)" }}>
          {label}
        </p>
        <p className="text-sm font-medium" style={{ color: "var(--lsw-text)" }}>
          {value}
        </p>
      </div>
    </div>
  );
}

export default function Hero() {
  const { data, isLoading } = usePortfolio();
  const profile = data.profile;
  const imageSrc = profile?.profile_image_url || FALLBACK_IMAGE;
  const resumeUrl = profile?.resume_url;
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPhraseIndex((current) => (current + 1) % HIGHLIGHT_PHRASES.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, []);

  const downloadResume = () => {
    trackVisit({
      page: "resume downloaded",
      userAgent: navigator.userAgent,
      referrer: document.referrer,
    }).catch(() => {});
  };

  if (isLoading && !profile) {
    return <HeroSkeleton />;
  }

  return (
    <section id="about" className="relative overflow-hidden px-4 py-10">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "color-mix(in srgb, var(--lsw-warning) 18%, transparent)" }}
        animate={{ x: [0, 24, 0], y: [0, 16, 0], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "color-mix(in srgb, var(--lsw-info) 14%, transparent)" }}
        animate={{ x: [0, -18, 0], y: [0, -22, 0], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-sm font-semibold uppercase tracking-[0.28em]"
              style={{ color: "var(--lsw-warning)" }}
            >
              AI ENGINEER • GENAI • BACKEND
            </motion.p>

            <h1
              className="max-w-3xl text-[40px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[52px] lg:text-[64px]"
              style={{ color: "var(--lsw-text)" }}
            >
              {HEADLINE_LINES.map((line, lineIndex) => (
                <span key={line} className="block overflow-hidden">
                  {line.split(" ").map((word, wordIndex) => (
                    <motion.span
                      key={`${line}-${word}`}
                      custom={lineIndex * 3 + wordIndex}
                      variants={wordReveal}
                      initial="hidden"
                      animate="visible"
                      className="mr-[0.28em] inline-block"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              ))}
              <span className="relative mt-1 block min-h-[1.15em] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={HIGHLIGHT_PHRASES[phraseIndex]}
                    initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -22, filter: "blur(4px)" }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block font-serif italic"
                    style={{ color: "var(--lsw-warning)" }}
                  >
                    {HIGHLIGHT_PHRASES[phraseIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <motion.p
              custom={0.28}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="max-w-[540px] text-lg leading-7"
              style={{ color: "var(--lsw-text-muted)" }}
            >
              {profile?.bio
                ? profile.bio
                : "I work on RAG pipelines, agent workflows, and FastAPI backends — from prototype to a usable product teams can actually run."}
            </motion.p>

            <motion.div
              custom={0.36}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2"
            >
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="lsw-btn-primary px-6 py-3"
              >
                Hire Me <ArrowUpRight className="h-4 w-4" />
              </motion.button>

              {resumeUrl ? (
                <motion.a
                  href={resumeUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                  onClick={downloadResume}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="lsw-btn-secondary px-6 py-3"
                >
                  <Download className="h-4 w-4" style={{ color: "var(--lsw-warning)" }} />
                  Download Resume
                </motion.a>
              ) : null}

              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                className="lsw-btn-secondary px-6 py-3"
              >
                <Grid2x2 className="h-4 w-4" style={{ color: "var(--lsw-warning)" }} /> View Services
              </motion.button>
            </motion.div>

            <motion.div
              custom={0.44}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-2 rounded-[28px] border px-4 py-3 md:flex-row md:items-center md:gap-4"
              style={{
                borderColor: "color-mix(in srgb, var(--lsw-border) 16%, transparent)",
                background: "var(--lsw-white)",
                boxShadow: "0 14px 34px rgba(6, 28, 58, 0.05)",
              }}
            >
              <InfoItem icon={MapPin} label="Based in" value={profile?.location || "Bengaluru, India"} />
              <InfoItem icon={Calendar} label="Open to" value="Full-time & Freelance" />
              <InfoItem icon={Clock3} label="Response time" value={profile?.response_time || "Within 12 hrs"} withBorder={false} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[480px]"
          >
            <motion.div
              aria-hidden
              className="absolute inset-x-8 top-14 h-[72%] rounded-full blur-3xl"
              style={{ background: "color-mix(in srgb, var(--lsw-warning) 28%, transparent)" }}
              animate={{ scale: [1, 1.06, 1], opacity: [0.45, 0.7, 0.45] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="relative rounded-[32px] border p-5"
              style={{
                borderColor: "color-mix(in srgb, var(--lsw-border) 16%, transparent)",
                background: "linear-gradient(180deg, var(--lsw-surface), var(--lsw-white))",
                boxShadow: "0 24px 70px rgba(6, 28, 58, 0.1)",
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ y: -10 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold" style={{ color: "var(--lsw-text)" }}>
                    {profile?.name || "Gaurav Singh"}
                  </h2>
                  <p className="text-sm" style={{ color: "var(--lsw-text-muted)" }}>
                    {profile?.title || "AI Engineer"}
                  </p>
                </div>
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm"
                  style={{
                    borderColor: "color-mix(in srgb, var(--lsw-success) 30%, transparent)",
                    background: "color-mix(in srgb, var(--lsw-success) 10%, var(--lsw-white))",
                    color: "var(--lsw-success)",
                  }}
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="relative flex h-2 w-2">
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                      style={{ background: "var(--lsw-success)" }}
                    />
                    <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--lsw-success)" }} />
                  </span>
                  Available
                </motion.div>
              </div>

              <div
                className="overflow-hidden rounded-[28px]"
                style={{ background: "color-mix(in srgb, var(--lsw-warning) 10%, var(--lsw-white))" }}
              >
                <motion.img
                  src={imageSrc}
                  alt={profile?.name || "Gaurav Singh"}
                  className="h-[380px] w-full object-cover object-top"
                  initial={{ scale: 1.08 }}
                  animate={{ scale: [1.02, 1.05, 1.02] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  onError={(event) => {
                    if (event.currentTarget.src.endsWith(FALLBACK_IMAGE)) return;
                    event.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />
              </div>

              <motion.div
                className="absolute bottom-10 left-8 rounded-2xl border px-4 py-3 backdrop-blur"
                style={{
                  borderColor: "color-mix(in srgb, var(--lsw-border) 14%, transparent)",
                  background: "color-mix(in srgb, var(--lsw-white) 88%, transparent)",
                  boxShadow: "0 12px 30px rgba(6, 28, 58, 0.08)",
                }}
                animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-sm font-semibold" style={{ color: "var(--lsw-text)" }}>
                  Currently shipping
                </p>
                <p className="text-sm" style={{ color: "var(--lsw-text-muted)" }}>
                  RAG • Agents • APIs
                </p>
              </motion.div>
            </motion.div>

            <ExpertiseCard icon={Brain} title="GENAI" className="absolute -left-6 top-16 hidden w-48 lg:block" delay={0.35}>
              RAG • Agents • LLMs
            </ExpertiseCard>
            <ExpertiseCard icon={Server} title="BACKEND" className="absolute -right-6 top-44 hidden w-52 lg:block" delay={0.45}>
              FastAPI • Python
              <br />
              PostgreSQL • Docker
            </ExpertiseCard>
            <ExpertiseCard icon={Briefcase} title="AVAILABLE" className="absolute left-4 bottom-[-34px] hidden w-52 lg:block" delay={0.55}>
              Freelance & Full-time
            </ExpertiseCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
