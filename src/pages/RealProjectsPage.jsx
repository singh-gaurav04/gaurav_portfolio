import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import RealProjectCard from "../components/RealProjectCard";
import SeoHead from "../components/SeoHead";
import { usePortfolio } from "../hooks/usePortfolio";
import { animationVariants } from "../lib/motion";
import { ProjectCardSkeleton } from "../components/Skeleton";

export default function RealProjectsPage() {
  const { data, isLoading } = usePortfolio();
  const projects = data.real_projects || [];

  return (
    <div className="min-h-screen" style={{ background: "var(--lsw-background)", color: "var(--lsw-text)" }}>
      <SeoHead
        title="Featured Projects"
        description="Featured projects by Gaurav Singh — LocalShopWala, LinkedIn Scouting Agent, and an AI Personal Assistant built with GenAI, RAG, and FastAPI."
        path="/real-projects"
      />
      <div className="site-grain" />
      <Navbar />
      <main className="relative z-10 px-4 pb-24 pt-28">
        <div className="container mx-auto max-w-7xl">
          <Link to="/#real-projects" className="lsw-btn-secondary mb-8 px-4 py-2">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <div className="mb-12 max-w-2xl">
            <p className="editorial-label">Projects</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Featured projects</h1>
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
              className="grid gap-6 md:grid-cols-2"
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
