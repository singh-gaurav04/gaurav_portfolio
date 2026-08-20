import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { getProjectBySlug } from "../api/public";
import ImageGallery from "../components/ImageGallery";
import { usePortfolio } from "../hooks/usePortfolio";
import { DetailPageSkeleton } from "../components/Skeleton";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { data: portfolio } = usePortfolio();

  const { data, isLoading, error } = useQuery({
    queryKey: ["project", slug],
    queryFn: async () => {
      if (!slug) return null;
      const res = await getProjectBySlug(slug);
      return res?.data || res;
    },
    enabled: !!slug,
  });

  const project = data || null;
  const realProjects = portfolio?.real_projects || [];

  const nextProject = useMemo(() => {
    if (!project || !realProjects.length) return null;
    const idx = realProjects.findIndex((p) => p.slug === project.slug);
    if (idx === -1) return realProjects[0] || null;
    return realProjects[idx + 1] || realProjects[0] || null;
  }, [project, realProjects]);

  return (
    <div className="min-h-screen" style={{ background: "var(--lsw-background)", color: "var(--lsw-text)" }}>
      <main className="relative z-10 mx-auto max-w-6xl px-4 pt-24 pb-24">
        <div className="mb-10">
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
            className="rounded-3xl border p-8"
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
            className="rounded-3xl border p-8"
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
              <div className="flex-1">
                <p className="editorial-label">{project.category || "Project"}</p>
                <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">{project.title}</h1>
                <p className="mt-5 max-w-2xl text-sm leading-7" style={{ color: "var(--lsw-text-muted)" }}>
                  {project.short_description || project.description}
                </p>

                {!!(project.technologies || []).length && (
                  <div className="mt-7 flex flex-wrap gap-2">
                    {(project.technologies || []).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border px-3 py-2 text-xs"
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

                <div className="mt-9 flex flex-wrap gap-3">
                  {project.live_url ? (
                    <a href={project.live_url} target="_blank" rel="noreferrer" className="lsw-btn-primary px-5 py-3">
                      Live demo
                      <span aria-hidden>→</span>
                    </a>
                  ) : null}

                  {project.github_url ? (
                    <a href={project.github_url} target="_blank" rel="noreferrer" className="lsw-btn-secondary px-5 py-3">
                      Source code
                      <span aria-hidden>↗</span>
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="flex-1">
                <ImageGallery
                  featured_image_url={project.featured_image_url}
                  gallery_images={project.gallery_images}
                  alt={project.title}
                />
              </div>
            </div>

            <section className="mt-12">
              <h2 className="text-2xl font-semibold">Project summary</h2>
              <div
                className="mt-4 rounded-3xl border p-6"
                style={{
                  borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
                  background: "var(--lsw-surface)",
                }}
              >
                <p className="whitespace-pre-wrap text-sm leading-8" style={{ color: "var(--lsw-text-muted)" }}>
                  {project.description}
                </p>
              </div>
            </section>

            {nextProject ? (
              <section className="mt-12">
                <h2 className="text-2xl font-semibold">Next real project</h2>
                <div
                  className="mt-4 rounded-3xl border p-6"
                  style={{
                    borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
                    background: "var(--lsw-surface)",
                  }}
                >
                  <div className="flex items-center justify-between gap-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--lsw-text-muted)" }}>
                        {nextProject.category}
                      </p>
                      <p className="mt-2 text-lg font-semibold">{nextProject.title}</p>
                    </div>
                    <Link to={`/projects/${nextProject.slug}`} className="lsw-btn-primary px-4 py-2">
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
