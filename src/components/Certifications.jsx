import React from 'react'
import { motion } from 'framer-motion'
import { Award, ExternalLink, Calendar, Building } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { portfolioData, certificationStats, animationVariants } from '../data/portfolioData'

const Certifications = () => {
  const { certifications } = portfolioData

  const containerVariants = animationVariants.container
  const cardVariants = animationVariants.card

  return (
    <section id="certifications" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto">
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
            className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6"
          >
            <Award className="h-8 w-8 text-primary-foreground" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Certifications
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional certifications that validate my expertise in cutting-edge technologies and cloud platforms
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl"
                      >
                        {cert.icon}
                      </motion.div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {cert.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                          <Building className="h-4 w-4" />
                          <span>{cert.issuer}</span>
                        </div>
                      </div>
                    </div>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </motion.a>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed">
                    {cert.description}
                  </CardDescription>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{cert.date}</span>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono bg-secondary/50 px-2 py-1 rounded">
                      ID: {cert.credentialId}
                    </div>
                  </div>
                  
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium group-hover:underline"
                  >
                    View Credential
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </motion.a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">{certificationStats.totalCertifications}+</div>
            <div className="text-sm text-muted-foreground">Certifications</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">{certificationStats.cloudPlatforms}</div>
            <div className="text-sm text-muted-foreground">Cloud Platforms</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">{certificationStats.programmingLanguages}</div>
            <div className="text-sm text-muted-foreground">Programming Languages</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">{certificationStats.verificationRate}</div>
            <div className="text-sm text-muted-foreground">Verified</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Certifications
