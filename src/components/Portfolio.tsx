import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, Github, Mail, Download, ArrowDown, User, Briefcase, Calendar, Code, Database, Users, Terminal, BookOpen, GraduationCap, Star } from 'lucide-react';
import { getPortfolioData } from '../utils/portfolioData';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [portfolioData, setPortfolioData] = useState(getPortfolioData());
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    setIsAdminAuthenticated(localStorage.getItem('admin_authenticated') === 'true');
    const handleScroll = () => {
      const sections = ['home', 'projects', 'skills', 'education', 'interests', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleProjectClick = (project: any) => {
    // Prioritize website URL over GitHub URL
    const url = project.websiteUrl || project.githubUrl;
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Keren<span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">Hapuch</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'Projects', 'Skills', 'Education', 'Interests', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-800 hover:bg-clip-text hover:text-transparent ${
                    activeSection === item.toLowerCase() ? 'bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent' : 'text-gray-700'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {['Home', 'Projects', 'Skills', 'Education', 'Interests', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left text-gray-700 hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-800 hover:bg-clip-text hover:text-transparent transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <motion.section
        id="home"
        className="min-h-screen flex items-center justify-center pt-20 px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <User className="text-purple-600" size={20} />
              <span className="text-gray-600 text-sm tracking-wider uppercase">
                {portfolioData.personal.name}
              </span>
              <Briefcase className="text-purple-600" size={20} />
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Full-Stack </span>
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Developer</span>
            </h1>
            
            <p className="text-gray-600 text-lg mb-8 max-w-2xl">
              {portfolioData.personal.bio}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-8 py-3 rounded-lg font-medium transition-all flex items-center gap-2 justify-center shadow-lg"
              >
                <span>View My Projects</span>
                <ArrowDown size={18} />
              </button>
              <a
                href={portfolioData.personal.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-purple-600 hover:bg-purple-50 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center"
              >
                <span>Download CV</span>
                <Download size={18} />
              </a>
            </div>
          </motion.div>
          
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full p-1">
                <img
                  src="https://res.cloudinary.com/dozb1abfn/image/upload/portrait_rc2sva.jpg"
                  alt="Keren Hapuch"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-gray-200">
                <p className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent text-sm font-medium">Tech Enthusiast</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">My Projects</span>
          </h2>
          <div className="flex flex-row overflow-x-auto gap-x-6 pb-4 hide-scrollbar">
            {portfolioData.projects.map((project, index) => (
              <motion.div
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-purple-300 min-w-[320px] max-w-[320px] flex-shrink-0"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Project Image */}
                {project.imageUrl && (
                  <div 
                    className="relative h-48 cursor-pointer group"
                    onClick={() => handleProjectClick(project)}
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                        <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent font-medium flex items-center gap-2">
                          {project.websiteUrl ? 'View Website' : 'View Code'}
                          <ExternalLink size={16} />
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{project.title}</h3>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm border border-purple-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.websiteUrl || project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent hover:from-purple-700 hover:to-purple-900 transition-colors flex items-center gap-2 font-medium"
                  >
                    <span>{project.websiteUrl ? 'Visit Website' : 'See More'}</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">My Tech Stack</span>
          </h2>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.12 }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {portfolioData.skills.languages.map((skill, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-xl p-6 hover:shadow-lg hover:border-purple-300 transition-all">
                  <Code className="text-purple-600 mx-auto mb-3" size={32} />
                  <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent font-medium">{skill}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.15 }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-xl p-6 shadow-sm"
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="text-purple-600" size={24} />
                <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Development Tools</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {portfolioData.skills.tools.map((tool, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm border border-purple-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-xl p-6 shadow-sm"
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Code className="text-purple-600" size={24} />
                <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Other Skills</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {portfolioData.skills.other.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm border border-purple-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">My Education</span>
          </h2>
          <motion.div
            className="space-y-8"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.18 }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {portfolioData.education.map((edu, index) => (
              <motion.div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 flex gap-6 shadow-sm hover:shadow-lg transition-shadow"
                variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0">
                  <div className="bg-purple-100 p-3 rounded-lg border border-purple-200">
                    <GraduationCap className="text-purple-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">{edu.institution}</h3>
                  <div className="flex items-center gap-2 text-purple-600 mb-2">
                    <Calendar size={16} />
                    <span>{edu.period}</span>
                  </div>
                  <p className="text-purple-700 font-medium mb-2">{edu.degree}</p>
                  <p className="text-gray-600">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interests Section */}
      <section id="interests" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Tech Interests</span>
          </h2>
          <div className="flex flex-row overflow-x-auto gap-x-6 mb-12 hide-scrollbar">
            {portfolioData.interests.map((interest, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-xl p-6 text-center hover:shadow-lg hover:border-purple-300 transition-all min-w-[260px] max-w-[260px] flex-shrink-0">
                <div className="bg-purple-100 p-4 rounded-lg inline-block mb-4 border border-purple-200">
                  {index === 0 && <Code className="text-purple-600" size={32} />}
                  {index === 1 && <Database className="text-purple-600" size={32} />}
                  {index === 2 && <Terminal className="text-purple-600" size={32} />}
                  {index === 3 && <Users className="text-purple-600" size={32} />}
                </div>
                <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">{interest.title}</h3>
                <p className="text-gray-600">{interest.description}</p>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-xl p-8 text-center shadow-sm">
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-4">Always Learning & Exploring</h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              As a tech enthusiast, I'm constantly expanding my knowledge in emerging technologies and methodologies. 
              I enjoy tackling challenging problems and finding elegant solutions through code.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Get In Touch</span>
          </h2>
          <p className="text-gray-600 text-lg mb-12">
            Feel free to reach out for collaborations, project opportunities, or just to say hello!
          </p>
          
          <div className="flex justify-center gap-6 mb-12">
            {portfolioData.social.filter(social => social.url).map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target={social.platform === 'Email' ? undefined : '_blank'}
                rel={social.platform === 'Email' ? undefined : 'noopener noreferrer'}
                className="bg-white border border-gray-200 p-4 rounded-lg hover:shadow-lg hover:border-purple-300 transition-all flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.platform}
              >
                {social.platform === 'LinkedIn' && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-700"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6.75A2.25 2.25 0 0014.25 4.5h-4.5A2.25 2.25 0 007.5 6.75v10.5A2.25 2.25 0 009.75 19.5h4.5a2.25 2.25 0 002.25-2.25v-1.5m-6-7.5h.008v.008H10.5V8.25zm0 3.75v6.75m3-6.75v6.75m3-6.75v6.75" /></svg>}
                {social.platform === 'Twitter' && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 19.5c7.5 0 11.625-6.214 11.625-11.625 0-.177 0-.353-.012-.53A8.348 8.348 0 0022.5 4.5a8.19 8.19 0 01-2.357.646A4.117 4.117 0 0021.9 3.1a8.224 8.224 0 01-2.605.996A4.107 4.107 0 0012 8.25c0 .32.036.634.105.934A11.654 11.654 0 013 5.1a4.106 4.106 0 001.27 5.482A4.073 4.073 0 012.8 9.5v.052a4.108 4.108 0 003.292 4.025 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.843" /></svg>}
                {social.platform === 'GitHub' && <Github className="text-gray-800 w-6 h-6" />}
                {social.platform === 'Email' && <Mail className="text-purple-600 w-6 h-6" />}
              </motion.a>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.07, boxShadow: '0 8px 32px rgba(128,0,128,0.15)' }}
              whileTap={{ scale: 0.97 }}
              href={`mailto:${portfolioData.personal.email}`}
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-8 py-3 rounded-lg font-medium transition-all flex items-center gap-2 justify-center shadow-lg"
            >
              <Mail size={18} />
              <span>{portfolioData.personal.email}</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.07, boxShadow: '0 8px 32px rgba(128,0,128,0.15)' }}
              whileTap={{ scale: 0.97 }}
              href={portfolioData.personal.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-purple-600 hover:bg-purple-50 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center"
            >
              <Download size={18} />
              <span>Download CV</span>
            </motion.a>
          </div>

          {/* Review Form */}
          <motion.div
            className="mt-16 max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-purple-100"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Leave a Review</h3>
            <ReviewForm />
          </motion.div>

          {/* Reviews List */}
          <motion.div
            className="mt-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ReviewsList />
          </motion.div>

          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} Keren Hapuch. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const ReviewForm = () => {
  const [name, setName] = React.useState('');
  const [review, setReview] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  const [reviews, setReviews] = React.useState(() => {
    // Persist reviews in localStorage
    const saved = localStorage.getItem('portfolio_reviews');
    return saved ? JSON.parse(saved) : [];
  });
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !review || rating === 0) return;
    const newReview = { name, review, rating, date: new Date().toISOString() };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('portfolio_reviews', JSON.stringify(updated));
    setName('');
    setReview('');
    setRating(0);
    setHoverRating(0);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Your Name"
        className="border border-purple-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Your Review"
        className="border border-purple-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        value={review}
        onChange={e => setReview(e.target.value)}
        required
      />
      <div className="flex items-center gap-2">
        {[1,2,3,4,5].map(star => (
          <Star
            key={star}
            size={24}
            className={`cursor-pointer ${star <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-300'}`}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(star)}
            fill={star <= (hoverRating || rating) ? '#facc15' : 'none'}
          />
        ))}
        <span className="text-sm text-gray-500 ml-2">{rating ? `${rating}/5` : ''}</span>
      </div>
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: '#a21caf', color: '#fff' }}
        whileTap={{ scale: 0.97 }}
        type="submit"
        className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all"
      >
        Submit Review
      </motion.button>
      {submitted && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-600 font-medium">Thank you for your review!</motion.div>}
    </form>
  );
};

const ReviewsList = () => {
  const [reviews, setReviews] = React.useState(() => {
    const saved = localStorage.getItem('portfolio_reviews');
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    const handler = () => {
      const saved = localStorage.getItem('portfolio_reviews');
      setReviews(saved ? JSON.parse(saved) : []);
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  if (!reviews.length) return <p className="text-gray-400">No reviews yet. Be the first!</p>;

  return (
    <div className="flex flex-row overflow-x-auto gap-x-6 hide-scrollbar">
      {reviews.map((r, i) => (
        <motion.div
          key={i}
          className="bg-white border border-purple-100 rounded-lg p-4 shadow-sm text-left min-w-[320px] max-w-[320px] flex-shrink-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-purple-700">{r.name}</span>
            <span className="flex gap-1">
              {[1,2,3,4,5].map(star => (
                <Star key={star} size={16} className={star <= r.rating ? 'text-yellow-400' : 'text-gray-200'} fill={star <= r.rating ? '#facc15' : 'none'} />
              ))}
            </span>
            <span className="text-xs text-gray-400 ml-2">{new Date(r.date).toLocaleDateString()}</span>
          </div>
          <p className="text-gray-700">{r.review}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Portfolio;
