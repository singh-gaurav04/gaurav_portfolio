import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppProvider } from "./contexts/AppContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Bot from "./components/Bot";
import { useApp } from "./hooks";
import axios from "axios";
import LightRays from "./components/LightRays";
import SplashCursor from "./components/SplashCursor";

import { useEffect } from "react";

function AppContent() {
  const { isBotOpen, setIsBotOpen } = useApp();

  useEffect(() => {
    const sendVisit = async () => {
      try {
        await axios.post("https://mychatbot-app.onrender.com/track-visit", {
          page: window.location.href,
          userAgent: navigator.userAgent,
          referrer: document.referrer,
        });
      } catch (err) {
        console.error("Tracking error:", err);
      }
    };

    // prevent spam (send only once per user)
    if (!localStorage.getItem("visited")) {
      sendVisit();
      localStorage.setItem("visited", "true");
    }
  }, []);

  return (
    <div className="overflow-x-hidden min-h-screen bg-[#120F17] text-white transition-colors duration-300">
      <div style={{ width: "100%", height: "600px", position: "absolute" }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      {/* <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE={true}
        COLOR="#A855F7"
      /> */}
      <Navbar />
      <main className="pt-20">
        <Hero />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <Bot isOpen={isBotOpen} setIsOpen={setIsBotOpen} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
