import React from "react";
import { motion } from "framer-motion";
import {
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Calendar,
  Code,
  Briefcase,
} from "lucide-react";
import { Button } from "./ui/button";
import { portfolioData, animationVariants } from "../data/portfolioData";
import ProfileCard from "./ProfileCard";
import LeftHero from "./LeftHero";
import LightRays from './LightRays';

const Hero = () => {
  const { personal, social } = portfolioData;
  const containerVariants = animationVariants.container;
  const itemVariants = animationVariants.item;
  const imageVariants = animationVariants.image;

  return (
    <section
      id="about"
      className="h-full flex items-center justify-center  py-8 "
    >
      <div className="container h-full  lg:mx-auto max-w-7xl ">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          {/* Content */}

          <LeftHero />

          {/* Profile Image */}
          <div className="h-full w-full flex items-center justify-center order-first lg:order-last">
            <ProfileCard
              name="Gaurav Singh"
              title="Gen AI Engineer"
              handle="javicodes"
              status="Online"
              contactText="Contact Me"
              avatarUrl="/logo.png"
              showUserInfo={false}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => console.log("Contact clicked")}
              behindGlowColor="rgba(125, 190, 255, 0.67)"
              iconUrl="/logo.png"
              behindGlowEnabled
              innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
              className="cursor-pointer pb-10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
