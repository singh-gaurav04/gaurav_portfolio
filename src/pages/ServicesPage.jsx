import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import SeoHead from "../components/SeoHead";

export default function ServicesPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--lsw-background)", color: "var(--lsw-text)" }}>
      <SeoHead
        title="AI Development Services — RAG, Agents, Chatbots, FastAPI"
        description="Browse AI engineering services: GenAI, RAG systems, LangChain agents, AI chatbots, and FastAPI backends. Hire Gaurav Singh for AI and software projects."
        path="/services"
        />
      <div className="site-grain" />
      <Navbar />
      <main className="relative z-10 px-4 pb-24 pt-28">
        <div className="container mx-auto max-w-7xl">
          <Link to="/#services" className="lsw-btn-secondary mb-6 px-4 py-2">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <Services previewLimit={null} showViewAll={false} />
        </div>
      </main>
    </div>
  );
}
