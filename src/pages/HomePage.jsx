import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Services from "../components/Services";
import RealProjects from "../components/RealProjects";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Certifications from "../components/Certifications";
import Feedback from "../components/Feedback";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Chatbot from "../components/chatbot/Chatbot";
import { useApp } from "../hooks";
import { trackVisit } from "../api/public";

export default function HomePage() {
  const { isBotOpen, setIsBotOpen } = useApp();

  useEffect(() => {
    if (localStorage.getItem("visited")) return;
    trackVisit({
      page: window.location.href,
      userAgent: navigator.userAgent,
      referrer: document.referrer,
    }).catch(() => {});
    localStorage.setItem("visited", "true");
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "var(--lsw-background)", color: "var(--lsw-text)" }}>
      <div className="site-grain" />
      <Navbar />
      <main className="relative z-10 overflow-x-hidden pt-20">
        <Hero />
        <Stats />
        <Services />
        <RealProjects />
        <Projects />
        <Skills />
        <Experience />
        <Certifications />
        <Feedback />
        <Contact />
      </main>
      <Footer />
      <Chatbot isOpen={isBotOpen} setIsOpen={setIsBotOpen} />
    </div>
  );
}
