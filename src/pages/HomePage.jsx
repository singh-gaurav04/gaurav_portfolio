import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Services from "../components/Services";
import RealProjects from "../components/RealProjects";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Footer from "../components/Footer";
import SeoHead from "../components/SeoHead";
import {
  CertificationsSkeleton,
  ContactSkeleton,
  ExperienceSkeleton,
  FeedbackSkeleton,
} from "../components/Skeleton";
import { useApp } from "../hooks";
import { trackVisit } from "../api/public";

const Experience = lazy(() => import("../components/Experience"));
const Certifications = lazy(() => import("../components/Certifications"));
const SeoFaq = lazy(() => import("../components/SeoFaq"));
const Feedback = lazy(() => import("../components/Feedback"));
const Contact = lazy(() => import("../components/Contact"));
const Chatbot = lazy(() => import("../components/chatbot/Chatbot"));

export default function HomePage() {
  const { isBotOpen, setIsBotOpen } = useApp();
  const [loadChatbot, setLoadChatbot] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("visited")) return;
    trackVisit({
      page: window.location.href,
      userAgent: navigator.userAgent,
      referrer: document.referrer,
    }).catch(() => {});
    localStorage.setItem("visited", "true");
  }, []);

  useEffect(() => {
    const hash = window.location.hash?.replace("#", "");
    if (!hash) return;
    const timer = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 120);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isBotOpen) {
      setLoadChatbot(true);
      return undefined;
    }

    const timer = window.setTimeout(() => {
      import("../components/chatbot/Chatbot").catch(() => {});
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [isBotOpen]);

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "var(--lsw-background)", color: "var(--lsw-text)" }}>
      <SeoHead includeHomeSchemas path="/" />
      <div className="site-grain" />
      <Navbar />
      <main className="relative z-10 overflow-x-hidden pt-20">
        <Hero />
        <Stats />
        <Services />
        <RealProjects />
        <Projects />
        <Skills />
        <Suspense fallback={<ExperienceSkeleton />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<CertificationsSkeleton />}>
          <Certifications />
        </Suspense>
        <Suspense fallback={null}>
          <SeoFaq />
        </Suspense>
        <Suspense fallback={<FeedbackSkeleton />}>
          <Feedback />
        </Suspense>
        <Suspense fallback={<ContactSkeleton />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      {loadChatbot ? (
        <Suspense fallback={null}>
          <Chatbot isOpen={isBotOpen} setIsOpen={setIsBotOpen} />
        </Suspense>
      ) : null}
    </div>
  );
}
