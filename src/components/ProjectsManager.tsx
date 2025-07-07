
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Project } from '../utils/portfolioData';

interface ProjectsManagerProps {
  projects: Project[];
  onAdd: () => void;
  onUpdate: (index: number, field: string, value: any) => void;
  onDelete: (index: number) => void;
}

const ProjectsManager: React.FC<ProjectsManagerProps> = ({ projects, onAdd, onUpdate, onDelete }) => {
  const [editingProject, setEditingProject] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Projects</h2>
        <Button onClick={onAdd} className="bg-purple-600 hover:bg-purple-700">
          <Plus size={16} className="mr-2" />
          Add Project
        </Button>
      </div>

      <div className="grid gap-6">
        {projects.map((project, index) => (
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
                    onClick={() => onDelete(index)}
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
                    onChange={(e) => onUpdate(index, 'title', e.target.value)}
                    className="bg-white/5 border-white/20 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-medium">Description</label>
                  <Textarea
                    value={project.description}
                    onChange={(e) => onUpdate(index, 'description', e.target.value)}
                    className="bg-white/5 border-white/20 text-white mt-1"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-medium">Tags (comma-separated)</label>
                  <Input
                    value={project.tags.join(', ')}
                    onChange={(e) => onUpdate(index, 'tags', e.target.value.split(',').map(tag => tag.trim()))}
                    className="bg-white/5 border-white/20 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-medium">GitHub URL</label>
                  <Input
                    value={project.githubUrl}
                    onChange={(e) => onUpdate(index, 'githubUrl', e.target.value)}
                    className="bg-white/5 border-white/20 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-medium">Website URL (optional)</label>
                  <Input
                    value={project.websiteUrl || ''}
                    onChange={(e) => onUpdate(index, 'websiteUrl', e.target.value)}
                    className="bg-white/5 border-white/20 text-white mt-1"
                    placeholder="https://yourproject.com"
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-medium">Project Image URL (optional)</label>
                  <Input
                    value={project.imageUrl || ''}
                    onChange={(e) => onUpdate(index, 'imageUrl', e.target.value)}
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
  );
};

export default ProjectsManager;
