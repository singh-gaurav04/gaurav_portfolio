import React from 'react'
import { motion } from 'framer-motion'
import { Download, Github, Linkedin, Mail, MapPin, Calendar, Code, Briefcase } from 'lucide-react'
import { Button } from './ui/button'
import { portfolioData, animationVariants } from '../data/portfolioData'

const Hero = () => {
  const { personal, social } = portfolioData
  const containerVariants = animationVariants.container
  const itemVariants = animationVariants.item
  const imageVariants = animationVariants.image

  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-16 pb-20 px-4">
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.h1 
                variants={itemVariants}
                className="text-4xl md:text-6xl font-bold text-foreground leading-tight"
              >
                Hi, I'm{' '}
                <span className="text-primary">{personal.name}</span>
              </motion.h1>
              <motion.h2 
                variants={itemVariants}
                className="text-2xl md:text-3xl text-muted-foreground font-medium"
              >
                {personal.title}
              </motion.h2>
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-muted-foreground leading-relaxed max-w-2xl"
            >
              {personal.bio}
            </motion.p>

            {/* Quick Info */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{personal.location}</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Expected Graduation: {personal.graduationYear}</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg" 
                className="group"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Mail className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                Get In Touch
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="group"
                onClick={() => window.open(personal.resumeUrl, '_blank')}
              >
                <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                Download Resume
              </Button>
            </motion.div>

            {/* Additional Info Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0"
                onClick={() => window.open(social.Leetcode, '_blank')}
              >
                <Code className="mr-2 h-4 w-4" />
                LeetCode Profile
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0"
                onClick={() => {
                  if (personal.placementStatus.isPlaced == "Placed") {
                    alert(`Placed at ${personal.placementStatus.company} as ${personal.placementStatus.role}`);
                  } else {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }
                 
                }}
              >
                <Briefcase className="mr-2 h-4 w-4" />
                {personal.placementStatus.status}
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              variants={itemVariants}
              className="flex space-x-4"
            >
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Github className="h-6 w-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Linkedin className="h-6 w-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                href={social.email}
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Mail className="h-6 w-6" />
              </motion.a>
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div 
            variants={imageVariants}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 rounded-full blur-3xl opacity-20 scale-110"
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl"
              >
                <img
                  src={personal.profileImage}
                  alt={personal.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Profile image failed to load:', personal.profileImage);
                    e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face';
                  }}
                />
              </motion.div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg"
              >
                💻
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -10, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-foreground font-bold shadow-lg"
              >
                🚀
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
