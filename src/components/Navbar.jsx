import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, MapPin, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import { portfolioData } from "../data/portfolioData";

const Navbar = () => {
  const { personal } = portfolioData;
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();
  const [lastScroll, setLastScroll] = useState(0);

  // 🔥 Detect scroll direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastScroll && latest > 80) {
      setHidden(true); // scroll down → hide
    } else {
      setHidden(false); // scroll up → show
    }
    setLastScroll(latest);
  });

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const navItems = portfolioData.navigation.map((item) => ({
    ...item,
    id: item.href.replace("#", ""),
  }));

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: hidden ? -120 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full z-50 flex justify-center"
      style={{
        perspective: "1000px",
      }}
    >
      {/* 🔥 3D Container */}
      <motion.div
        whileHover={{ rotateX: 2, rotateY: -2 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-[90%] mt-4 px-6 py-3 flex items-center justify-between
        rounded-2xl
        bg-white/10 backdrop-blur-xl
        border border-white/20
        shadow-[0_10px_30px_rgba(0,0,0,0.25)]
        "
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Left - Location */}
        <div className="flex gap-2">
          <div className="scale-95 md:scale-100 flex items-center space-x-2 text-white bg-white/10 px-4 py-2 rounded-full border border-white/20">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{personal.location}</span>
          </div>

          <div className=" scale-95 md:scale-100 flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all hover:bg-emerald-500/20 hover:scale-105 cursor-default">
            {/* Pulsing dot indicator */}
            <span className="relative flex h-2.5 w-2.5 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <Briefcase className="h-4 w-4 hidden md:block" />
            <span>Open to Work</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <motion.button
              key={item.name}
              whileHover={{
                scale: 1.1,
                rotateZ: 1,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(item.id)}
              className="text-white font-medium tracking-wide hover:text-primary transition"
            >
              {item.name}
            </motion.button>
          ))}

          <Button
            onClick={() => scrollToSection("contact")}
            className="ml-4 rounded-full"
          >
            Get In Touch
          </Button>
        </div>

        {/* Mobile Menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </motion.div>

      {/* Mobile Dropdown */}
      {
        isOpen && isOpen && <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : -2,
        }}
        className="absolute top-20 w-[90%] md:hidden
    bg-white/10 backdrop-blur-xl
    border border-white/20
    rounded-xl p-4 bg-red"
  
      >
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => scrollToSection(item.id)}
            className="block w-full text-left py-2 text-white"
          >
            {item.name}
          </button>
        ))}

        <Button
          onClick={() => scrollToSection("contact")}
          className="w-full mt-3"
        >
          Get In Touch
        </Button>
      </motion.div>
      }
      
    </motion.nav>
  );
};

export default Navbar;
