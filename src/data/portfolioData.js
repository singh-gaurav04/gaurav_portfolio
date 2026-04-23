// Portfolio Data Configuration
export const portfolioData = {
  // Personal Information
  personal: {
    name: "Gaurav Singh",
    title: "Aspiring AI/ML Engineer | Generative AI Enthusiast",
    bio: "Passionate about Artificial Intelligence, Machine Learning, and Backend Development, with a strong interest in building intelligent and scalable applications. Currently pursuing my Bachelor's in Computer Engineering with a focus on AI/ML and full-stack development. Skilled in Java, Python, and modern AI technologies like FastAPI, LangChain, and Generative AI. Actively seeking AI/ML Engineer and Generative AI roles to create impactful real-world solutions.",
    location: "Bengaluru, Karnataka",
    graduationYear: "2026",
    email: "gaurav26lnct@gmail.com",
    phone: "+91 7479582593",
    profileImage: "/assets/images/profile.png",
    resumeUrl: "/assets/documents/resume.pdf",
    placementStatus: {
      isPlaced: false,
      status: "Actively seeking AI/ML roles",
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
      description: "Cloud platform certification",
      credentialId: "--",
      link: "https://www.credly.com/go/hh50F4n0",
      icon: "☁️"
    },
    {
      id: 5,
      title: "FastAPI Development",
      issuer: "Udemy",
      date: "2025",
      description: "Built high-performance APIs for AI/ML applications using FastAPI",
      credentialId: "--",
      link: "#",
      icon: "⚡"
    },
    {
      id: 6,
      title: "Generative AI Fundamentals",
      issuer: "Udemy",
      date: "2025",
      description: "Learned LLMs, prompt engineering, and AI-powered application development",
      credentialId: "--",
      link: "#",
      icon: "🤖"
    }
  ],

  // Skills Data
skills: {
  AI_STACK: [
    { name: 'LangChain', level: 90, icon: '🔗' },
    { name: 'LangGraph', level: 85, icon: '🧠' },
    { name: 'RAG Systems', level: 90, icon: '📚' },
    { name: 'Prompt Engineering', level: 88, icon: '✍️' },
    { name: 'Agentic AI', level: 85, icon: '🤖' },
    { name: 'Hugging Face Transformers', level: 85, icon: '🤗' },
    { name: 'OpenAI API', level: 85, icon: '⚡' },
    { name: 'Mistral API', level: 80, icon: '🌪️' },
    { name: 'Embeddings & Vector Search', level: 88, icon: '🔍' },
    { name: 'Multi-Agent Systems', level: 85, icon: '🧩' }
  ],

  programming: [
    { name: 'Python', level: 92, icon: '🐍' },
    { name: 'Java', level: 88, icon: '☕' },
    { name: 'C++', level: 85, icon: '⚡' },
    { name: 'JavaScript', level: 80, icon: '🟨' }
  ],

  frameworks: [
    { name: 'FastAPI', level: 90, icon: '⚡' },
    { name: 'Spring Boot', level: 85, icon: '🍃' },
    { name: 'React.js', level: 82, icon: '⚛️' },
    { name: 'Node.js', level: 78, icon: '🟢' },
    { name: 'Express.js', level: 78, icon: '🚀' }
  ],

  ml_dl: [
    { name: 'PyTorch', level: 85, icon: '🔥' },
    { name: 'Scikit-learn', level: 80, icon: '📈' },
    { name: 'Pandas', level: 82, icon: '📊' },
    { name: 'NumPy', level: 80, icon: '🔢' },
    { name: 'Model Training', level: 85, icon: '🏋️' },
    { name: 'Fine-tuning', level: 80, icon: '🎯' },
    { name: 'Model Evaluation', level: 85, icon: '📏' }
  ],

  vector_db: [
    { name: 'Pinecone', level: 85, icon: '🌲' },
    { name: 'Qdrant', level: 0, icon: '📦' }
  ],

  deployment: [
    { name: 'Docker', level: 88, icon: '🐳' },
    { name: 'AWS EC2', level: 80, icon: '☁️' },
    { name: 'AWS S3', level: 78, icon: '🗂️' },
    { name: 'Model Deployment', level: 85, icon: '🚀' },
    { name: 'REST API (FastAPI)', level: 90, icon: '🔌' }
  ],

  tools: [
    { name: 'Git', level: 90, icon: '📝' },
    { name: 'GitHub', level: 88, icon: '🐙' },
    { name: 'Postman', level: 82, icon: '📮' },
    { name: 'VS Code', level: 90, icon: '💻' }
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


  // Projects Data (unchanged)
  projects: [
    {
  id: 1,
  title: "AI Personal Assistant Chatbot",
  description: "Developed an AI-powered personal assistant chatbot capable of answering queries based on user context using LLMs and Retrieval-Augmented Generation (RAG). Integrated FastAPI backend with a responsive frontend to deliver real-time conversational experience. Implemented prompt engineering, API handling, and optimized response generation for intelligent interactions.",
  technologies: ["Python", "FastAPI", "LangChain", "OpenAI API", "React.js"],
  github: "https://github.com/singh-gaurav04/Gaurav_AI_Assistant",
  demo: "https://gaurav26lnct.netlify.app/",
  image: "🤖",
  category: "AI",
  status: "completed",
  featured: true
},
    {
  id: 4,
  title: "AI-Powered EDI Converter & Learning Platform",
  description: "Developed an AI-powered tool that converts EDI (Electronic Data Interchange) data into human-readable, printable formats. The platform also includes an interactive learning module to help users understand EDI concepts and prepare for interviews with curated questions and explanations.",
  technologies: ["Python", "FastAPI", "LangChain", "GPT", "React.js"],
  github: "https://github.com/singh-gaurav04/KnowEDI",
  demo: "https://knowedi.vercel.app/",
  image: "🤖",
  category: "AI",
  status: "completed",
  featured: true
},
    {
      id: 3,
      title: "Job Portal App",
      description: "Full-stack Job Portal application featuring modules for user registration, job posting, and admin controls with JWT-based authentication and role-based authorization.",
      technologies: ["Java", "Spring Boot", "Spring Security", "React.js", "MongoDB"],
      github: "https://github.com/singh-gaurav04/JOB_PORTAL",
      demo: "https://github.com/singh-gaurav04/JOB_PORTAL",
      image: "💼",
      category: "web",
      status: "completed",
      featured: true
    }


  ],

  // Contact Information
  contact: {
    email: "gaurav26lnct@gmail.com",
    phone: "+91-7479582593",
    location: "Bengaluru, Karnataka",
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
