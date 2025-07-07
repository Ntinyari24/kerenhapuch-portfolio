import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, Github, Mail, Download, ArrowDown, User, Briefcase, Calendar, Code, Database, Users, Terminal, BookOpen, GraduationCap } from 'lucide-react';
import { getPortfolioData } from '../utils/portfolioData';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [portfolioData, setPortfolioData] = useState(getPortfolioData());

  useEffect(() => {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-white">
              Keren<span className="text-purple-400">Hapuch</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'Projects', 'Skills', 'Education', 'Interests', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-purple-400 ${
                    activeSection === item.toLowerCase() ? 'text-purple-400' : 'text-white/80'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Admin Access */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="/admin"
                className="text-sm text-white/60 hover:text-purple-400 transition-colors"
              >
                Admin
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/40 backdrop-blur-md border-t border-white/10">
            <div className="px-4 py-4 space-y-3">
              {['Home', 'Projects', 'Skills', 'Education', 'Interests', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left text-white/80 hover:text-purple-400 transition-colors"
                >
                  {item}
                </button>
              ))}
              <a
                href="/admin"
                className="block text-white/60 hover:text-purple-400 transition-colors pt-2 border-t border-white/10"
              >
                Admin Access
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <User className="text-purple-400" size={20} />
              <span className="text-white/80 text-sm tracking-wider uppercase">
                {portfolioData.personal.name}
              </span>
              <Briefcase className="text-purple-400" size={20} />
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Full-Stack <span className="text-purple-400">Developer</span>
            </h1>
            
            <p className="text-white/70 text-lg mb-8 max-w-2xl">
              {portfolioData.personal.bio}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center"
              >
                <span>View My Projects</span>
                <ArrowDown size={18} />
              </button>
              <a
                href={portfolioData.personal.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-purple-400 hover:bg-purple-400/10 text-purple-400 px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center"
              >
                <span>Download CV</span>
                <Download size={18} />
              </a>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full p-1">
                <img
                  src="/api/placeholder/320/320"
                  alt="Keren Hapuch"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <p className="text-white text-sm font-medium">Tech Enthusiast</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-16">
            My Projects
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-colors">
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
                      <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                        <span className="text-white font-medium flex items-center gap-2">
                          {project.websiteUrl ? 'View Website' : 'View Code'}
                          <ExternalLink size={16} />
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                  
                  <p className="text-white/70 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <a
                    href={project.websiteUrl || project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2"
                  >
                    <span>{project.websiteUrl ? 'Visit Website' : 'See More'}</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-16">
            My Tech Stack
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
            {portfolioData.skills.languages.map((skill, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                  <Code className="text-purple-400 mx-auto mb-3" size={32} />
                  <span className="text-white font-medium">{skill}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="text-purple-400" size={24} />
                <h3 className="text-xl font-semibold text-white">Development Tools</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {portfolioData.skills.tools.map((tool, index) => (
                  <span
                    key={index}
                    className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Code className="text-purple-400" size={24} />
                <h3 className="text-xl font-semibold text-white">Other Skills</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {portfolioData.skills.other.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-16">
            My Education
          </h2>
          
          <div className="space-y-8">
            {portfolioData.education.map((edu, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 flex gap-6">
                <div className="flex-shrink-0">
                  <div className="bg-purple-600/20 p-3 rounded-lg">
                    <GraduationCap className="text-purple-400" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{edu.institution}</h3>
                  <div className="flex items-center gap-2 text-purple-400 mb-2">
                    <Calendar size={16} />
                    <span>{edu.period}</span>
                  </div>
                  <p className="text-purple-300 font-medium mb-2">{edu.degree}</p>
                  <p className="text-white/70">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section id="interests" className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-16">
            Tech Interests
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {portfolioData.interests.map((interest, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-colors">
                <div className="bg-purple-600/20 p-4 rounded-lg inline-block mb-4">
                  {index === 0 && <Code className="text-purple-400" size={32} />}
                  {index === 1 && <Database className="text-purple-400" size={32} />}
                  {index === 2 && <Terminal className="text-purple-400" size={32} />}
                  {index === 3 && <Users className="text-purple-400" size={32} />}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{interest.title}</h3>
                <p className="text-white/70">{interest.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-semibold text-white mb-4">Always Learning & Exploring</h3>
            <p className="text-white/70 max-w-3xl mx-auto">
              As a tech enthusiast, I'm constantly expanding my knowledge in emerging technologies and methodologies. 
              I enjoy tackling challenging problems and finding elegant solutions through code.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">
            Get In Touch
          </h2>
          <p className="text-white/70 text-lg mb-12">
            Feel free to reach out for collaborations, project opportunities, or just to say hello!
          </p>
          
          <div className="flex justify-center gap-6 mb-12">
            {portfolioData.social.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-lg hover:bg-white/10 transition-colors"
              >
                {social.platform === 'LinkedIn' && <Code className="text-purple-400" size={24} />}
                {social.platform === 'Twitter' && <Code className="text-purple-400" size={24} />}
                {social.platform === 'GitHub' && <Github className="text-purple-400" size={24} />}
                {social.platform === 'Email' && <Mail className="text-purple-400" size={24} />}
              </a>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center"
            >
              <Mail size={18} />
              <span>{portfolioData.personal.email}</span>
            </a>
            <a
              href={portfolioData.personal.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-purple-400 hover:bg-purple-400/10 text-purple-400 px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center"
            >
              <Download size={18} />
              <span>Download CV</span>
            </a>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-white/50">
              &copy; {new Date().getFullYear()} Keren Hapuch. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
