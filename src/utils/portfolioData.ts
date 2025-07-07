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
      title: "EXPENSE TRACKER",
      description: "A Python-based expense tracking app built with Flask and SQLite, integrating APIs for enhanced functionality.",
      tags: ["Python", "Flask", "SQLite", "APIs"],
      githubUrl: "https://github.com/Ntinyari24/expense_tracker.git",
      imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop"
    },
    {
      title: "Simple Calculator Using Python",
      description: "A simple Python calculator program that covers all basic operations and edge cases.",
      tags: ["Python"],
      githubUrl: "https://github.com/Ntinyari24/Calculator-program.git",
      imageUrl: "https://images.unsplash.com/photo-1587145820266-a0a51d4d1f10?w=500&h=300&fit=crop"
    },
    {
      title: "SUDOKU GAME",
      description: "A Python-based Sudoku solver and generator with varying difficulty levels. It utilises pygame library and backtracking algorithm to solve the puzzle.",
      tags: ["Python", "Algorithms"],
      githubUrl: "https://github.com/Ntinyari24/SUDOKU.git",
      imageUrl: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=500&h=300&fit=crop"
    },
    {
      title: "ZOEZI_WEBSITE",
      description: "ZOEZI_WEBSITE is a modern, clean, and user-friendly fitness website that highlights health and wellness content. It includes JavaScript-driven animations to enhance user engagement and implements Google OAuth login to enable users to securely sign in",
      tags: ["HTML", "Bootstrap", "CSS", "JavaScript"],
      githubUrl: "https://github.com/Ntinyari24/ZOEZI_WEBSITE.git",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop"
    },
    {
      title: "COVID-19 Analysis",
      description: "This project presents a comprehensive analysis and visualization of the global COVID-19 pandemic using real-time data. It explores the spread of the virus, comparisons between countries, and trends over time through interactive and static visualizations.",
      tags: ["Python", "Pandas", "Matplotlib & Seaborn", "Jupyter Notebook", "Plotly & Folium"],
      githubUrl: "https://github.com/Ntinyari24/COVID-19-analysis.git",
      imageUrl: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=500&h=300&fit=crop"
    }
  ],
  skills: {
    languages: ["HTML5", "Python", "JavaScript", "Java", "PHP", "C/C++"],
    tools: ["Git", "Visual Studio Code", "PyCharm", "Jupyter", "Docker", "Flask", "APIs"],
    other: ["Problem Solving", "Data Structures & Algorithms", "Database Management", "API Integration", "Web Development"]
  },
  education: [
    {
      institution: "Jomo Kenyatta University of Agriculture And Technology",
      degree: "Bachelor's in Mining and Mineral Processing Engineering",
      period: "2022 - Present",
      description: "Skilled in Engineering Softwares CAD drawing, Inventor, SolidWorks and MATLAB."
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
    }
  ],
  interests: [
    {
      title: "FULL-STACK DEVELOPMENT",
      description: "Building projects using HTML, CSS, JavaScript, and frameworks such as Django, Flask, and React."
    },
    {
      title: "DATA ANALYSIS",
      description: "Proficient in using automation tools and libraries such as Selenium, Pandas, and Power Automate to streamline workflows and extract actionable insights from data."
    },
    {
      title: "ARTIFICIAL INTELLIGENCE",
      description: "Skilled in developing AI models using Python, TensorFlow, and scikit-learn for classification, regression, and clustering tasks."
    },
    {
      title: "TECH FOR WOMEN",
      description: "Exploring tech-driven solutions to solve health issues in women's lives."
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

export type { PortfolioData, Project, Education, Interest, Social };
