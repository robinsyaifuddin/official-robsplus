
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sidebar } from "@/components/ui/sidebar";
import AdminHeader from './AdminHeader';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    console.log("AdminLayout rendered", { 
      path: location.pathname,
      user: user?.email,
      isAdmin: isAdmin(),
      loading
    });
    
    // Check if user is admin after auth is loaded
    if (!loading) {
      const adminStatus = isAdmin();
      const manualSession = localStorage.getItem('manual_admin_session') === 'true';
      
      console.log("Admin verification in layout:", {
        adminStatus,
        manualSession,
        userEmail: user?.email
      });
      
      if (!adminStatus && !manualSession) {
        toast.error("Autentikasi diperlukan", {
          description: "Silakan login sebagai admin untuk mengakses halaman ini"
        });
        navigate("/admin", { replace: true });
        return;
      }
      
      // Mark as ready to render content
      setIsReady(true);
    }
  }, [location, loading, user, isAdmin, navigate]);

  if (loading || !isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-cyberpunk" />
          <p className="text-white">Memuat dashboard admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-dark text-white">
      <AdminHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-dark p-6">
          <ScrollArea className="h-full w-full">
            <Outlet />
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
