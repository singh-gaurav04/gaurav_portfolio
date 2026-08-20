import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import CardImageCarousel from "./CardImageCarousel";
import { animationVariants } from "../lib/motion";

export default function RealProjectCard({ project, index = 0 }) {
  return (
    <motion.article
      variants={animationVariants.card}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group flex flex-col overflow-hidden rounded-[28px] border"
      style={{
        borderColor: "color-mix(in srgb, var(--lsw-border) 22%, transparent)",
        background: "var(--lsw-surface)",
        boxShadow: "0 12px 36px rgba(6, 28, 58, 0.08)",
      }}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{ background: "color-mix(in srgb, var(--lsw-warning) 8%, var(--lsw-white))" }}
      >
        <CardImageCarousel
          featured_image_url={project.featured_image_url}
          gallery_images={project.gallery_images}
          alt={project.title}
          emptyLabel="No project media"
        />
        <div
          className="absolute left-4 top-4 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
          style={{
            borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
            background: "var(--lsw-white)",
            color: "var(--lsw-warning)",
          }}
        >
          {project.category}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold tracking-widest" style={{ color: "var(--lsw-warning)" }}>
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-2 text-xl font-semibold" style={{ color: "var(--lsw-text)" }}>
          {project.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-7" style={{ color: "var(--lsw-text-muted)" }}>
          {project.short_description || project.description}
        </p>

        {!!(project.technologies || []).length && (
          <div className="mt-4 flex flex-wrap gap-2">
            {(project.technologies || []).slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full border px-3 py-1 text-xs"
                style={{
                  borderColor: "color-mix(in srgb, var(--lsw-border) 14%, transparent)",
                  color: "var(--lsw-text-muted)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            to={`/projects/${project.slug}`}
            className="lsw-btn-primary flex-1 px-3 py-2.5 text-sm"
          >
            View details <ArrowRight className="h-4 w-4" />
          </Link>

          {project.live_url ? (
            <a href={project.live_url} target="_blank" rel="noreferrer" className="lsw-btn-secondary w-full px-3 py-2.5 sm:w-auto sm:flex-1">
              <ExternalLink className="h-4 w-4" /> Live demo
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
