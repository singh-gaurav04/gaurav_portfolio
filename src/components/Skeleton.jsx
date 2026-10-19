/**
 * Shared skeleton loaders — LSW cream theme with soft shimmer.
 */

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export function Skeleton({ className = "", style, rounded = "xl" }) {
  const radius =
    rounded === "full"
      ? "9999px"
      : rounded === "2xl"
        ? "1rem"
        : rounded === "3xl"
          ? "1.5rem"
          : rounded === "lg"
            ? "0.75rem"
            : "0.75rem";

  return (
    <div
      aria-hidden
      className={cx("skeleton-shimmer", className)}
      style={{
        borderRadius: radius,
        background: "color-mix(in srgb, var(--lsw-border) 8%, var(--lsw-white))",
        ...style,
      }}
    />
  );
}

export function SkeletonText({ lines = 3, className = "" }) {
  return (
    <div className={cx("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-3"
          style={{ width: i === lines - 1 ? "68%" : "100%" }}
          rounded="lg"
        />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <section className="relative overflow-hidden px-4 py-10" aria-busy="true" aria-label="Loading hero">
      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <Skeleton className="h-4 w-48" />
            <div className="space-y-3">
              <Skeleton className="h-12 w-full max-w-xl" rounded="2xl" />
              <Skeleton className="h-12 w-4/5 max-w-lg" rounded="2xl" />
              <Skeleton className="h-12 w-3/5 max-w-md" rounded="2xl" />
            </div>
            <SkeletonText lines={3} className="max-w-lg" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-12 w-32" rounded="2xl" />
              <Skeleton className="h-12 w-40" rounded="2xl" />
              <Skeleton className="h-12 w-36" rounded="2xl" />
            </div>
            <Skeleton className="h-20 w-full max-w-xl" rounded="3xl" />
          </div>
          <div className="mx-auto w-full max-w-[480px]">
            <Skeleton className="h-[460px] w-full" rounded="3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatsSkeleton() {
  return (
    <section className="px-4 pb-6" aria-busy="true" aria-label="Loading stats">
      <div className="container mx-auto max-w-7xl">
        <div className="grid gap-4 rounded-[32px] border p-6 md:grid-cols-2 xl:grid-cols-4"
          style={{
            borderColor: "color-mix(in srgb, var(--lsw-border) 14%, transparent)",
            background: "var(--lsw-white)",
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl p-5" style={{ background: "var(--lsw-surface)" }}>
              <Skeleton className="h-11 w-11" rounded="2xl" />
              <Skeleton className="mt-5 h-8 w-16" />
              <Skeleton className="mt-3 h-4 w-28" />
              <Skeleton className="mt-2 h-3 w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CardGridSkeleton({
  count = 4,
  columns = "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
  withImage = true,
}) {
  return (
    <div className={cx("grid gap-4", columns)} aria-busy="true" aria-label="Loading cards">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col rounded-[28px] border p-5"
          style={{
            borderColor: "color-mix(in srgb, var(--lsw-border) 16%, transparent)",
            background: "var(--lsw-surface)",
          }}
        >
          {withImage ? <Skeleton className="aspect-[16/10] w-full" rounded="2xl" /> : <Skeleton className="h-12 w-12" rounded="2xl" />}
          <Skeleton className="mt-4 h-5 w-3/4" />
          <SkeletonText lines={3} className="mt-3" />
          <div className="mt-4 flex gap-2">
            <Skeleton className="h-10 flex-1" rounded="2xl" />
            <Skeleton className="h-10 flex-1" rounded="2xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProjectCardSkeleton({ count = 3, columns = "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" }) {
  return (
    <div className={cx("grid gap-6", columns)} aria-busy="true" aria-label="Loading projects">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-[28px] border"
          style={{
            borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
            background: "var(--lsw-surface)",
          }}
        >
          <Skeleton className="aspect-[16/10] w-full" rounded="none" style={{ borderRadius: 0 }} />
          <div className="space-y-3 p-6">
            <Skeleton className="h-6 w-3/4" />
            <SkeletonText lines={3} />
            <div className="flex flex-wrap gap-2 pt-2">
              <Skeleton className="h-7 w-16" rounded="full" />
              <Skeleton className="h-7 w-20" rounded="full" />
              <Skeleton className="h-7 w-14" rounded="full" />
            </div>
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-10 w-28" rounded="2xl" />
              <Skeleton className="h-10 w-24" rounded="2xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkillsSkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-8" aria-busy="true" aria-label="Loading skills">
      <div className="flex justify-center">
        <Skeleton className="h-28 w-28 sm:h-32 sm:w-32" rounded="full" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-28 w-full" rounded="2xl" />
        ))}
      </div>
    </div>
  );
}

export function ExperienceSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading experience">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="rounded-3xl border p-6"
          style={{
            borderColor: "color-mix(in srgb, var(--lsw-border) 16%, transparent)",
            background: "var(--lsw-surface)",
          }}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-2">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-4 w-24" />
          </div>
          <SkeletonText lines={3} className="mt-4" />
          <div className="mt-4 flex flex-wrap gap-2">
            <Skeleton className="h-7 w-20" rounded="full" />
            <Skeleton className="h-7 w-24" rounded="full" />
            <Skeleton className="h-7 w-16" rounded="full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CertificationsSkeleton() {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading certifications">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="rounded-3xl border p-6"
          style={{
            borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
            background: "var(--lsw-surface)",
          }}
        >
          <Skeleton className="h-8 w-8" rounded="lg" />
          <Skeleton className="mt-3 h-5 w-3/4" />
          <Skeleton className="mt-2 h-3 w-1/2" />
          <SkeletonText lines={2} className="mt-4" />
        </div>
      ))}
    </div>
  );
}

export function FeedbackSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden py-2" aria-busy="true" aria-label="Loading testimonials">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex h-[280px] w-[300px] shrink-0 flex-col rounded-2xl p-5"
          style={{ background: "color-mix(in srgb, var(--lsw-warning) 6%, var(--lsw-white))" }}
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-11 w-11" rounded="full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <SkeletonText lines={5} className="mt-4 flex-1" />
        </div>
      ))}
    </div>
  );
}

export function ContactSkeleton() {
  return (
    <section className="px-4 py-12" aria-busy="true" aria-label="Loading contact">
      <div className="container mx-auto max-w-6xl">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="mt-2 h-12 w-72" rounded="2xl" />
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" rounded="2xl" />
            ))}
          </div>
          <Skeleton className="h-80 w-full" rounded="3xl" />
        </div>
      </div>
    </section>
  );
}

export function DetailPageSkeleton() {
  return (
    <div className="space-y-8" aria-busy="true" aria-label="Loading details">
      <Skeleton className="h-10 w-28" rounded="full" />
      <Skeleton className="aspect-[16/9] w-full" rounded="3xl" />
      <Skeleton className="h-10 w-2/3 max-w-xl" rounded="2xl" />
      <SkeletonText lines={4} className="max-w-2xl" />
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-8 w-20" rounded="full" />
        <Skeleton className="h-8 w-24" rounded="full" />
        <Skeleton className="h-8 w-16" rounded="full" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-40 w-full" rounded="3xl" />
        <Skeleton className="h-40 w-full" rounded="3xl" />
      </div>
    </div>
  );
}

export function SectionHeaderSkeleton() {
  return (
    <div className="mb-6 max-w-2xl space-y-3">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-10 w-72" rounded="2xl" />
      <Skeleton className="h-4 w-96 max-w-full" />
    </div>
  );
}
