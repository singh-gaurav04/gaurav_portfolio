import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, ExternalLink, Github, Star, Calendar, Users, Zap, Eye } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { portfolioData, animationVariants } from '../data/portfolioData'

const Projects = ({ openBot }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { projects } = portfolioData

  // Add more projects to the data
  const extendedProjects = [
    ...projects,
    {
      id: 4,
          title: "Car Price Predictor App",
          description: "A web application that predicts the price of a car based on its features using linear regression.",
      technologies: ["React", "Node.js", "Machine Learning","Linear Regression","Python","scikit-learn"],
      github: "https://github.com/singh-gaurav04/Car_predictor_app",
      demo: "https://github.com/singh-gaurav04/Car_predictor_app",
      image: "🤖",
      category: "ai",
      status: "completed",
      featured: true
    },
   
  ]

  const categories = [
    { id: 'all', name: 'All Projects', icon: '🚀' },
    { id: 'web', name: 'Web Apps', icon: '🌐' },
    { id: 'mobile', name: 'Mobile Apps', icon: '📱' },
    { id: 'ai', name: 'AI/ML', icon: '🤖' }
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? extendedProjects 
    : extendedProjects.filter(project => project.category === selectedCategory)

  const featuredProjects = extendedProjects.filter(project => project.featured)

  const containerVariants = animationVariants.container
  const itemVariants = animationVariants.item
  const cardVariants = animationVariants.card

  return (
    <section id="projects" className=" px-4 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto">


        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-secondary rounded-sm border-4 border-black p-1 flex space-x-1 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'ghost'}
                onClick={() => setSelectedCategory(category.id)}
                className="px-4 whitespace-nowrap border-2 border-black"
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* All Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full hover:shadow-[15px_15px_0px_rgba(0,0,0,0.75)] transition-all duration-300 border-4 border-black hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{project.image}</span>
                      <div className="flex space-x-2">
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-sm border-2 border-black bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                        >
                          <Github className="h-4 w-4" />
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-sm border-2 border-black bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </motion.a>
                      </div>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-2 py-1 rounded-sm border-2 border-black text-xs font-medium ${
                        project.status === 'completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {project.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {project.category}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm leading-relaxed">
                      {project.description}
                    </CardDescription>

                    {project.title.toLowerCase().includes('ai personal assistant') && (
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          openBot?.()
                        }}
                        className="w-full"
                      >
                        Open Assistant
                      </Button>
                    )}
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-sm">Technologies:</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-secondary border-2 border-black rounded-sm text-xs text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-sm p-8 border-4 border-black">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Interested in Collaborating?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              I'm always excited to work on new projects and explore innovative solutions. 
              Let's discuss how we can bring your ideas to life!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group"
              >
                <Eye className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                View More Projects
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.open("https://github.com/singh-gaurav04", '_blank')}
                className="group"
              >
                <Github className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                GitHub Profile
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
