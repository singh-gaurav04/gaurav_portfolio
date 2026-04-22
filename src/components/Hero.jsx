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

const Hero = () => {
  const { personal, social } = portfolioData;
  const containerVariants = animationVariants.container;
  const itemVariants = animationVariants.item;
  const imageVariants = animationVariants.image;

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center pt-16 pb-20 md:px-4 "
    >
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center justify-center"
        >
          {/* Content */}

          <div className="space-y-8 px-4 lg:px-0">
            {/* Location + Open to Work */}
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{personal.location}</span>
              </div>

              <div className="flex items-center space-x-3 text-green-500 font-medium">
                <Briefcase className="h-5 w-5" />
                <span>Open to Work</span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold text-foreground leading-tight"
            >
              Hi, I'm <span className="text-primary">Gaurav</span>
            </motion.h1>

            {/* Short Intro */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground leading-relaxed max-w-2xl"
            >
              I’m a passionate AIML student who loves building real-world
              projects, solving DSA problems, and creating clean, scalable web
              applications.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="group "
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Mail className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                Contact Me
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="group bg-green-800 "
                onClick={() => window.open(personal.resumeUrl, "_blank")}
              >
                <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                Resume
              </Button>
            </motion.div>
          </div>

          {/* Profile Image */}
          <div className="h-full w-full flex items-center justify-center">
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
              className="cursor-pointer"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
