import TechOrbit, { SKILL_ORBIT_CATEGORIES } from "./TechOrbit";

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden border-t px-4 py-16 sm:py-20"
      style={{
        borderColor: "color-mix(in srgb, var(--lsw-border) 12%, transparent)",
        background:
          "linear-gradient(180deg, #F7FAFF 0%, #FFFFFF 42%, #F5F3FF 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(124,108,240,0.14), transparent 68%)" }}
      />

      <div className="container relative z-10 mx-auto max-w-6xl space-y-10">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="editorial-label" style={{ color: "#7C6CF0" }}>
            Skills
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Technologies I use to build AI products
          </h2>
          <p className="text-base leading-7 text-slate-500 sm:text-lg">
            These are the technologies and systems I use to build AI-powered products — from models and agents to APIs, data, and deployment.
          </p>
        </div>

        <TechOrbit categories={SKILL_ORBIT_CATEGORIES} />
      </div>
    </section>
  );
}
