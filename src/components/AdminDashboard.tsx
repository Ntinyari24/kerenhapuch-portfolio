import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getPortfolioData, updatePortfolioData } from '../utils/portfolioData';
import AdminHeader from './AdminHeader';
import PersonalInfoForm from './PersonalInfoForm';
import ProjectsManager from './ProjectsManager';
import SkillsManager from './SkillsManager';
import EducationManager from './EducationManager';
import InterestsManager from './InterestsManager';
import CertificationsManager from './CertificationsManager';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [portfolioData, setPortfolioData] = useState(getPortfolioData());

  const handleSave = () => {
    updatePortfolioData(portfolioData);
    alert('Changes saved successfully!');
  };

  const addProject = () => {
    const newProject = {
      title: 'New Project',
      description: 'Project description',
      tags: ['Tag1'],
      githubUrl: 'https://github.com',
      imageUrl: '',
      websiteUrl: '',
    };
    const newPortfolioData = {
      ...portfolioData,
      projects: [...portfolioData.projects, newProject],
    };
    setPortfolioData(newPortfolioData);
    updatePortfolioData(newPortfolioData);
  };

  const updateProject = (index: number, field: string, value: any) => {
    const updatedProjects = [...portfolioData.projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    const newPortfolioData = { ...portfolioData, projects: updatedProjects };
    setPortfolioData(newPortfolioData);
    updatePortfolioData(newPortfolioData);
  };

  const deleteProject = (index: number) => {
    const updatedProjects = portfolioData.projects.filter((_, i) => i !== index);
    const newPortfolioData = { ...portfolioData, projects: updatedProjects };
    setPortfolioData(newPortfolioData);
    updatePortfolioData(newPortfolioData);
  };

  const addEducation = () => {
    const newEducation = {
      institution: 'New Institution',
      degree: 'New Degree',
      period: '2024 - Present',
      description: 'Education description',
    };
    setPortfolioData({
      ...portfolioData,
      education: [...portfolioData.education, newEducation],
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updatedEducation = [...portfolioData.education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setPortfolioData({ ...portfolioData, education: updatedEducation });
  };

  const deleteEducation = (index: number) => {
    const updatedEducation = portfolioData.education.filter((_, i) => i !== index);
    setPortfolioData({ ...portfolioData, education: updatedEducation });
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setPortfolioData({
      ...portfolioData,
      personal: { ...portfolioData.personal, [field]: value }
    });
  };

  const updateSkills = (category: string, skills: string[]) => {
    setPortfolioData({
      ...portfolioData,
      skills: { ...portfolioData.skills, [category]: skills }
    });
  };

  const updateInterest = (index: number, field: string, value: string) => {
    const updatedInterests = [...portfolioData.interests];
    updatedInterests[index] = { ...updatedInterests[index], [field]: value };
    setPortfolioData({ ...portfolioData, interests: updatedInterests });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <AdminHeader onSave={handleSave} onLogout={onLogout} />

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="personal" className="data-[state=active]:bg-purple-600">Personal Info</TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-purple-600">Projects</TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-purple-600">Skills</TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-purple-600">Education</TabsTrigger>
            <TabsTrigger value="certifications" className="data-[state=active]:bg-purple-600">Certifications</TabsTrigger>
            <TabsTrigger value="interests" className="data-[state=active]:bg-purple-600">Interests</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <PersonalInfoForm 
              personalData={portfolioData.personal}
              onUpdate={updatePersonalInfo}
            />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsManager
              projects={portfolioData.projects}
              onAdd={addProject}
              onUpdate={updateProject}
              onDelete={deleteProject}
            />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsManager
              skills={portfolioData.skills}
              onUpdate={updateSkills}
            />
          </TabsContent>

          <TabsContent value="education">
            <EducationManager
              education={portfolioData.education}
              onAdd={addEducation}
              onUpdate={updateEducation}
              onDelete={deleteEducation}
            />
          </TabsContent>

          <TabsContent value="certifications">
            <CertificationsManager />
          </TabsContent>

          <TabsContent value="interests">
            <InterestsManager
              interests={portfolioData.interests}
              onUpdate={updateInterest}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
// CertificationsManager extracted to its own file: ./CertificationsManager
