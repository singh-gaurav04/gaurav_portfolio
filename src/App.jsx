import React from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { AppProvider } from './contexts/AppContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Bot from './components/Bot'
import { useApp } from './hooks'

import { useEffect } from 'react'

function AppContent() {
  const { isBotOpen, setIsBotOpen } = useApp()

 useEffect(() => {
    const sendVisit = async () => {
      try {
        await axios.post("https://your-backend.com/track-visit", {
          page: window.location.href,
          userAgent: navigator.userAgent,
          referrer: document.referrer
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
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  )
}

export default App
