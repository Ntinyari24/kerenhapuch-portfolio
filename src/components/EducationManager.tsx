import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Education } from '../utils/portfolioData';
import { motion } from 'framer-motion';

interface EducationManagerProps {
  education: Education[];
  onAdd: () => void;
  onUpdate: (index: number, field: string, value: string) => void;
  onDelete: (index: number) => void;
}

const EducationManager: React.FC<EducationManagerProps> = ({ education, onAdd, onUpdate, onDelete }) => {
  const [editingEducation, setEditingEducation] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Education</h2>
        <Button onClick={onAdd} className="bg-purple-600 hover:bg-purple-700">
          <Plus size={16} className="mr-2" />
          Add Education
        </Button>
      </div>

      <div className="grid gap-6">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
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
                      onClick={() => onDelete(index)}
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
                      onChange={(e) => onUpdate(index, 'institution', e.target.value)}
                      className="bg-white/5 border-white/20 text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm font-medium">Degree</label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => onUpdate(index, 'degree', e.target.value)}
                      className="bg-white/5 border-white/20 text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm font-medium">Period</label>
                    <Input
                      value={edu.period}
                      onChange={(e) => onUpdate(index, 'period', e.target.value)}
                      className="bg-white/5 border-white/20 text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm font-medium">Description</label>
                    <Textarea
                      value={edu.description}
                      onChange={(e) => onUpdate(index, 'description', e.target.value)}
                      className="bg-white/5 border-white/20 text-white mt-1"
                      rows={3}
                    />
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EducationManager;
