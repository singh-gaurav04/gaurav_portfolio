import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import RealProjectCard from "../components/RealProjectCard";
import { usePortfolio } from "../hooks/usePortfolio";
import { animationVariants } from "../lib/motion";
import { ProjectCardSkeleton } from "../components/Skeleton";

export default function RealProjectsPage() {
  const { data, isLoading } = usePortfolio();
  const projects = data.real_projects || [];

  return (
    <div className="min-h-screen" style={{ background: "var(--lsw-background)", color: "var(--lsw-text)" }}>
      <div className="site-grain" />
      <Navbar />
      <main className="relative z-10 px-4 pb-24 pt-28">
        <div className="container mx-auto max-w-7xl">
          <Link to="/#real-projects" className="lsw-btn-secondary mb-8 px-4 py-2">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <div className="mb-12 max-w-2xl">
            <p className="editorial-label">Real work</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">All real projects</h1>
            <p className="mt-4" style={{ color: "var(--lsw-text-muted)" }}>
              Complete portfolio of shipped work with case studies, source code, and live demos.
            </p>
          </div>

          {isLoading && <ProjectCardSkeleton count={6} columns="md:grid-cols-2 xl:grid-cols-3" />}

          {!isLoading && !projects.length && (
            <div
              className="rounded-3xl border border-dashed p-10 text-center"
              style={{
                borderColor: "color-mix(in srgb, var(--lsw-border) 20%, transparent)",
                color: "var(--lsw-text-muted)",
              }}
            >
              No real projects published yet.
            </div>
          )}

          {!isLoading && projects.length > 0 && (
            <motion.div
              variants={animationVariants.container}
              initial="hidden"
              animate="visible"
              className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {projects.map((project, index) => (
                <RealProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
