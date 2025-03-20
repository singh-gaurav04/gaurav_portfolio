import React from "react";
import Projects from "./components/Projects";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import Certificates from "./components/Certificates";
import Skills from "./components/Skills";
import LocomotiveScroll from "locomotive-scroll";


function App() {
  const locomotiveScroll = new LocomotiveScroll();
  return (
    <div className='grid grid-cols-14 h-screen text-[#967AA1] bg-[url("/bgimage.jpg")]  bg-cover '>
      <div className=' col-span-1 md:col-span-1 h-full overflow-hidden '>
        <Navbar />
      </div>
      <div
        style={{
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none", // For IE and Edge
        }}
        className='col-span-13 md:col-span-13 overflow-auto border-r-2 border-gray-700 pt-4 '
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
    </div>
  );
}

export default App;
