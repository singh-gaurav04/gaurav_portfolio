import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import leetcode from '../assets/leetcode.png'
import { Pagination, Keyboard, Autoplay } from "swiper/modules";
import { SiLeetcode } from "react-icons/si";
import Button3 from "./Button3";

const certificatesData = [
  {
    image: `${leetcode}`,
    title: "Solved 400+ problems on leetcode",
    link : "https://leetcode.com/u/Gaurav__04/",
    linkname : "LeetCode"
  },
  {
    image: '/nptel.png',
    title: "Nptel Certified - DBMS",
    link : "https://www.linkedin.com/posts/gaurav26lnct_nptel-dbms-learningjourney-activity-7250167908792733696-xxht?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD5EaTkBIwCuXq9XuKNcTmMwzhE2gIMt6Tc",
    linkname : "NPTEL"
  },
  {
    image: '/gdsc.jpg',
    title: "Top Performer in GDSC",
    link : "https://www.linkedin.com/posts/gaurav26lnct_frontenddevelopment-google-googledsc-activity-7120759288867807232-TCnA?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD5EaTkBIwCuXq9XuKNcTmMwzhE2gIMt6Tc",
    linkname : "GDSC"
  },
  {
    image: '/hackerrank.png',
    title: "Problem Solving on HackerRank",
    link:"https://www.hackerrank.com/certificates/105dcc1918a8",
    linkname : "HackerRank"
  },
 
  {
    image: '/mlsa.jpg',
    title: "Open Source Contributor Worshop",
    link : "https://www.linkedin.com/posts/gaurav26lnct_opensource-github-git-activity-7123924636513280000-TxwF?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD5EaTkBIwCuXq9XuKNcTmMwzhE2gIMt6Tc",
    linkname : "Open Source"
  },
  {
    image: '/internship.jpg',
    title: "Internship at TechnoHacks ",
    link : "https://www.linkedin.com/posts/gaurav26lnct_webdevelopment-internship-careerjourney-activity-7125666702985506816-y4rq?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD5EaTkBIwCuXq9XuKNcTmMwzhE2gIMt6Tc",
    linkname : "Internship"
  },

 
];

const Certificates = () => {
  return (
    <div className="py-10 ">
      <div className="container mx-auto px-5">
        <motion.h2
          className="text-4xl font-bold text-center mb-8 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Achievements
        </motion.h2>
        <Swiper
          modules={[Pagination, Keyboard,Autoplay]}
          pagination={{ clickable: true }}
          keyboard={{ enabled: true }}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{delay: 3000, disableOnInteraction: false}}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
          className="mySwiper "
        >
          {certificatesData.map((certificate, index) => (
            // main slider
            <SwiperSlide key={index}
            >
              {/*  slider divide into two parts col wise*/}
              <motion.div
                className=" rounded-lg shadow-lg overflow-hidden py-[2vh] flex flex-col items-center justify-center"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* ek side ye */}
                <div className="flex justify-center items-center">
                <motion.img
                initial={{ y: -10 }}
                animate={{
                  y: 0,
                  transition: {
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}}
                  src={certificate.image}
                  alt={certificate.title}
                  className="w-[70%] h[250px] shadow-[0_0_10px_#ffffff] object-fill rounded-md"
                />
                </div>

                {/* dusra side ye */}
                <div className="p-5 flex flex-col gap-[1vw] w-full justify-center items-center">
                  <h3 className="text-2xl font-bold mb-2 text-center">
                    {certificate.title}
                  </h3>
                  <a className="" href={certificate.link}><Button3 name={certificate.linkname} icon={SiLeetcode}/></a>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Certificates;
