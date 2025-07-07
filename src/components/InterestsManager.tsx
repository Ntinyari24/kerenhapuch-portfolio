
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Interest } from '../utils/portfolioData';

interface InterestsManagerProps {
  interests: Interest[];
  onUpdate: (index: number, field: string, value: string) => void;
}

const InterestsManager: React.FC<InterestsManagerProps> = ({ interests, onUpdate }) => {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white">Tech Interests</CardTitle>
        <CardDescription className="text-white/70">Manage your areas of interest</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {interests.map((interest, index) => (
          <div key={index} className="space-y-2">
            <div>
              <label className="text-white text-sm font-medium">Interest {index + 1} - Title</label>
              <Input
                value={interest.title}
                onChange={(e) => onUpdate(index, 'title', e.target.value)}
                className="bg-white/5 border-white/20 text-white mt-1"
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium">Description</label>
              <Textarea
                value={interest.description}
                onChange={(e) => onUpdate(index, 'description', e.target.value)}
                className="bg-white/5 border-white/20 text-white mt-1"
                rows={2}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default InterestsManager;
