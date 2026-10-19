import { lazy, Suspense, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import RealProjects from "../components/RealProjects";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import SeoHead from "../components/SeoHead";
import { ContactSkeleton, ExperienceSkeleton } from "../components/Skeleton";

const Experience = lazy(() => import("../components/Experience"));
const Achievements = lazy(() => import("../components/Achievements"));
const Education = lazy(() => import("../components/Education"));
const Contact = lazy(() => import("../components/Contact"));

export default function HomePage() {
  useEffect(() => {
    const hash = window.location.hash?.replace("#", "");
    if (!hash) return;
    const timer = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 120);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "var(--lsw-background)", color: "var(--lsw-text)" }}>
      <SeoHead path="/" />
      <div className="site-grain" />
      <Navbar />
      <main className="relative z-10 overflow-x-hidden pt-20">
        <Hero />
        <About />
        <Skills />
        <Suspense fallback={<ExperienceSkeleton />}>
          <Experience />
        </Suspense>
        <RealProjects />
        <Projects />
        <Suspense fallback={null}>
          <Achievements />
        </Suspense>
        <Suspense fallback={null}>
          <Education />
        </Suspense>
        <Suspense fallback={<ContactSkeleton />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
