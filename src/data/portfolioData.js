// Portfolio Data Configuration
export const portfolioData = {
  // Personal Information
  personal: {
    name: "Gaurav Singh",
    title: "Artificial Intelligence and Machine Learning Student",
    bio: "Passionate about Java Software Development Machine learning, and creating innovative solutions. Currently pursuing my Bachelor's in Computer Engineering with a focus on full-stack development and emerging technologies.",
    location: "Bhopal, Madhya Pradesh",
    graduationYear: "2026",
    email: "gaurav26lnct@gmail.com",
    phone: "+91 7479582593",
    profileImage: "/assets/images/profile.png",
    resumeUrl: "/assets/documents/resume.pdf",
    placementStatus: {
      isPlaced: true,
      status: "Open to work",
      company: "",
      role: ""
    }
  },

  // Social Media Links
  social: {
    github: "https://github.com/singh-gaurav04",
    linkedin: "https://www.linkedin.com/in/gaurav26lnct/",
    Leetcode: "https://leetcode.com/u/Gaurav__04/",
    email: "mailto:gaurav26lnct@gmail.com"
  },

  // Certifications Data
  certifications: [
    {
      id: 1,
      title: "Master Java and Spring Boot",
      issuer: "Udemy (Telusko)",
      date: "2025",
      description: "Comprehensive course covering Java fundamentals and Spring Boot development",
      credentialId: "UC-198f1282-d19c-491e-87c9-15a3bc963911",
      link: "https://drive.google.com/file/d/1ck1icA22LNmR-_INO3o7Bc7gDHf92S_0/view?usp=drive_link",
      icon: "☕"
    },
    {
      id: 2,
      title: "Backend Domination",
      issuer: "Sheryians Coding School",
      date: "2024",
      description: "Advanced backend development course focusing on modern web technologies",
      credentialId: "9753a39d",
      link: "https://drive.google.com/file/d/1zLIyI5nGFDH1RHErcKnFSJG9vA76LNiA/view?usp=drive_link",
      icon: "🚀"
    },
    {
      id: 3,
      title: "Database Management System",
      issuer: "NPTEL",
      date: "2024",
      description: "Comprehensive course on database design, implementation, and management",
      credentialId: "NPTEL-DBMS-2024",
      link: "https://drive.google.com/file/d/1xgOcqUYPhwBapmXoW2xsmvZvrnLGLXLv/view?usp=drive_link",
      icon: "🗄️"
    },
    {
      id: 4,
      title: "AWS Certified Solutions Architect",
      issuer: "AWS",
      date: "2024",
      description: "cloud platform certification",
      credentialId: "--",
      link: "https://www.credly.com/go/hh50F4n0",
      icon: "🗄️"
    },
  ],

  // Skills Data
  skills: {
    programming: [
      { name: 'Java', level: 90, icon: '☕' },
      { name: 'C++', level: 85, icon: '⚡' },
      { name: 'JavaScript', level: 80, icon: '🟨' },
      { name: 'HTML', level: 85, icon: '🌐' },
      { name: 'CSS', level: 80, icon: '🎨' }
    ],
    frameworks: [
      { name: 'Spring Boot', level: 88, icon: '🍃' },
      { name: 'Spring Security', level: 85, icon: '🔒' },
      { name: 'React.js', level: 82, icon: '⚛️' },
      { name: 'Express.js', level: 80, icon: '🚀' },
      { name: 'Node.js', level: 78, icon: '🟢' },
      { name: 'Hibernate', level: 75, icon: '🗄️' }
    ],
    tools: [
      { name: 'MySQL', level: 85, icon: '🐬' },
      { name: 'MongoDB', level: 80, icon: '🍃' },
      { name: 'Git', level: 88, icon: '📝' },
      { name: 'IntelliJ IDEA', level: 90, icon: '💡' },
      { name: 'VS Code', level: 85, icon: '💻' },
      { name: 'Postman', level: 80, icon: '📮' }
    ]
  },

  // Experience Data
  experiences: [
    {
      id: 1,
      title: "Top Performer in Web Development",
      company: "GDSC in LNCTE",
      location: "Bhopal, Madhya Pradesh",
      period: "2024",
      type: "Achievement",
      description: "Recognized as top performer in web development activities and competitions within the Google Developer Student Club at LNCTE.",
      achievements: [
        "Demonstrated exceptional skills in web development technologies",
        "Contributed significantly to club activities and projects",
        "Mentored fellow students in web development best practices"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
      link: "https://gdsc.community.dev/"
    }
  ],

  // Projects Data
  projects: [
    {
      id: 1,
      title: "Job Portal App",
      description: "Full-stack Job Portal application featuring modules for user registration, job posting, and admin controls with JWT-based authentication and role-based authorization.",
      technologies: ["Java", "Spring Boot", "Spring Security", "React.js", "MongoDB"],
      github: "https://github.com/singh-gaurav04/JOB_PORTAL",
      demo: "https://github.com/singh-gaurav04/JOB_PORTAL",
      image: "💼",
      category: "web",
      status: "completed",
      featured: true
    },
    {
      id: 2,
      title: "Hotel Booking App",
      description: "Full-stack hotel booking application with user authentication, hotel/room management, and real-time search/filter features with secure authentication and authorization.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "JWT"],
      github: "#",
      demo: "#",
      image: "🏨",
      category: "web",
      status: "in Progress",
      featured: true
    }
  ],

  // Contact Information
  contact: {
    email: "gaurav26lnct@gmail.com",
    phone: "+91 7479582593",
    location: "Bhopal, Madhya Pradesh",
    responseTime: "I typically respond within 24 hours"
  },

  // Navigation Items
  navigation: [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' }
  ],

  // Footer Links
  footer: {
    quickLinks: [
      { name: 'About', href: '#about' },
      { name: 'Projects', href: '#projects' },
      { name: 'Skills', href: '#skills' },
      { name: 'Certifications', href: '#certifications' },
      { name: 'Contact', href: '#contact' }
    ],
    legalLinks: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' }
    ]
  }
}

// Statistics for certifications section
export const certificationStats = {
  totalCertifications: 6,
  cloudPlatforms: 3,
  programmingLanguages: 2,
  verificationRate: "100%"
}

// Animation variants for consistent animations across components
export const animationVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  },
  item: {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  },
  card: {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  },
  image: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }
}
