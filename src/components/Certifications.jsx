import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { usePortfolio } from "../hooks/usePortfolio";
import { animationVariants } from "../lib/motion";
import { CertificationsSkeleton } from "./Skeleton";

export default function Certifications() {
  const { data, isLoading } = usePortfolio();
  const certifications = data.certifications || [];

  return (
    <section id="certifications" className="px-4 py-12">
      <div className="container mx-auto max-w-6xl">
        <p className="editorial-label">Proof</p>
        <h2 className="mt-3 text-4xl font-semibold sm:text-5xl" style={{ color: "var(--lsw-text)" }}>
          Certifications
        </h2>

        {isLoading && <CertificationsSkeleton />}

        {!isLoading && !certifications.length && (
          <p className="mt-6" style={{ color: "var(--lsw-text-muted)" }}>
            No certifications published yet.
          </p>
        )}

        {!isLoading && (
          <motion.div
            variants={animationVariants.container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {certifications.map((cert) => (
            <motion.article
              key={cert.id}
              variants={animationVariants.card}
              className="rounded-3xl border p-6"
              style={{
                borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
                background: "var(--lsw-surface)",
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-2xl">{cert.icon}</span>
                  <h3 className="mt-3 text-lg font-semibold" style={{ color: "var(--lsw-text)" }}>
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-sm" style={{ color: "var(--lsw-text-muted)" }}>
                    {cert.issuer} · {cert.date}
                  </p>
                </div>
                {cert.link ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="lsw-btn-secondary !rounded-xl !p-2.5"
                    aria-label={`Open ${cert.title} credential`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-6" style={{ color: "var(--lsw-text-muted)" }}>
                {cert.description}
              </p>
              {cert.credential_id ? (
                <p className="mt-4 font-mono text-xs" style={{ color: "var(--lsw-text-muted)" }}>
                  ID: {cert.credential_id}
                </p>
              ) : null}
            </motion.article>
          ))}
        </motion.div>
        )}
      </div>
    </section>
  );
}
