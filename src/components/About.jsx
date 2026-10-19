import { usePortfolio } from "../hooks/usePortfolio";

export default function About() {
  const { data } = usePortfolio();
  const paragraphs = data.profile?.about || [];

  if (!paragraphs.length) return null;

  return (
    <section id="about" className="px-4 py-12">
      <div className="container mx-auto max-w-6xl">
        <p className="editorial-label">About</p>
        <h2 className="mt-3 text-4xl font-semibold sm:text-5xl" style={{ color: "var(--lsw-text)" }}>
          About me
        </h2>
        <div
          className="mt-6 space-y-4 rounded-3xl border p-6 sm:p-8"
          style={{
            borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
            background: "var(--lsw-surface)",
          }}
        >
          {paragraphs.map((text) => (
            <p key={text} className="text-base leading-8" style={{ color: "var(--lsw-text-muted)" }}>
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
