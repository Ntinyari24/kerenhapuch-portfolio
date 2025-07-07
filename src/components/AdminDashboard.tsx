import React, { useState } from 'react';
import { LogOut, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getPortfolioData, updatePortfolioData } from '../utils/portfolioData';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [portfolioData, setPortfolioData] = useState(getPortfolioData());
  const [editingProject, setEditingProject] = useState<number | null>(null);
  const [editingEducation, setEditingEducation] = useState<number | null>(null);
  const [editingInterest, setEditingInterest] = useState<number | null>(null);

  const handleSave = () => {
    updatePortfolioData(portfolioData);
    // In a real app, you'd save to a backend here
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
    setPortfolioData({
      ...portfolioData,
      projects: [...portfolioData.projects, newProject],
    });
  };

  const updateProject = (index: number, field: string, value: any) => {
    const updatedProjects = [...portfolioData.projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setPortfolioData({ ...portfolioData, projects: updatedProjects });
  };

  const deleteProject = (index: number) => {
    const updatedProjects = portfolioData.projects.filter((_, i) => i !== index);
    setPortfolioData({ ...portfolioData, projects: updatedProjects });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex gap-3">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save size={16} className="mr-2" />
              Save Changes
            </Button>
            <Button onClick={onLogout} variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="personal" className="data-[state=active]:bg-purple-600">Personal Info</TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-purple-600">Projects</TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-purple-600">Skills</TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-purple-600">Education</TabsTrigger>
            <TabsTrigger value="interests" className="data-[state=active]:bg-purple-600">Interests</TabsTrigger>
          </TabsList>

          {/* Personal Info Tab */}
          <TabsContent value="personal">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Personal Information</CardTitle>
                <CardDescription className="text-white/70">Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-white text-sm font-medium">Name</label>
                  <Input
                    value={portfolioData.personal.name}
                    onChange={(e) => setPortfolioData({
                      ...portfolioData,
                      personal: { ...portfolioData.personal, name: e.target.value }
                    })}
                    className="bg-white/5 border-white/20 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-medium">Email</label>
                  <Input
                    value={portfolioData.personal.email}
                    onChange={(e) => setPortfolioData({
                      ...portfolioData,
                      personal: { ...portfolioData.personal, email: e.target.value }
                    })}
                    className="bg-white/5 border-white/20 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-medium">Bio</label>
                  <Textarea
                    value={portfolioData.personal.bio}
                    onChange={(e) => setPortfolioData({
                      ...portfolioData,
                      personal: { ...portfolioData.personal, bio: e.target.value }
                    })}
                    className="bg-white/5 border-white/20 text-white mt-1"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-medium">CV URL</label>
                  <Input
                    value={portfolioData.personal.cvUrl}
                    onChange={(e) => setPortfolioData({
                      ...portfolioData,
                      personal: { ...portfolioData.personal, cvUrl: e.target.value }
                    })}
                    className="bg-white/5 border-white/20 text-white mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Projects</h2>
                <Button onClick={addProject} className="bg-purple-600 hover:bg-purple-700">
                  <Plus size={16} className="mr-2" />
                  Add Project
                </Button>
              </div>

              <div className="grid gap-6">
                {portfolioData.projects.map((project, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-white">{project.title}</CardTitle>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingProject(editingProject === index ? null : index)}
                            className="border-white/20 text-white hover:bg-white/10"
                          >
                            {editingProject === index ? <X size={16} /> : <Edit2 size={16} />}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteProject(index)}
                            className="border-red-400/20 text-red-400 hover:bg-red-400/10"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    {editingProject === index && (
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-white text-sm font-medium">Title</label>
                          <Input
                            value={project.title}
                            onChange={(e) => updateProject(index, 'title', e.target.value)}
                            className="bg-white/5 border-white/20 text-white mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-white text-sm font-medium">Description</label>
                          <Textarea
                            value={project.description}
                            onChange={(e) => updateProject(index, 'description', e.target.value)}
                            className="bg-white/5 border-white/20 text-white mt-1"
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="text-white text-sm font-medium">Tags (comma-separated)</label>
                          <Input
                            value={project.tags.join(', ')}
                            onChange={(e) => updateProject(index, 'tags', e.target.value.split(',').map(tag => tag.trim()))}
                            className="bg-white/5 border-white/20 text-white mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-white text-sm font-medium">GitHub URL</label>
                          <Input
                            value={project.githubUrl}
                            onChange={(e) => updateProject(index, 'githubUrl', e.target.value)}
                            className="bg-white/5 border-white/20 text-white mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-white text-sm font-medium">Website URL (optional)</label>
                          <Input
                            value={project.websiteUrl || ''}
                            onChange={(e) => updateProject(index, 'websiteUrl', e.target.value)}
                            className="bg-white/5 border-white/20 text-white mt-1"
                            placeholder="https://yourproject.com"
                          />
                        </div>
                        <div>
                          <label className="text-white text-sm font-medium">Project Image URL (optional)</label>
                          <Input
                            value={project.imageUrl || ''}
                            onChange={(e) => updateProject(index, 'imageUrl', e.target.value)}
                            className="bg-white/5 border-white/20 text-white mt-1"
                            placeholder="https://example.com/image.jpg or use Unsplash format: photo-1234567890"
                          />
                        </div>
                        {project.imageUrl && (
                          <div>
                            <label className="text-white text-sm font-medium mb-2 block">Image Preview</label>
                            <div className="bg-white/5 border border-white/20 rounded-lg p-4">
                              <img
                                src={project.imageUrl.startsWith('photo-') 
                                  ? `https://images.unsplash.com/${project.imageUrl}?w=300&h=200&fit=crop`
                                  : project.imageUrl
                                }
                                alt="Project preview"
                                className="w-full max-w-xs h-32 object-cover rounded"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Skills Management</CardTitle>
                <CardDescription className="text-white/70">Update your technical skills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-white text-sm font-medium">Programming Languages (comma-separated)</label>
                  <Input
                    value={portfolioData.skills.languages.join(', ')}
                    onChange={(e) => setPortfolioData({
                      ...portfolioData,
                      skills: {
                        ...portfolioData.skills,
                        languages: e.target.value.split(',').map(skill => skill.trim())
                      }
                    })}
                    className="bg-white/5 border-white/20 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-medium">Development Tools (comma-separated)</label>
                  <Input
                    value={portfolioData.skills.tools.join(', ')}
                    onChange={(e) => setPortfolioData({
                      ...portfolioData,
                      skills: {
                        ...portfolioData.skills,
                        tools: e.target.value.split(',').map(tool => tool.trim())
                      }
                    })}
                    className="bg-white/5 border-white/20 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-medium">Other Skills (comma-separated)</label>
                  <Input
                    value={portfolioData.skills.other.join(', ')}
                    onChange={(e) => setPortfolioData({
                      ...portfolioData,
                      skills: {
                        ...portfolioData.skills,
                        other: e.target.value.split(',').map(skill => skill.trim())
                      }
                    })}
                    className="bg-white/5 border-white/20 text-white mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Education</h2>
                <Button onClick={addEducation} className="bg-purple-600 hover:bg-purple-700">
                  <Plus size={16} className="mr-2" />
                  Add Education
                </Button>
              </div>

              <div className="grid gap-6">
                {portfolioData.education.map((edu, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-white">{edu.institution}</CardTitle>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingEducation(editingEducation === index ? null : index)}
                            className="border-white/20 text-white hover:bg-white/10"
                          >
                            {editingEducation === index ? <X size={16} /> : <Edit2 size={16} />}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteEducation(index)}
                            className="border-red-400/20 text-red-400 hover:bg-red-400/10"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    {editingEducation === index && (
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-white text-sm font-medium">Institution</label>
                          <Input
                            value={edu.institution}
                            onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                            className="bg-white/5 border-white/20 text-white mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-white text-sm font-medium">Degree</label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                            className="bg-white/5 border-white/20 text-white mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-white text-sm font-medium">Period</label>
                          <Input
                            value={edu.period}
                            onChange={(e) => updateEducation(index, 'period', e.target.value)}
                            className="bg-white/5 border-white/20 text-white mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-white text-sm font-medium">Description</label>
                          <Textarea
                            value={edu.description}
                            onChange={(e) => updateEducation(index, 'description', e.target.value)}
                            className="bg-white/5 border-white/20 text-white mt-1"
                            rows={3}
                          />
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Interests Tab */}
          <TabsContent value="interests">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Tech Interests</CardTitle>
                <CardDescription className="text-white/70">Manage your areas of interest</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {portfolioData.interests.map((interest, index) => (
                  <div key={index} className="space-y-2">
                    <div>
                      <label className="text-white text-sm font-medium">Interest {index + 1} - Title</label>
                      <Input
                        value={interest.title}
                        onChange={(e) => {
                          const updatedInterests = [...portfolioData.interests];
                          updatedInterests[index] = { ...updatedInterests[index], title: e.target.value };
                          setPortfolioData({ ...portfolioData, interests: updatedInterests });
                        }}
                        className="bg-white/5 border-white/20 text-white mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm font-medium">Description</label>
                      <Textarea
                        value={interest.description}
                        onChange={(e) => {
                          const updatedInterests = [...portfolioData.interests];
                          updatedInterests[index] = { ...updatedInterests[index], description: e.target.value };
                          setPortfolioData({ ...portfolioData, interests: updatedInterests });
                        }}
                        className="bg-white/5 border-white/20 text-white mt-1"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
