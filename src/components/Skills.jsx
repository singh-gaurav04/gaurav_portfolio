import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Globe, Cpu, Zap, Star } from 'lucide-react'
import { 
  Brain, 
  Database, 
  Cloud, 
  Wrench 
} from "lucide-react";
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { portfolioData, animationVariants } from '../data/portfolioData'

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { skills } = portfolioData

const skillCategories = [
  { id: 'all', name: 'All Skills', icon: Star },
  { id: 'AI_STACK', name: 'GenAI Stack', icon: Cpu },
  { id: 'ml_dl', name: 'ML / Deep Learning', icon: Brain },
  { id: 'vector_db', name: 'Vector DBs', icon: Database },
  { id: 'deployment', name: 'Deployment', icon: Cloud },
  { id: 'programming', name: 'Languages', icon: Code },
  { id: 'frameworks', name: 'Frameworks', icon: Globe },
  { id: 'tools', name: 'Tools', icon: Wrench }
]

  const containerVariants = animationVariants.container
  const itemVariants = animationVariants.item

  // Get all skills or filtered by category
  const getDisplaySkills = () => {
    if (selectedCategory === 'all') {
      return Object.values(skills).flat()
    }
    return skills[selectedCategory] || []
  }

  // Simple skill card component
  const SkillCard = ({ skill, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group"
    >
      <Card className="h-full hover:shadow-[15px_15px_0px_rgba(0,0,0,0.75)] transition-all duration-300 border-4 border-black hover:border-primary/50 bg-gradient-to-br from-background to-secondary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{skill.icon}</span>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {skill.name}
              </h3>
            </div>
            <span className="text-sm font-medium text-primary">
              {skill.level}%
            </span>
          </div>
          
          <div className="w-full bg-secondary rounded-sm h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
              className="h-2 bg-gradient-to-r from-primary to-blue-600 rounded-sm"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <section id="skills" className="py-20 px-4 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-sm mb-6 border-2 border-black"
          >
            <Zap className="h-8 w-8 text-primary-foreground" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Skills & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with to build amazing digital experiences
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-secondary rounded-sm border-4 border-black p-1 flex space-x-1 overflow-x-auto">
            {skillCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'ghost'}
                onClick={() => setSelectedCategory(category.id)}
                className="px-4 whitespace-nowrap border-2 border-black"
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.name}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {getDisplaySkills().map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-sm p-8 border-4 border-black">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">
                  {Object.values(skills).flat().length}
                </div>
                <div className="text-sm text-muted-foreground">Total Skills</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">
                  {Math.round(Object.values(skills).flat().reduce((acc, skill) => acc + skill.level, 0) / Object.values(skills).flat().length)}%
                </div>
                <div className="text-sm text-muted-foreground">Average Level</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">
                  {Object.values(skills).flat().filter(skill => skill.level >= 90).length}
                </div>
                <div className="text-sm text-muted-foreground">Expert Level</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">
                  {skillCategories.length - 1}
                </div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
