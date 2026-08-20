import { Briefcase } from "lucide-react";
import ExperienceTimeline from "./ExperienceTimeline";
import { usePortfolio } from "../hooks/usePortfolio";
import { ExperienceSkeleton } from "./Skeleton";

export default function Experience() {
  const { data, isLoading, isError, refetch } = usePortfolio();
  const items = (data.experiences || []).map((item) => ({
    ...item,
    year: item.period,
    role: item.title,
    duration: item.period,
    summary: item.description,
    impact: item.achievements || [],
  }));

  return (
    <section id="experience" className="px-4 py-12">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-5 text-center">
          <div
            className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl border"
            style={{
              borderColor: "color-mix(in srgb, var(--lsw-warning) 35%, transparent)",
              background: "color-mix(in srgb, var(--lsw-warning) 12%, var(--lsw-white))",
            }}
          >
            <Briefcase className="h-7 w-7" style={{ color: "var(--lsw-warning)" }} />
          </div>
          <p className="editorial-label">Path</p>
          <h2 className="mt-3 text-4xl font-semibold sm:text-5xl" style={{ color: "var(--lsw-text)" }}>
            Experience
          </h2>
        </div>

        {isLoading && <ExperienceSkeleton />}

        {isError && (
          <div
            className="rounded-2xl border p-6 text-center"
            style={{
              borderColor: "color-mix(in srgb, var(--lsw-error) 35%, transparent)",
              background: "color-mix(in srgb, var(--lsw-error) 10%, var(--lsw-white))",
              color: "var(--lsw-error)",
            }}
          >
            <p>Experience details are temporarily unavailable.</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-3 text-sm font-semibold"
              style={{ color: "var(--lsw-warning)" }}
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !isError && (items.length ? (
          <ExperienceTimeline items={items} />
        ) : (
          <p className="text-center" style={{ color: "var(--lsw-text-muted)" }}>
            No experience entries yet.
          </p>
        ))}
      </div>
    </section>
  );
}
