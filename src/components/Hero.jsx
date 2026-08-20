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

const FALLBACK_IMAGE = "/assets/images/profile.png";
const FALLBACK_RESUME = "/assets/documents/Resume.pdf";

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
      className={`rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-[0_14px_34px_rgba(15,23,42,0.08)] backdrop-blur ${className}`}
    >
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-500">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-500">{title}</p>
      <div className="mt-2 text-sm leading-6 text-slate-500">{children}</div>
    </motion.div>
  );
}

function InfoItem({ icon: Icon, label, value, withBorder = true }) {
  return (
    <div
      className={`flex items-center gap-3 ${withBorder ? "pr-6 md:border-r md:border-slate-200" : ""}`}
    >
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-700">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-800">{value}</p>
      </div>
    </div>
  );
}

export default function Hero() {
  const { data, isLoading } = usePortfolio();
  const profile = data.profile;
  const imageSrc = profile?.profile_image_url || FALLBACK_IMAGE;
  // Prefer CMS/DB resume URL; fall back to bundled PDF
  const resumeUrl = (profile?.resume_url && String(profile.resume_url).trim()) || FALLBACK_RESUME;
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
    <section id="about" className="relative overflow-hidden px-4 py-10 sm:py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-sky-200/25 blur-3xl"
      />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="space-y-7">
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-[12px] font-semibold uppercase tracking-[0.24em] text-indigo-500"
            >
              AI Engineer · GenAI · Available for hire
            </motion.p>

            <h1 className="max-w-3xl text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.03em] text-slate-900 sm:text-5xl lg:text-[3.5rem]">
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
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -22 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block font-semibold text-indigo-500"
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
              className="max-w-[540px] text-base leading-7 text-slate-500 sm:text-lg"
            >
              {profile?.bio
                ? profile.bio
                    .replace(/\baspiring\b/gi, "")
                    .replace(/\bentusiast\b/gi, "")
                    .replace(/\s{2,}/g, " ")
                    .trim()
                : "I work on RAG pipelines, agent workflows, and FastAPI backends — from prototype to a usable product teams can actually run."}
            </motion.p>

            <motion.div
              custom={0.36}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2.5"
            >
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="lsw-btn-primary px-5 py-3"
              >
                Hire Me <ArrowUpRight className="h-4 w-4" />
              </motion.button>

              <motion.a
                href={resumeUrl}
                download
                target="_blank"
                rel="noreferrer"
                onClick={downloadResume}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="lsw-btn-secondary px-5 py-3"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </motion.a>

              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                className="lsw-btn-primary px-5 py-3"
              >
                <Grid2x2 className="h-4 w-4" /> View Services
              </motion.button>
            </motion.div>

            <motion.div
              custom={0.44}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-3 rounded-2xl border border-slate-200/90 bg-white px-4 py-3.5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] md:flex-row md:items-center md:gap-4"
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
            className="relative mx-auto w-full max-w-[440px]"
          >
            <div
              aria-hidden
              className="absolute inset-x-8 top-14 h-[72%] rounded-full bg-indigo-300/25 blur-3xl"
            />

            <div className="relative rounded-[28px] border border-slate-200/90 bg-gradient-to-b from-slate-50 to-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.1)] sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
                    {profile?.name || "Gaurav Singh"}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {(profile?.title || "AI Engineer")
                      .replace(/\baspiring\b/gi, "")
                      .replace(/\bentusiast\b/gi, "")
                      .replace(/\s{2,}/g, " ")
                      .replace(/\s*\|\s*/g, " | ")
                      .replace(/^\s*\|\s*|\s*\|\s*$/g, "")
                      .trim() || "AI Engineer"}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 sm:text-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Available
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src={imageSrc}
                  alt={profile?.name || "Gaurav Singh"}
                  className="h-[320px] w-full object-cover object-top sm:h-[380px]"
                  onError={(event) => {
                    if (event.currentTarget.src.endsWith(FALLBACK_IMAGE)) return;
                    event.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />
              </div>

              <div className="absolute bottom-8 left-6 rounded-xl border border-slate-200/80 bg-white/95 px-3.5 py-2.5 shadow-md backdrop-blur sm:left-8 sm:px-4 sm:py-3">
                <p className="text-sm font-semibold text-slate-900">Currently shipping</p>
                <p className="font-mono text-xs text-slate-500 sm:text-sm">RAG · Agents · APIs</p>
              </div>
            </div>

            <ExpertiseCard icon={Brain} title="GenAI" className="absolute -left-4 top-14 hidden w-44 xl:block" delay={0.35}>
              RAG · Agents · LLMs
            </ExpertiseCard>
            <ExpertiseCard icon={Server} title="Backend" className="absolute -right-4 top-40 hidden w-48 xl:block" delay={0.45}>
              FastAPI · Python
              <br />
              PostgreSQL · Docker
            </ExpertiseCard>
            <ExpertiseCard icon={Briefcase} title="Available" className="absolute bottom-[-28px] left-4 hidden w-48 xl:block" delay={0.55}>
              Freelance & Full-time
            </ExpertiseCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
