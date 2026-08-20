import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Linkedin, MessageSquare, X } from "lucide-react";
import { usePortfolio } from "../hooks/usePortfolio";
import FeedbackForm from "./FeedbackForm";
import { FeedbackSkeleton } from "./Skeleton";

export default function Feedback() {
  const { data, isLoading } = usePortfolio();
  const testimonials = data.testimonials || [];
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!showForm) return undefined;
    document.body.classList.add("modal-open");
    const onKeyDown = (e) => {
      if (e.key === "Escape") setShowForm(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [showForm]);

  return (
    <section id="feedback" className="px-4 py-12">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div className="max-w-2xl">
            <p className="editorial-label">Community</p>
            <h2 className="mt-3 text-4xl font-semibold sm:text-5xl" style={{ color: "var(--lsw-text)" }}>
              Client testimonials
            </h2>
          </div>

          <button type="button" onClick={() => setShowForm(true)} className="lsw-btn-primary px-5 py-3">
            <MessageSquare className="h-4 w-4" />
            Leave feedback
          </button>
        </div>

        {isLoading ? (
          <FeedbackSkeleton />
        ) : testimonials.length === 0 ? (
          <div
            className="rounded-3xl border border-dashed p-10 text-center"
            style={{
              borderColor: "color-mix(in srgb, var(--lsw-border) 20%, transparent)",
              background: "var(--lsw-surface)",
              color: "var(--lsw-text-muted)",
            }}
          >
            Be the first to leave feedback.
          </div>
        ) : (
          <div className="overflow-hidden">
            <div className="testimonial-marquee-track flex w-max gap-4 py-2">
              {[...testimonials, ...testimonials].map((t, idx) => (
                <article
                  key={`${t.id}-${idx}`}
                  className="flex h-[280px] w-[300px] shrink-0 flex-col rounded-2xl p-5 shadow-[0_8px_28px_rgba(6,28,58,0.06)] transition hover:-translate-y-1"
                  style={{
                    background: "color-mix(in srgb, var(--lsw-warning) 6%, var(--lsw-white))",
                  }}
                >
                  <div className="flex items-start gap-3">
                    {t.avatar_url ? (
                      <img src={t.avatar_url} alt={t.name} className="h-11 w-11 rounded-full object-cover" loading="lazy" />
                    ) : (
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                        style={{
                          background: "color-mix(in srgb, var(--lsw-warning) 18%, var(--lsw-white))",
                          color: "var(--lsw-warning)",
                        }}
                      >
                        {t.name?.slice(0, 1)?.toUpperCase() || "?"}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="truncate font-semibold" style={{ color: "var(--lsw-text)" }}>
                        {t.name}
                      </p>
                      {t.role ? (
                        <p className="mt-0.5 truncate text-xs" style={{ color: "var(--lsw-text-muted)" }}>
                          {t.role}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <p
                    className="mt-4 flex-1 overflow-hidden text-sm leading-7"
                    style={{
                      color: "var(--lsw-text-muted)",
                      display: "-webkit-box",
                      WebkitLineClamp: 6,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    &ldquo;{t.message}&rdquo;
                  </p>

                  {t.linkedin_url ? (
                    <a
                      href={t.linkedin_url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-semibold hover:underline"
                      style={{ color: "var(--lsw-warning)" }}
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  ) : (
                    <div className="mt-auto pt-3" aria-hidden />
                  )}
                </article>
              ))}
            </div>
          </div>
        )}
      </div>

      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {showForm ? (
                <motion.div
                  key="feedback-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="lsw-modal-overlay"
                  onClick={() => setShowForm(false)}
                  role="presentation"
                >
                  <motion.div
                    key="feedback-panel"
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 340, damping: 28 }}
                    className="lsw-modal-panel"
                    onClick={(e) => e.stopPropagation()}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Feedback form"
                  >
                    <div
                      className="flex items-center justify-between border-b pb-3"
                      style={{ borderColor: "color-mix(in srgb, var(--lsw-border) 16%, transparent)" }}
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" style={{ color: "var(--lsw-warning)" }} />
                        <h3 className="text-lg font-semibold" style={{ color: "var(--lsw-text)" }}>
                          Leave feedback
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="rounded-lg p-2"
                        style={{ color: "var(--lsw-text-muted)" }}
                        aria-label="Close feedback form"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="mt-4">
                      <FeedbackForm onClose={() => setShowForm(false)} />
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </section>
  );
}
