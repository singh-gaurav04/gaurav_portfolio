import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ImageGallery from "../components/ImageGallery";
import Navbar from "../components/Navbar";
import SeoHead from "../components/SeoHead";
import { findProjectBySlug, usePortfolio } from "../hooks/usePortfolio";
import { DetailPageSkeleton } from "../components/Skeleton";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { data: portfolio } = usePortfolio();

  const project = findProjectBySlug(slug);
  const isLoading = false;
  const error = null;
  const realProjects = portfolio?.real_projects || [];

  const nextProject = useMemo(() => {
    if (!project || !realProjects.length) return null;
    const idx = realProjects.findIndex((p) => p.slug === project.slug);
    if (idx === -1) return realProjects[0] || null;
    return realProjects[idx + 1] || realProjects[0] || null;
  }, [project, realProjects]);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--lsw-background)", color: "var(--lsw-text)" }}>
      {project ? (
        <SeoHead
          title={`${project.title} — AI / Software Project`}
          description={
            project.short_description ||
            project.description?.slice(0, 160) ||
            `${project.title} by AI Engineer Gaurav Singh`
          }
          path={`/projects/${project.slug}`}
          image={project.featured_image_url}
          type="article"
        />
      ) : (
        <SeoHead title="Project" path={slug ? `/projects/${slug}` : "/projects"} />
      )}
      <Navbar />
      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-24 sm:pb-24 sm:pt-28">
        <div className="mb-8 sm:mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
            style={{
              borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
              background: "var(--lsw-white)",
              color: "var(--lsw-text-muted)",
            }}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>

        {isLoading && <DetailPageSkeleton />}

        {!isLoading && error && (
          <div
            className="rounded-2xl border p-6 sm:rounded-3xl sm:p-8"
            style={{
              borderColor: "color-mix(in srgb, var(--lsw-error) 35%, transparent)",
              background: "color-mix(in srgb, var(--lsw-error) 10%, var(--lsw-white))",
              color: "var(--lsw-error)",
            }}
          >
            Unable to load project details.
          </div>
        )}

        {!isLoading && !error && !project && (
          <div
            className="rounded-2xl border p-6 sm:rounded-3xl sm:p-8"
            style={{
              borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
              background: "var(--lsw-surface)",
              color: "var(--lsw-text-muted)",
            }}
          >
            Project not found.
          </div>
        )}

        {project && (
          <>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <div className="min-w-0 flex-1">
                <p className="editorial-label">{project.category || "Project"}</p>
                <h1 className="mt-3 break-words text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  {project.title}
                </h1>
                {project.period ? (
                  <p className="mt-2 font-mono text-xs" style={{ color: "var(--lsw-text-muted)" }}>
                    {project.period}
                  </p>
                ) : null}
                {(project.focus || []).length ? (
                  <p className="mt-2 font-mono text-xs" style={{ color: "var(--lsw-text-muted)" }}>
                    Focus: {project.focus.join(" · ")}
                  </p>
                ) : null}
                <p className="mt-4 max-w-2xl text-sm leading-7 sm:mt-5" style={{ color: "var(--lsw-text-muted)" }}>
                  {project.short_description || project.description}
                </p>

                {!!(project.technologies || []).length && (
                  <div className="mt-6 flex flex-wrap gap-2 sm:mt-7">
                    {(project.technologies || []).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border px-3 py-1.5 text-xs sm:py-2"
                        style={{
                          borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
                          background: "var(--lsw-surface)",
                          color: "var(--lsw-text-muted)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
                  {project.live_url ? (
                    <a href={project.live_url} target="_blank" rel="noreferrer" className="lsw-btn-primary w-full px-5 py-3 sm:w-auto">
                      Live demo
                      <span aria-hidden>→</span>
                    </a>
                  ) : null}

                  {project.github_url ? (
                    <a href={project.github_url} target="_blank" rel="noreferrer" className="lsw-btn-secondary w-full px-5 py-3 sm:w-auto">
                      Source code
                      <span aria-hidden>↗</span>
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <ImageGallery
                  featured_image_url={project.featured_image_url}
                  gallery_images={project.gallery_images}
                  alt={project.title}
                />
              </div>
            </div>

            <section className="mt-10 sm:mt-12">
              <h2 className="text-xl font-semibold sm:text-2xl">
                {(project.highlights || []).length ? project.highlights_label || "Key contributions" : "Project summary"}
              </h2>
              <div
                className="mt-4 rounded-2xl border p-5 sm:rounded-3xl sm:p-6"
                style={{
                  borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
                  background: "var(--lsw-surface)",
                }}
              >
                {(project.highlights || []).length ? (
                  <ul className="space-y-3">
                    {project.highlights.map((line) => (
                      <li key={line} className="flex gap-3 text-sm leading-7" style={{ color: "var(--lsw-text-muted)" }}>
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--lsw-warning)" }} />
                        {line}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="whitespace-pre-wrap break-words text-sm leading-7 sm:leading-8" style={{ color: "var(--lsw-text-muted)" }}>
                    {project.description}
                  </p>
                )}
              </div>
            </section>

            {nextProject ? (
              <section className="mt-10 sm:mt-12">
                <h2 className="text-xl font-semibold sm:text-2xl">Next project</h2>
                <div
                  className="mt-4 rounded-2xl border p-5 sm:rounded-3xl sm:p-6"
                  style={{
                    borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
                    background: "var(--lsw-surface)",
                  }}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--lsw-text-muted)" }}>
                        {nextProject.category}
                      </p>
                      <p className="mt-2 break-words text-lg font-semibold">{nextProject.title}</p>
                    </div>
                    <Link to={`/projects/${nextProject.slug}`} className="lsw-btn-primary w-full shrink-0 px-4 py-2 sm:w-auto">
                      View
                    </Link>
                  </div>
                </div>
              </section>
            ) : null}
          </>
        )}
      </main>
    </div>
  );
}
