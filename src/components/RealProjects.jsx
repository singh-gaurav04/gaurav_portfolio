import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { usePortfolio } from "../hooks/usePortfolio";
import { animationVariants } from "../lib/motion";
import RealProjectCard from "./RealProjectCard";
import { ProjectCardSkeleton } from "./Skeleton";

const PREVIEW_LIMIT = 3;

export default function RealProjects() {
  const { data, isLoading } = usePortfolio();
  const projects = data.real_projects || [];
  const preview = projects.slice(0, PREVIEW_LIMIT);
  const hasMore = projects.length > PREVIEW_LIMIT;

  return (
    <section id="real-projects" className="px-4 py-12">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="editorial-label">Real work</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl" style={{ color: "var(--lsw-text)" }}>
              REAL PROJECTS
            </h2>

          </div>

          <div
            className="rounded-2xl border px-5 py-3 text-sm font-semibold"
            style={{
              borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
              background: "var(--lsw-surface)",
              color: "var(--lsw-warning)",
            }}
          >
            {projects.length} published
          </div>
        </div>

        {isLoading && <ProjectCardSkeleton count={3} columns="md:grid-cols-2 xl:grid-cols-3" />}

        {!isLoading && !projects.length && (
          <div
            className="rounded-3xl border border-dashed p-10 text-center"
            style={{
              borderColor: "color-mix(in srgb, var(--lsw-border) 20%, transparent)",
              color: "var(--lsw-text-muted)",
            }}
          >
            Real projects will appear here once marked as &quot;Real project&quot; in the admin CMS.
          </div>
        )}

        {!isLoading && preview.length > 0 && (
          <>
            <motion.div
              variants={animationVariants.container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {preview.map((project, index) => (
                <RealProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>

            {hasMore && (
              <div className="mt-6 flex justify-center">
                <Link to="/real-projects" className="lsw-btn-primary px-6 py-3">
                  View more projects <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
