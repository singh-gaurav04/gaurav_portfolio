import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Services from "../components/Services";

export default function ServicesPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--lsw-background)", color: "var(--lsw-text)" }}>
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
