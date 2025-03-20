import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Button2 from "./Button2";
import Button1 from "./Button1";

const photos = [
  "public/IMG_20240914_134557514.jpg",
  "public/IMG_20230506_111823338.jpg",
  "public/Screenshot_20241229-141117.png",
  "public/IMG_20240309_144317531.jpg",
  "public/20240611_215645.jpg",
  "public/Screenshot_20241229-141418.png",
];

const Hero = () => {
  const text = "Full_Stack_Developer";

  return (
    <motion.section
      className='flex flex-col gap-4 md:flex-row items-center py-[5vw] justify-between h-auto md:px-8 rounded-2xl'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 3 }}
    >
      {/* Left Section: Text and Button */}
      <div className='flex flex-col items-start justify-center px-[3vw] w-full md:w-1/2 space-y-6 text-left md:px-[1vw]'>
        <motion.h1
          className='text-5xl font-bold '
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          I'm {" "}
          <span className='font-bold text-[#160ba4]'>
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{opacity:0, y: -20 }} // Fixed x value
                animate={{opacity:1, y: 0 }}
                transition={{
                  delay: index * 0.1, // Staggered animation for smooth effect
                  duration: 0.3,
                  ease: "easeInOut",
                  repeat: Infinity, // Keeps repeating
                  repeatDelay: 3, // Adds a delay between repeats
                }}
                style={{ display: "inline-block" }} // Prevents spacing issues
              >
                {char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p
          className='text-md text-left '
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          I'm <span className="font-bold  text-[#949cd0]">Gaurav singh</span>, a third-year B. Tech student in the Artificial
          Intelligence and Machine Learning <span className="font-bold text-[#77df93]">(AIML)</span> department at Lakshmi Narain
          College of Technology, Bhopal. My skills span multiple programming
          languages, including <span className="text-red-400 bold">C++</span> and <span className="font-bold text-pink-600">Python</span>, and I have a solid
          understanding of data structures and algorithms. I have also worked on
          frontend projects as well as <span className="font-bold text-cyan-400">Full Stack Projects</span>, which have strengthened my development expertise. I
          enjoy problem-solving and am passionate about learning new
          technologies to build innovative solutions.
        </motion.p>
        <div className='flex space-x-4'>
          <a href='/gaurav_resume.pdf' download>
            <Button2 name='Resume' />
          </a>
          <a href='https://www.linkedin.com/in/gaurav26lnct/' target="_blank">
            <Button1 />
          </a>
        </div>
      </div>

      {/* Right Section: Swiper Slider */}
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={2}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 1000, disableOnInteraction: true }}
        className='rounded-lg overflow-hidden w-full md:w-1/2'
      >
        {photos.map((photo, index) => (
          <SwiperSlide
            key={index}
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 1000, disableOnInteraction: true }}
            className='rounded-lg overflow-hidden '
          >
            <div className='flex justify-center items-center py-8'>
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                src={photo}
                alt='slider'
                className='w-[70%] h-[350px] object-cover shadow-[0_0_10px_#ffffff] blur-[1px] rounded-lg contrast-125'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
};

export default Hero;
