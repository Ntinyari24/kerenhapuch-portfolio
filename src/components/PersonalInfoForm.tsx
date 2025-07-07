
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PortfolioData } from '../utils/portfolioData';

interface PersonalInfoFormProps {
  personalData: PortfolioData['personal'];
  onUpdate: (field: string, value: string) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ personalData, onUpdate }) => {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white">Personal Information</CardTitle>
        <CardDescription className="text-white/70">Update your personal details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-white text-sm font-medium">Name</label>
          <Input
            value={personalData.name}
            onChange={(e) => onUpdate('name', e.target.value)}
            className="bg-white/5 border-white/20 text-white mt-1"
          />
        </div>
        <div>
          <label className="text-white text-sm font-medium">Email</label>
          <Input
            value={personalData.email}
            onChange={(e) => onUpdate('email', e.target.value)}
            className="bg-white/5 border-white/20 text-white mt-1"
          />
        </div>
        <div>
          <label className="text-white text-sm font-medium">Bio</label>
          <Textarea
            value={personalData.bio}
            onChange={(e) => onUpdate('bio', e.target.value)}
            className="bg-white/5 border-white/20 text-white mt-1"
            rows={4}
          />
        </div>
        <div>
          <label className="text-white text-sm font-medium">CV URL</label>
          <Input
            value={personalData.cvUrl}
            onChange={(e) => onUpdate('cvUrl', e.target.value)}
            className="bg-white/5 border-white/20 text-white mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
