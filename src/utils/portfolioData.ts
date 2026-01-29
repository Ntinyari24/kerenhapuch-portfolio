// Portfolio data management utility
interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  imageUrl?: string;
  websiteUrl?: string;
}

interface Education {
  institution: string;
  degree: string;
  period: string;
  description: string;
}

interface Interest {
  title: string;
  description: string;
}

interface Certification {
  title: string;
  issuer: string;
  date: string;
  description?: string;
  imageUrl?: string;
  credentialUrl?: string;
}

interface Badge {
  title: string;
  imageUrl?: string;
  description?: string;
}

interface Social {
  platform: string;
  url: string;
}

interface PortfolioData {
  personal: {
    name: string;
    email: string;
    bio: string;
    cvUrl: string;
  };
  projects: Project[];
  skills: {
    languages: string[];
    tools: string[];
    other: string[];
  };
  certifications?: Certification[];
  badges?: Badge[];
  education: Education[];
  interests: Interest[];
  social: Social[];
}

const defaultPortfolioData: PortfolioData = {
  personal: {
    name: "KEREN HAPUCH NTINYARI",
    email: "kerenhapuch68@gmail.com",
    bio: "Hi, I'm Keren Hapuch Ntinyari, a tech enthusiast dedicated to building innovative solutions in AI, automation, and web development. With a keen eye for problem-solving, I strive to create impactful digital experiences that drive change.",
    cvUrl: "https://drive.google.com/file/d/1CS1mUF2FAkL65oW1dtb793GBcZO9z2yE/view?usp=drive_link"
  },
  projects: [
    {
      title: "SMART NYUKI",
      description: "Contributed to data analysis and AI model training for a smart beehive system using sound data to monitor hive health and optimize harvesting.",
      tags: ["AI", "Machine Learning", "IoT", "Data Analysis"],
      githubUrl: "https://github.com/James-CodeX/smart-nyuki-react.git",
      imageUrl: "https://res.cloudinary.com/dozb1abfn/image/upload/smart_nyuki_gczo7m.png",
      websiteUrl: "https://smartnyuki.jhubafrica.com/"
    },
    
    {
      title: "SUDOKU GAME",
      description: "A Python-based Sudoku solver and generator with varying difficulty levels. It utilises pygame library and backtracking algorithm to solve the puzzle.",
      tags: ["Python", "Algorithms"],
      githubUrl: "https://github.com/Ntinyari24/SUDOKU.git",
      imageUrl: "https://res.cloudinary.com/dozb1abfn/image/upload/jnbxwwljgojsk96tkx3h.jpg"
    },
    {
      title: " BIJOU WEBSITE",
      description: "BijouShop is a full-stack e-commerce platform built with a modern frontend (React / Vite) integrated with a Django REST backend. It supports user authentication, product browsing, filtering, shopping cart, reviews, and admin product management. ",
      tags: ["React", "Django", "REST API", "Full-Stack Development"],
      githubUrl: "https://bijoushop-frontend.onrender.com/",
      imageUrl: "https://res.cloudinary.com/dozb1abfn/image/upload/v1758364825/Screenshot_20-9-2025_104210_localhost_s41rpv.jpg"
    },
    {
      title: "DATA ANALYSIS",
      description: "This project presents a comprehensive analysis and visualization of sales and marketing data. ",
      tags: ["Python", "Pandas", "Matplotlib & Seaborn", "Jupyter Notebook", "PowerBI"],
      githubUrl: "https://github.com/Ntinyari24/FUTURE_DS_02",
      imageUrl: "https://res.cloudinary.com/dozb1abfn/image/upload/v1764942337/MARKETING_2.PBIX_pkixu7.png"
    }
  ],
  skills: {
    languages: ["HTML5", "Python", "JavaScript", "Java", "PHP", "PowerBI"],
    tools: ["Git", "Visual Studio Code", "PyCharm", "Jupyter", "Docker", "Excel", "PowerBI", "ZOHO Creator"],
    other: ["Problem Solving", "Data Structures & Algorithms", "Database Management", "API Integration", "Web Development", "Data analysis", "AI", ]
  },
  education: [
    {
      institution: "Jomo Kenyatta University of Agriculture And Technology",
      degree: "Bachelor's in Mining and Mineral Processing Engineering",
      period: "2022 - Present",
      description: "Skilled in Engineering Mathematical Concepts and Softwares including CAD drawing, Inventor, SolidWorks and MATLAB."
    },
    {
      institution: "PLP ACADEMY - COHORT VII",
      degree: "Software Engineering Course",
      period: "February 2025 - Present",
      description: "Focusing on core computer science principles, software development, and practical problem-solving skills. Skilled in Python for Data Analysis, Automation and AI, Web Development using HTML,CSS,JavaScript, and React, and APIs and Full-Stack Development."
    },
    {
      institution: "COURSERA",
      degree: "Python Fundamentals for Beginners",
      period: "August 2024 - December 2024",
      description: "Completed a foundational course in Python programming, covering core concepts such as variables, data types, control structures (conditionals and loops), functions, basic data structures (lists, dictionaries, tuples), and error handling."
    },


  {
    institution: "NVIDIA",
    degree: "Evaluation of LLMs",
    period: "July 2025",
    description: "Completed a course on evaluating Large Language Models (LLMs) to understand their capabilities and limitations in various applications."
  }
],

  interests: [
    {
      title: "FULL-STACK DEVELOPMENT",
      description: "Building projects using HTML, CSS, JavaScript, and frameworks such as Django, Flask, and React."
    },
    {
      title: "DATA SCIENCE & ANALYSIS",
      description: "Proficient in using automation tools and libraries such as Selenium, Pandas, and Power Automate to streamline workflows and extract actionable insights from data."
    },
    {
      title: "ARTIFICIAL INTELLIGENCE",
      description: "Skilled in developing AI models using Python, TensorFlow, and scikit-learn for classification, regression, and clustering tasks."
    },
    
  ],
  certifications: [
  {
  
    "title": "AI FOR SOFTWARE ENGINEERING",
    "issuer": "POWER LEARN PROJECT",
    "date": "Dec 2025",
    "description": "An introductory course covering Python fundamentals, database management, Startup building and software development.",
    "imageUrl": "https://res.cloudinary.com/dozb1abfn/image/upload/v1765049850/plp_certificate_jeetpj.png",
    "credentialUrl": "https://res.cloudinary.com/dozb1abfn/image/upload/v1765049850/plp_certificate_jeetpj.png"
  },
  {
    
    "title": "NASA HACKATHON 2025",
    "issuer": "NASA",
    "date": "October 2025",
    "description": "Course on best practices and evaluation methods for large language models.",
    "imageUrl": "https://res.cloudinary.com/dozb1abfn/image/upload/v1764942221/NASA_CERTIFICATE_peecze.jpg",
    "credentialUrl": "https://res.cloudinary.com/dozb1abfn/image/upload/v1764942221/NASA_CERTIFICATE_peecze.jpg"
  },


   {
    
    "title": "CODE.X_JKUAT_JHUB AFRICA",
    "issuer": "CODE.X",
    "date": "SEPTEMBER 2025",
    "description": "Participation in the 8-Day local intelligence program covering various topics.",
    "imageUrl": "https://res.cloudinary.com/dozb1abfn/image/upload/v1765027354/CODEX_JHUB_CERTIFICATE_ndnrug.jpg",
    "credentialUrl": "https://res.cloudinary.com/dozb1abfn/image/upload/v1765027354/CODEX_JHUB_CERTIFICATE_ndnrug.jpg"
   },

    {
    
    "title": "Zoho Creator",
    "issuer": "ZOHO",
    "date": "SEPTEMBER 2025",
    "description": "Training completion Certificate for Young Creators Program by ZOHO Corporation.",
    "imageUrl": "https://res.cloudinary.com/dozb1abfn/image/upload/v1765027376/ZOHO_CREATOR_CERTIFICATE_ezjwfo.jpg",
    "credentialUrl": "https://res.cloudinary.com/dozb1abfn/image/upload/v1765027376/ZOHO_CREATOR_CERTIFICATE_ezjwfo.jpg"
   }
],
  
 social: [
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/keren-hapuch-2311242b0"
    },
    {
      platform: "Twitter",
      url: "https://x.com/yourgirl_hapuch"
    },
    {
      platform: "GitHub",
      url: "https://github.com/Ntinyari24"
    },
    {
      platform: "Email",
      url: "mailto:kerenhapuch68@gmail.com"
    }
  ]
};

export const getPortfolioData = (): PortfolioData => {
  const storedData = localStorage.getItem('portfolioData');
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (error) {
      console.error('Error parsing stored portfolio data:', error);
    }
  }
  return defaultPortfolioData;
};

export const updatePortfolioData = (data: PortfolioData): void => {
  localStorage.setItem('portfolioData', JSON.stringify(data));
};

export type { PortfolioData, Project, Education, Interest, Certification, Social };
