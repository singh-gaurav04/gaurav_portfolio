import React, { useState, useEffect } from "react";
import Projects from "./components/Projects";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import Certificates from "./components/Certificates";
import Skills from "./components/Skills";
import LocomotiveScroll from "locomotive-scroll";
import Loader from "./components/Loader";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import preloader from "./assets/animation/preloader.json";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // Simulate loading for 2 seconds
    // return () => clearTimeout(timer);
  }, []);

  const locomotiveScroll = new LocomotiveScroll();

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen bg-[#1B1B1D]'>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 ,ease:'linear'}}
        >
         <Lottie animationData={preloader} loop={true} />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div

      className='grid grid-cols-14 h-screen text-[#967AA1] bg-[url("/bgimage.jpg")]   bg-cover '
    >
      <div className=' col-span-1 md:col-span-1 h-full overflow-hidden '>
        <Navbar />
      </div>
      <div
        style={{
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none", // For IE and Edge
        }}
        className='col-span-13 md:col-span-13 overflow-auto border-r-2 border-gray-700 pt-4 overflow-x-hidden'
      >
        <div id='home'>
          <Hero />
        </div>

        <div id='projects'>
          <Projects />
        </div>
        <div id='certificates'>
          <Certificates />
        </div>
        <div id='skills'>
          <Skills />
        </div>
        <div id='contact'>
          <Contact />
        </div>
        <Footer />
      </div>
    </motion.div>
  );
}

export default App;
