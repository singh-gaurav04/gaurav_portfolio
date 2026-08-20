import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ExperienceTimeline({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <ol
      className="relative ml-3 border-l pl-7 sm:ml-5 sm:pl-10"
      style={{ borderColor: "color-mix(in srgb, var(--lsw-border) 22%, transparent)" }}
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <li key={item.id || `${item.company}-${item.year}`} className="relative mb-6 last:mb-0">
            <span
              className="absolute -left-[34px] top-7 h-3 w-3 rounded-full border-2 sm:-left-[46px]"
              style={{
                borderColor: "var(--lsw-white)",
                background: "var(--lsw-warning)",
                boxShadow: "0 0 0 4px color-mix(in srgb, var(--lsw-warning) 22%, transparent)",
              }}
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-start justify-between gap-4 rounded-2xl border p-5 text-left transition-colors sm:p-6"
              style={{
                borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
                background: "var(--lsw-surface)",
                color: "var(--lsw-text)",
              }}
              aria-expanded={isOpen}
            >
              <div>
                <p className="font-mono text-xs font-medium" style={{ color: "var(--lsw-warning)" }}>
                  {item.year}
                </p>
                <h3 className="mt-1 text-xl font-semibold sm:text-2xl" style={{ color: "var(--lsw-text)" }}>
                  {item.role}{" "}
                  <span className="font-normal" style={{ color: "var(--lsw-text-muted)" }}>
                    — {item.company}
                  </span>
                </h3>
                <p className="mt-2 text-sm" style={{ color: "var(--lsw-text-muted)" }}>
                  {item.duration}
                </p>
              </div>
              <ChevronDown
                className={`mt-1 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                style={{ color: "var(--lsw-text-muted)" }}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className="mt-3 rounded-2xl border p-5 sm:p-6"
                    style={{
                      borderColor: "color-mix(in srgb, var(--lsw-border) 16%, transparent)",
                      background: "color-mix(in srgb, var(--lsw-warning) 5%, var(--lsw-white))",
                    }}
                  >
                    <p className="text-sm leading-6" style={{ color: "var(--lsw-text-muted)" }}>
                      {item.summary}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {item.impact?.map((line) => (
                        <li
                          key={line}
                          className="flex gap-3 text-sm leading-6"
                          style={{ color: "var(--lsw-text-muted)" }}
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: "var(--lsw-warning)" }}
                          />
                          {line}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.technologies?.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border px-3 py-1 font-mono text-[11px]"
                          style={{
                            borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
                            color: "var(--lsw-text-muted)",
                          }}
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}
