import React from 'react'
import { motion } from 'framer-motion'
import { Code, Github, Linkedin, Mail, MapPin, Phone, Heart, ArrowUp } from 'lucide-react'
import { Button } from './ui/button'
import { portfolioData, animationVariants } from '../data/portfolioData'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const { personal, social, contact, footer } = portfolioData
  const quickLinks = footer.quickLinks

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      url: social.github,
      color: 'hover:text-gray-900'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: social.linkedin,
      color: 'hover:text-blue-600'
    },
    {
      icon: Mail,
      name: 'Email',
      url: social.email,
      color: 'hover:text-red-500'
    }
  ]

  const contactInfo = [
    {
      icon: Mail,
      text: contact.email,
      href: `mailto:${"gaurav26lnct@gmail.com"}`
    },
    {
      icon: Phone,
      text: contact.phone,
      href: `tel:${contact.phone.replace(/\D/g, '')}`
    },
    {
      icon: MapPin,
      text: contact.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(contact.location)}`
    }
  ]

  const containerVariants = animationVariants.container
  const itemVariants = animationVariants.item

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Code className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">{personal.name}</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {personal.title} passionate about creating innovative solutions 
              and building the future through technology.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-foreground mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group"
                    onClick={(e) => {
                      e.preventDefault()
                      const element = document.querySelector(link.href)
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                  >
                    <span className="group-hover:mr-2 transition-all duration-200">→</span>
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-foreground mb-6">Contact Info</h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index}>
                  <motion.a
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    whileHover={{ x: 5 }}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center space-x-3 group"
                  >
                    <info.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                    <span>{info.text}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter/CTA */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-foreground mb-6">Let's Connect</h3>
            <p className="text-muted-foreground mb-6">
              Interested in collaborating or have a project in mind? Let's discuss how we can work together.
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => {
                  const contactSection = document.getElementById('contact')
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="w-full"
              >
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-border"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span>© 2025 {personal.name}. Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="h-4 w-4 text-red-500 fill-current" />
              </motion.div>
              <span>and React</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              {footer.legalLinks.map((link) => (
                <a key={link.name} href={link.href} className="hover:text-primary transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      </motion.div>
    </footer>
  )
}

export default Footer
