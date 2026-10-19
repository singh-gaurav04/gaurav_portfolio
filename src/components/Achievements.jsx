import { ExternalLink } from "lucide-react";
import { usePortfolio } from "../hooks/usePortfolio";

export default function Achievements() {
  const { data } = usePortfolio();
  const items = data.achievements || [];

  if (!items.length) return null;

  return (
    <section id="achievements" className="px-4 py-12">
      <div className="container mx-auto max-w-6xl">
        <p className="editorial-label">Achievements</p>
        <h2 className="mt-3 text-4xl font-semibold sm:text-5xl" style={{ color: "var(--lsw-text)" }}>
          Achievements
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-3xl border p-6"
              style={{
                borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
                background: "var(--lsw-surface)",
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-4xl font-semibold" style={{ color: "var(--lsw-warning)" }}>
                  {item.metric}
                </p>
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="lsw-btn-secondary !rounded-xl !p-2.5"
                    aria-label={`Open ${item.title}`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
              <h3 className="mt-3 text-lg font-semibold" style={{ color: "var(--lsw-text)" }}>
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-7" style={{ color: "var(--lsw-text-muted)" }}>
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
