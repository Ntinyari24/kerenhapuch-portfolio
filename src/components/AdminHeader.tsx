import React from 'react';
import { LogOut, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminHeaderProps {
  onSave: () => void;
  onLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onSave, onLogout }) => {
  return (
    <div className="bg-black/20 backdrop-blur-md border-b border-white/10 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex gap-3">
          <Button onClick={onSave} className="bg-green-600 hover:bg-green-700">
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
  );
};

export default AdminHeader;
