import React from "react";
import { motion } from "framer-motion";

const skillsData = [
  { name: "C++", color: "text-blue-500" },
  { name: "DSA", color: "text-green-500" },
  { name: "MERN Full Stack", color: "text-yellow-500" },
  { name: "MySQL", color: "text-red-500" },
  { name: "Python", color: "text-pink-500" },
  { name: "AIML", color: "text-teal-500" },
  { name: "Git/GitHub", color: "text-orange-500" },
  { name: "Vs Code & Jupyter", color: "text-indigo-500" },
  { name: "Numpy", color: "text-cyan-500" },
  { name: "Pandas", color: "text-lime-500" },
];

const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2, //kitne der me aayega
      staggerChildren: 0.1, //baccha kitne der me aayega
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Skills = () => {
  return (
    <section className="py-10 ">
      <div className="container mx-auto px-5">
        <motion.h2
          className="text-4xl font-bold text-center mb-8 text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Skills
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {skillsData.map((skill, index) => (
            <motion.div
              key={index}
              className={`bg-[#354F52] rounded-lg shadow-[0_0_10px_#ffffff]  p-5 flex items-center justify-center ${skill.color}`}
              variants={itemVariants}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-xl font-bold">{skill.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
