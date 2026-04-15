import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Bot from './components/Bot'

function Home({ onOpenBot }) {
  return (
    <>
      <Hero />
      <Projects openBot={onOpenBot} />
      <Skills />
      <Certifications />
      <Contact />
    </>
  )
}

function App() {
  const [isBotOpen, setIsBotOpen] = useState(false)
  const openBot = () => setIsBotOpen(true)

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <Navbar />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<Home onOpenBot={openBot} />} />
              <Route path="/projects" element={<Projects openBot={openBot} />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <Bot isOpen={isBotOpen} setIsOpen={setIsBotOpen} />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
