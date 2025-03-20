import React from "react";
import { motion } from "framer-motion";
import Button3 from "./Button3";
import { SiRefinedgithub } from "react-icons/si";

const projectsData = [
  {
    image: "/Localshopwala.png",
    name: "LocalShopWala - AI integrated Grocery App",
    description:
      "Empowering Local Businesses: Created an e-commerce platform that enables local shop owners to sell products online, fostering trust and accessibility for nearby customers. Developed a scheduled delivery system covering a 5km radius, catering to small towns where instant and home delivery services are unavailable. AI-Powered Smart Search: This is my future plan to implement machine learning algorithms to enhance product search and recommendations, improving user experience.",
    github: "https://github.com/singh-gaurav04/LocalShopWala",
  },
  {
    image: "/ochi.png",
    name: "Awwwarded website clone - OCHI",
    description: "I developed a clone of the award-winning website Ochi, focusing on its high-quality animations and smooth user interactions. This project enhanced my React animation skills, utilizing Framer Motion and advanced CSS techniques to replicate the fluid experience of the original site. The clone captures the essence of Ochi's modern UI/UX design, improving my expertise in frontend development and micro-interactions.",
    github: "https://github.com/singh-gaurav04/Ochi-Clone",
  },
  {
    image: "/carPrediction.png",
    name: "Car Price Prediction",
    description: "Developed a car price prediction model using Linear Regression with Pandas and Scikit-Learn, providing accurate price of old cars.Full-Stack Implementation: Built a web-based application using React.js + Vite, Flask, and Tailwind CSS, ensuring a smooth and interactive UI/UX.",
    github: "https://github.com/singh-gaurav04/Car_predictor_app",
  },
];

const Projects = () => {
  return (
    <div className='py-10'>
      <div className='container mx-auto px-5'>
        <motion.h2
          className='text-4xl font-bold text-center mb-8 text-white'
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h2>
        <div className='space-y-10'>
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row " : "md:flex-row-reverse "
              } items-center  rounded-lg  overflow-hidden py-[4vw] `}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* //left side */}
              {/* Image Section */}
              <motion.div
                className='flex-shrink-0 w-full md:w-1/2 flex items-center justify-center p-4'
                initial={{ y: -10 }}
                animate={{
                  y: 0,
                  transition: {
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                }}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className='w-[70%] h-auto max-h-[250px] object-cover rounded-lg
                  shadow-[0_0_10px_#ffffff]
                  -rotate-3 blur-[0.8px]'
                />
              </motion.div>

              {/* Content Section */}
              <div className='flex flex-col gap-[1vw]  p-5 w-full md:w-1/2'>
                <h3 className='text-3xl mb-2 text-center font-bold text-white'>
                  {project.name}
                </h3>
                <p className='text-[#967AA1] text-center mb-4'>
                  {project.description}
                </p>

                <a
                  href={project.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  className="flex justify-center"
                >
                  <Button3 name='View Code' icon={SiRefinedgithub} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
