import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CardImageCarousel from "./CardImageCarousel";
import { usePortfolio } from "../hooks/usePortfolio";
import { animationVariants } from "../lib/motion";
import { ProjectCardSkeleton } from "./Skeleton";

function normalizeCategory(value) {
  return String(value || "").trim().toLowerCase();
}

function formatCategoryLabel(value) {
  return String(value || "").replaceAll("_", " ");
}

export default function Projects() {
  const { data, isLoading } = usePortfolio();
  const projects = data.projects || [];

  const categories = useMemo(() => {
    const map = new Map();
    projects.forEach((project) => {
      if (!project.category) return;
      const key = normalizeCategory(project.category);
      if (!map.has(key)) map.set(key, project.category);
    });
    return [{ key: "all", label: "All" }, ...Array.from(map.entries()).map(([key, label]) => ({ key, label }))];
  }, [projects]);

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filtered = useMemo(() => {
    if (selectedCategory === "all") return projects;
    return projects.filter((project) => normalizeCategory(project.category) === selectedCategory);
  }, [projects, selectedCategory]);

  const emptyMessage = !projects.length
    ? "No projects published yet. Check back soon."
    : selectedCategory === "all"
      ? "No projects available right now."
      : `No projects in "${formatCategoryLabel(categories.find((c) => c.key === selectedCategory)?.label || selectedCategory)}" yet.`;

  return (
    <section id="projects" className="px-4 py-12">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-6 max-w-2xl">
          <p className="editorial-label">Archive</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl" style={{ color: "var(--lsw-text)" }}>
            PROJECT ARCHIVE
          </h2>
        </div>

        {categories.length > 1 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedCategory(key)}
                className="rounded-full border px-4 py-2 text-sm font-semibold transition"
                style={
                  selectedCategory === key
                    ? {
                        borderColor: "var(--lsw-warning)",
                        background: "var(--lsw-warning)",
                        color: "var(--lsw-white)",
                      }
                    : {
                        borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
                        background: "var(--lsw-white)",
                        color: "var(--lsw-text-muted)",
                      }
                }
              >
                {key === "all" ? "All" : formatCategoryLabel(label)}
              </button>
            ))}
          </div>
        )}

        {isLoading && <ProjectCardSkeleton count={6} />}

        {!isLoading && !filtered.length && (
          <div
            className="rounded-3xl border border-dashed px-6 py-12 text-center text-sm"
            style={{
              borderColor: "color-mix(in srgb, var(--lsw-border) 20%, transparent)",
              color: "var(--lsw-text-muted)",
              background: "var(--lsw-surface)",
            }}
          >
            {emptyMessage}
          </div>
        )}

        {!isLoading && filtered.length > 0 && (
          <motion.div
            key={selectedCategory}
            variants={animationVariants.container}
            initial="hidden"
            animate="visible"
            className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                variants={animationVariants.card}
                whileHover={{ y: -4 }}
                className="group flex flex-col overflow-hidden rounded-[28px] border"
                style={{
                  borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
                  background: "var(--lsw-surface)",
                  boxShadow: "0 14px 40px rgba(6, 28, 58, 0.06)",
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
                    {formatCategoryLabel(project.category)}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold" style={{ color: "var(--lsw-text)" }}>
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
                          className="rounded-full border px-3 py-1.5 text-xs"
                          style={{
                            borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
                            color: "var(--lsw-text-muted)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to={`/projects/${project.slug}`} className="lsw-btn-secondary px-4 py-2.5">
                      View details <span aria-hidden>→</span>
                    </Link>

                    {project.github_url ? (
                      <a href={project.github_url} target="_blank" rel="noreferrer" className="lsw-btn-secondary px-4 py-2.5">
                        <Github className="h-4 w-4" /> Source
                      </a>
                    ) : null}

                    {project.live_url ? (
                      <a href={project.live_url} target="_blank" rel="noreferrer" className="lsw-btn-primary px-4 py-2.5">
                        <ExternalLink className="h-4 w-4" /> Live
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
