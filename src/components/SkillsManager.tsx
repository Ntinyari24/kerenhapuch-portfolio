
import React from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PortfolioData } from '../utils/portfolioData';

interface SkillsManagerProps {
  skills: PortfolioData['skills'];
  onUpdate: (category: string, skills: string[]) => void;
}

const SkillsManager: React.FC<SkillsManagerProps> = ({ skills, onUpdate }) => {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white">Skills Management</CardTitle>
        <CardDescription className="text-white/70">Update your technical skills</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-white text-sm font-medium">Programming Languages (comma-separated)</label>
          <Input
            value={skills.languages.join(', ')}
            onChange={(e) => onUpdate('languages', e.target.value.split(',').map(skill => skill.trim()))}
            className="bg-white/5 border-white/20 text-white mt-1"
          />
        </div>
        <div>
          <label className="text-white text-sm font-medium">Development Tools (comma-separated)</label>
          <Input
            value={skills.tools.join(', ')}
            onChange={(e) => onUpdate('tools', e.target.value.split(',').map(tool => tool.trim()))}
            className="bg-white/5 border-white/20 text-white mt-1"
          />
        </div>
        <div>
          <label className="text-white text-sm font-medium">Other Skills (comma-separated)</label>
          <Input
            value={skills.other.join(', ')}
            onChange={(e) => onUpdate('other', e.target.value.split(',').map(skill => skill.trim()))}
            className="bg-white/5 border-white/20 text-white mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsManager;
