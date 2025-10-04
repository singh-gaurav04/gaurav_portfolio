// Data helper utilities for portfolio management

/**
 * Get personal information
 */
export const getPersonalInfo = () => {
  return {
    name: "Alex Chen",
    title: "Computer Engineering Student",
    bio: "Passionate about software development, machine learning, and creating innovative solutions. Currently pursuing my Bachelor's in Computer Engineering with a focus on full-stack development and emerging technologies.",
    location: "San Francisco, CA",
    graduationYear: "2025",
    email: "alex.chen@email.com",
    phone: "+1 (555) 123-4567",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    resumeUrl: "/resume.pdf"
  }
}

/**
 * Get social media links
 */
export const getSocialLinks = () => {
  return {
    github: "https://github.com/alexchen",
    linkedin: "https://linkedin.com/in/alexchen",
    twitter: "https://twitter.com/alexchen",
    email: "mailto:alex.chen@email.com"
  }
}

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Format phone number for tel: links
 */
export const formatPhoneForTel = (phone) => {
  return phone.replace(/\D/g, '')
}

/**
 * Generate Google Maps URL
 */
export const generateMapsUrl = (location) => {
  return `https://maps.google.com/?q=${encodeURIComponent(location)}`
}

/**
 * Get current year for copyright
 */
export const getCurrentYear = () => {
  return new Date().getFullYear()
}

/**
 * Generate unique IDs for dynamic content
 */
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * Format date for display
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  })
}

/**
 * Calculate years of experience
 */
export const calculateExperience = (startDate, endDate = null) => {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()
  const diffTime = Math.abs(end - start)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const years = Math.floor(diffDays / 365)
  const months = Math.floor((diffDays % 365) / 30)
  
  if (years > 0) {
    return months > 0 ? `${years}y ${months}m` : `${years}y`
  }
  return `${months}m`
}

/**
 * Get skill level description
 */
export const getSkillLevelDescription = (level) => {
  if (level >= 90) return "Expert"
  if (level >= 80) return "Advanced"
  if (level >= 70) return "Intermediate"
  if (level >= 60) return "Beginner"
  return "Learning"
}

/**
 * Sort certifications by date (newest first)
 */
export const sortCertificationsByDate = (certifications) => {
  return certifications.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB - dateA
  })
}

/**
 * Filter skills by category
 */
export const filterSkillsByCategory = (skills, category) => {
  return skills[category] || []
}

/**
 * Get project technologies as string
 */
export const getProjectTechnologies = (technologies) => {
  return technologies.join(', ')
}

/**
 * Validate form data
 */
export const validateContactForm = (formData) => {
  const errors = {}
  
  if (!formData.name.trim()) {
    errors.name = "Name is required"
  }
  
  if (!formData.email.trim()) {
    errors.email = "Email is required"
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Please enter a valid email"
  }
  
  if (!formData.subject.trim()) {
    errors.subject = "Subject is required"
  }
  
  if (!formData.message.trim()) {
    errors.message = "Message is required"
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}
