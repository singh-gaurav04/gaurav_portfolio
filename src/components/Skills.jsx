import TechOrbit, { CORE_CS_SKILLS, SKILL_ORBIT_CATEGORIES } from "./TechOrbit";

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden border-t px-4 py-16 sm:py-20"
      style={{
        borderColor: "color-mix(in srgb, var(--lsw-border) 12%, transparent)",
        background: "var(--lsw-background)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(124,108,240,0.14), transparent 68%)" }}
      />

      <div className="container relative z-10 mx-auto max-w-6xl space-y-10">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="editorial-label">Skills</p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Technical skills
          </h2>
          <p className="text-base leading-7 text-slate-500 sm:text-lg">
            Languages, backend frameworks, AI tooling, databases, cloud, and the system design fundamentals I build with.
          </p>
        </div>

        <TechOrbit categories={SKILL_ORBIT_CATEGORIES} />

        <div
          className="rounded-3xl border p-6"
          style={{
            borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
            background: "var(--lsw-surface)",
          }}
        >
          <h3 className="text-lg font-semibold" style={{ color: "var(--lsw-text)" }}>
            Core Computer Science
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {CORE_CS_SKILLS.map((skill) => (
              <li
                key={skill}
                className="rounded-full border px-3 py-1 font-mono text-xs"
                style={{
                  borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
                  color: "var(--lsw-text-muted)",
                }}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
