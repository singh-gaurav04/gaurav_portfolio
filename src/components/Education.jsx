import { Award, ExternalLink, GraduationCap } from "lucide-react";
import { usePortfolio } from "../hooks/usePortfolio";

const cardStyle = {
  borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
  background: "var(--lsw-surface)",
};

export default function Education() {
  const { data } = usePortfolio();
  const education = data.education || [];
  const certifications = data.certifications || [];

  if (!education.length && !certifications.length) return null;

  return (
    <section id="education" className="px-4 py-12">
      <div className="container mx-auto max-w-6xl">
        <p className="editorial-label">Education</p>
        <h2 className="mt-3 text-4xl font-semibold sm:text-5xl" style={{ color: "var(--lsw-text)" }}>
          Education & certifications
        </h2>

        <div className="mt-6 space-y-4">
          {education.map((item) => (
            <article key={item.id} className="rounded-3xl border p-6 sm:p-8" style={cardStyle}>
              <div className="flex items-start gap-4">
                <GraduationCap className="mt-1 h-6 w-6 shrink-0" style={{ color: "var(--lsw-warning)" }} />
                <div>
                  <h3 className="text-xl font-semibold" style={{ color: "var(--lsw-text)" }}>
                    {item.degree}
                  </h3>
                  <p className="mt-1 text-sm" style={{ color: "var(--lsw-text-muted)" }}>
                    {item.institution}
                  </p>
                  <p className="mt-3 font-mono text-xs" style={{ color: "var(--lsw-text-muted)" }}>
                    {[item.period, item.grade].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {certifications.length > 0 && (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {certifications.map((cert) => (
              <article key={cert.id} className="rounded-3xl border p-6" style={cardStyle}>
                <div className="flex items-start justify-between gap-3">
                  <Award className="h-5 w-5" style={{ color: "var(--lsw-warning)" }} />
                  {cert.link ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="lsw-btn-secondary !rounded-xl !p-2.5"
                      aria-label={`Open ${cert.title} certificate`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
                <h3 className="mt-3 text-lg font-semibold" style={{ color: "var(--lsw-text)" }}>
                  {cert.title}
                </h3>
                <p className="mt-1 text-sm" style={{ color: "var(--lsw-text-muted)" }}>
                  {[cert.issuer, cert.date].filter(Boolean).join(" · ")}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
