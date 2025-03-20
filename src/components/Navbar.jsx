import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.jpg";
import { SiLeetcode } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { SiRefinedgithub } from "react-icons/si";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const Links = [
    { href: "#skills", name: "Skills" },
    { href: "#projects", name: "Projects" },
    { href: "#certificates", name: "Certificates" },
    { href: "#contact", name: "Contact" },
  ];

  const socialLinks = [
    {
      href: "https://github.com/singh-gaurav04",
      icon: <SiRefinedgithub />,
      label: "Github",
    },
    {
      href: "https://leetcode.com/u/Gaurav__04/",
      icon: <SiLeetcode />,
      label: "Leetcode",
    },
    {
      href: "https://www.linkedin.com/in/gaurav-singh-a21a36251/",
      icon: <FaLinkedin />,
      label: "LinkedIn",
    },
  ];

  return (
    <motion.nav
      className=' px-2 py-4 h-full'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className='container flex flex-col items-center justify-between h-full '>
        {/* Left: Logo */}
        <a 
        href="#home"
        className='text-white text-lg font-bold cursor-pointer flex gap-3 items-center'>
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={logo}
            alt='GS'
            className='h-[6vw] w-[6vw] md:h-[5vw] md:w-[5vw] rounded-full shadow-[0_0_10px_#ffffff] '
          />
        </a>

        <div className='flex flex-col gap-[10vh]'>
          {Links.map((link, index) => (
            <motion.a
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              key={index}
              href={link.href} // Anchor link to the section
              className='text-white text-md font-bold cursor-pointer flex justify-center'
            >
              <span className='transform -rotate-90 hover:text-[#967AA1]'>{link.name}</span>
            </motion.a>
          ))}
        </div>

        <motion.div className='flex flex-col-reverse md:flex-row gap-3 '>
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-300 hover:text-white flex items-center gap-2 text-lg'
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* <Footer /> */}
      </div>
    </motion.nav>
  );
};

export default Navbar;
