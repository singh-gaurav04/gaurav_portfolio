import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Mail,
  Download,
  Github,
  Linkedin,
  Code,
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import { useEffect, useState } from "react";
import SplitText from "./SplitText";
import axios from "axios";

export default function LeftHero() {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const sendVisit = async () => {
      try {
        await axios.post("https://mychatbot-app.onrender.com/track-visit", {
          page: "resume downloaded",
          userAgent: navigator.userAgent,
          referrer: document.referrer,
        });
      } catch (err) {
        console.error("Tracking error:", err);
      }
    };

    sendVisit();
    setIsClicked(false);
  }, [isClicked]);

  // Mock data for the example to work standalone
  const { personal, social } = portfolioData;

  // Framer motion variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour < 12) {
      setGreeting("Hey,Good Morning ☀️");
    } else if (hour < 18) {
      setGreeting("Hey,Good Afternoon 🌤️");
    } else {
      setGreeting("Hey,Good Evening 🌙");
    }
  }, []);

  return (
    // Outer container with a dark background (slate-950)
    <div className=" flex flex-col px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-500/30">
      {/* Main Content Wrapper */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-center items-center text-center space-y-6 sm:space-y-8 max-w-4xl w-full mt-10 b"
      >
        <motion.div variants={itemVariants} className="">
          <div>
            <SplitText
              text={greeting}
              className="text-3xl sm:text-4xl lg:text-5xl text-center font-extrabold"
              delay={150}
              duration={1.5}
              ease="bounce.out"
              splitType="chars"
              from={{ opacity: 0, y: 100 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              showCallback
            />
          </div>
        </motion.div>

        {/* Name with Gradient */}

        <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-emerald-400">
          Gaurav Here
        </div>

        {/* Short Intro */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base lg:text-md text-slate-500 leading-relaxed max-w-2xl px-4 sm:px-0"
        >
          I’m{" "}
          <span
            className="        bg-[linear-gradient(90deg,#ff6b6b,#4ecdc4,#45b7d1,#96ceb4,#feca57,#ff9ff3,#ff6b6b)]
          bg-clip-text text-transparent"
          >
            AI/ML
          </span>{" "}
          engineer with strong problem-solving skills in data structures and
          algorithms, experienced in building real-world, scalable, and
          data-driven applications.
        </motion.p>

        {/* CTA Buttons & Socials */}
        <motion.div
          variants={itemVariants}
          className="flex  items-center justify-center gap-4 sm:gap-6 lg:gap-8 pt-4 w-full"
        >
          {/* Contact Button (Primary) */}
          <div className="relative">
            {/* Animated Border Layer */}
            <span
              className="
        absolute inset-0 rounded-full p-[2px]
        bg-[linear-gradient(90deg,#ff6b6b,#4ecdc4,#45b7d1,#96ceb4,#feca57,#ff9ff3,#ff6b6b)]
        bg-[length:200%_100%]
        animate-[borderFlow_4s_linear_infinite]
        blur-[6px] opacity-70
        group-hover:opacity-100
      "
            ></span>

            {/* Inner Button */}
            <a
              href="mailto:gaurav26lnct@gmail.com?subject=Let's%20Connect&body=Hi%20Gaurav,"
              className="
        relative  px-6 py-3
        rounded-full bg-green-300 text-black font-semibold
        transition transform duration-200
        hover:scale-105 active:scale-95
        flex gap-2 items-center justify-center
        min-w-[140px]
      "
            >
              <Mail /> Contact
            </a>
          </div>

          {/* Resume Button (Secondary/Outline) */}

          <div className="relative">
            {/* Animated Border Layer */}
            <span
              className="
        absolute inset-0 rounded-full p-[2px]
        bg-[linear-gradient(90deg,#ff6b6b,#4ecdc4,#45b7d1,#96ceb4,#feca57,#ff9ff3,#ff6b6b)]
        bg-[length:200%_100%]
        animate-[borderFlow_4s_linear_infinite]
        blur-[6px] opacity-70
        group-hover:opacity-100
        
      "
            ></span>

            {/* Inner Button */}
            <a
              href="/assets/documents/Resume.pdf"
              download="Gaurav_Resume.pdf"
              onClick={()=>setIsClicked(true)}
              className="
        relative  px-6 py-3
        rounded-full bg-black text-white font-semibold
        transition transform duration-200
        hover:scale-105 active:scale-95
        flex gap-2 items-center justify-center
        min-w-[140px]
        cursor-pointer
      "
            >
              <Download /> Resume
            </a>
          </div>
        </motion.div>

        {/* Social Icons Row */}
        
      </motion.div>
      <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-3 mt-6"
        >
          {/* GitHub */}
          <a
            href="https://github.com/singh-gaurav04"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Gaurav's GitHub"
            className="
              group p-4 rounded-xl
              bg-slate-900 border border-slate-800
              text-slate-400
              flex items-center justify-center
              transition-all duration-300
              hover:text-white hover:border-slate-600 hover:bg-slate-800 hover:scale-110 hover:shadow-lg
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500
            "
          >
            <Github className="h-5 w-5" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/gaurav26lnct/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Gaurav's LinkedIn"
            className="
              group p-4 rounded-xl
              bg-slate-900 border border-slate-800
              text-slate-400
              flex items-center justify-center
              transition-all duration-300
              hover:text-white hover:border-slate-600 hover:bg-slate-800 hover:scale-110 hover:shadow-lg
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500
            "
          >
            <Linkedin className="h-5 w-5" />
          </a>

          {/* LeetCode */}
          <a
            href="https://leetcode.com/u/Gaurav__04/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Gaurav's LeetCode"
            className="
              group p-4 rounded-xl
              bg-slate-900 border border-slate-800
              text-slate-400
              flex items-center justify-center
              transition-all duration-300
              hover:text-white hover:border-slate-600 hover:bg-slate-800 hover:scale-110 hover:shadow-lg
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500
              cursor-pointer
            "
          >
            <Code className="h-5 w-5" />
          </a>
        </motion.div>
    </div>
  );
}
