
import React from 'react';
import { LogOut, User, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AdminHeader = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Gagal logout', {
        description: error.message,
      });
      return;
    }
    
    toast.success('Berhasil logout');
    navigate('/admin');
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-800 bg-dark-secondary p-4">
      <div className="flex items-center space-x-4">
        <div className="hidden text-xl font-bold text-white md:block">
          ROBsPlus Admin
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/admin/generate-token')}
          className="text-gray-400 hover:bg-gray-800 hover:text-white"
        >
          <Shield className="mr-2 h-4 w-4 text-cyberpunk" />
          Setup URL
        </Button>

        <div className="text-sm text-gray-400">
          {user?.email || 'robsplus.admin@gmail.com'}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="text-gray-400 hover:bg-gray-800 hover:text-white"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
