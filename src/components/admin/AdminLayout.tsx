
import React, { useEffect, useState, Suspense } from 'react';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import AdminHeader from './AdminHeader';
import { useAuth } from '@/hooks/useAuth';
import { 
  Loader2, Database, LayoutDashboard, FileText, ShoppingBag, 
  Image, Users, Settings, Link as LinkIcon, Key 
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';

// Custom lazy loading component with spinner
const LazyLoadingSpinner = () => (
  <div className="flex items-center justify-center h-full p-8">
    <Loader2 className="h-8 w-8 animate-spin text-cyberpunk" />
    <span className="ml-2 text-gray-400">Memuat...</span>
  </div>
);

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);
  
  // Use React Query for Supabase connection status
  const { data: supabaseStatus, isLoading: checkingSupabase } = useQuery({
    queryKey: ['supabase-connection'],
    queryFn: async () => {
      try {
        console.log("AdminLayout: Checking Supabase connection...");
        const { error } = await supabase.from('settings').select('id').limit(1);
        
        if (error) {
          console.error("AdminLayout: Supabase connection error:", error);
          toast.error("Koneksi Supabase gagal", {
            description: "Terjadi masalah saat terhubung ke database. Coba refresh halaman."
          });
          return 'error';
        } 
        
        console.log("AdminLayout: Supabase connection successful");
        return 'connected';
      } catch (e) {
        console.error("AdminLayout: Failed to connect to Supabase:", e);
        return 'error';
      }
    },
    staleTime: 60000, // Cache for 1 minute
    retry: 2
  });
  
  useEffect(() => {
    console.log("AdminLayout: Initial render", { 
      path: location.pathname,
      user: user?.email,
      adminStatus: isAdmin(), 
      manualSession: localStorage.getItem('manual_admin_session')
    });
    
    // Set ready state after a short delay to prevent flicker
    setTimeout(() => {
      setIsReady(true);
    }, 300);
    
    // Check if user is admin
    if (!loading) {
      const adminStatus = isAdmin();
      const manualSession = localStorage.getItem('manual_admin_session') === 'true';
      
      console.log("AdminLayout: Admin verification:", {
        adminStatus,
        manualSession,
        userEmail: user?.email
      });
      
      if (!adminStatus && !manualSession) {
        toast.error("Autentikasi diperlukan", {
          description: "Silakan login sebagai admin untuk mengakses halaman ini"
        });
        navigate("/admin", { replace: true });
      }
    }
  }, [location, loading, user, isAdmin, navigate]);

  if (loading || !isReady || checkingSupabase) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-cyberpunk" />
          <p className="text-white">Memuat dashboard admin...</p>
        </div>
      </div>
    );
  }

  if (supabaseStatus === 'error') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark">
        <div className="flex flex-col items-center gap-4 max-w-md text-center p-6">
          <Database className="h-12 w-12 text-red-500" />
          <h2 className="text-xl font-bold text-white">Koneksi Database Bermasalah</h2>
          <p className="text-gray-300 mb-4">Tidak dapat terhubung ke Supabase. Pastikan koneksi internet Anda stabil dan coba refresh halaman.</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-cyberpunk text-white rounded hover:bg-cyberpunk-light"
          >
            Refresh Halaman
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-dark text-white">
      <AdminHeader />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-auto bg-dark p-6">
          <ScrollArea className="h-full w-full">
            <Suspense fallback={<LazyLoadingSpinner />}>
              <Outlet />
            </Suspense>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

// Create a custom sidebar for admin
const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };
  
  const sidebarItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/admin/dashboard' 
    },
    { 
      icon: FileText, 
      label: 'Halaman', 
      path: '/admin/pages' 
    },
    { 
      icon: ShoppingBag, 
      label: 'Produk', 
      path: '/admin/products' 
    },
    { 
      icon: Image, 
      label: 'Portofolio', 
      path: '/admin/portfolio' 
    },
    { 
      icon: Users, 
      label: 'Pengguna', 
      path: '/admin/users' 
    },
    { 
      icon: Settings, 
      label: 'Pengaturan', 
      path: '/admin/website' 
    },
    { 
      icon: LinkIcon, 
      label: 'Integrasi', 
      path: '/admin/integration' 
    },
    { 
      icon: Key, 
      label: 'Token Setup', 
      path: '/admin/generate-token' 
    }
  ];
  
  return (
    <div className="w-64 bg-dark-secondary border-r border-gray-800">
      <div className="p-4">
        <h2 className="text-xl font-bold text-cyberpunk">ROBsPlus Admin</h2>
        <p className="text-sm text-gray-400">Manajemen Konten</p>
      </div>
      
      <div className="mt-2 px-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left mb-1 ${
              isActive(item.path)
                ? 'bg-cyberpunk text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <span className={`${isActive(item.path) ? 'text-white' : 'text-gray-400'}`}>
              <item.icon className="h-5 w-5" />
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminLayout;
