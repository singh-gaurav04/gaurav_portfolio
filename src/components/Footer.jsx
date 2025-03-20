import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-2  ">
      <div className="h-0.5 w-[90%] mx-auto bg-[#354F52] mb-2"></div>
      <div className="container mx-auto px-5 text-center">

        <motion.div
          className="flex justify-center space-x-6 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.a
            href="https://www.linkedin.com/in/gaurav26lnct/"
            target="_blank"
            rel="noopener noreferrer"
            className=" hover:text-blue-400 text-2xl"
            whileHover={{ scale: 1.2 }}
            whileTap={{scale:0.9}}
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href="https://github.com/singh-gaurav04"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-800 text-2xl"
            whileHover={{ scale: 1.2 }}
            whileTap={{scale:0.9}}
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href="mailto:your-gaurav26lnct@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:text-red-400 text-2xl"
            whileHover={{ scale: 1.2 }}
            whileTap={{scale:0.9}}
          >
            <FaEnvelope />
          </motion.a>

        </motion.div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Gaurav Singh. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
