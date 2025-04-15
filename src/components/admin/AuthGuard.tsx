
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, Database, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const [supabaseStatus, setSupabaseStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  useEffect(() => {
    console.log("AuthGuard: Initial render", { 
      pathname: location.pathname,
      loading, 
      user: user?.email, 
      isAdminFunc: isAdmin()
    });
    
    // Verify Supabase connection
    const checkSupabaseConnection = async () => {
      try {
        console.log("AuthGuard: Checking Supabase connection...");
        // Use a simple query to check connection
        const { error } = await supabase.from('settings').select('id').limit(1);
        
        if (error) {
          console.error("AuthGuard: Supabase connection error:", error);
          setSupabaseStatus('error');
          toast.error("Koneksi Supabase gagal", {
            description: "Terjadi masalah saat terhubung ke database. Coba refresh halaman."
          });
        } else {
          console.log("AuthGuard: Supabase connection successful");
          setSupabaseStatus('connected');
        }
      } catch (e) {
        console.error("AuthGuard: Failed to connect to Supabase:", e);
        setSupabaseStatus('error');
      }
    };
    
    // Run the connection check immediately
    checkSupabaseConnection();
    
    // Auth check logic
    if (!loading) {
      console.log("AuthGuard: Auth check starting", { 
        user: user?.email, 
        isAdmin: isAdmin(),
        manualSession: localStorage.getItem('manual_admin_session')
      });
      
      // Ensure we have the latest admin status
      const checkAdminAccess = () => {
        const manualAdminSession = localStorage.getItem('manual_admin_session');
        const adminStatus = isAdmin() || manualAdminSession === 'true';
        
        console.log("AuthGuard: Admin authentication check:", {
          userExists: !!user,
          isAdmin: isAdmin(),
          manualAdminSession: manualAdminSession,
          finalAdminStatus: adminStatus
        });
        
        if (!adminStatus) {
          console.log("AuthGuard: User is not an admin, redirecting to login");
          
          // Only show toast if not already on login page
          if (location.pathname !== "/admin") {
            toast.error("Autentikasi diperlukan", {
              description: "Silakan login sebagai admin untuk mengakses halaman ini"
            });
          }
          
          // Clear any potentially corrupted admin sessions
          localStorage.removeItem('manual_admin_session');
          
          navigate("/admin", { replace: true });
          return false;
        }
        
        // Re-validate manual admin session if needed
        if (!user && manualAdminSession === 'true') {
          console.log("AuthGuard: Using manual admin session without user object");
          // Refresh session
          localStorage.setItem('manual_admin_session', 'true');
        }
        
        return true;
      };
      
      // Delay slightly to ensure auth state is fully processed
      const timer = setTimeout(() => {
        const isAuthorized = checkAdminAccess();
        if (isAuthorized) {
          console.log("AuthGuard: User is authorized, rendering admin content");
        }
        setIsChecking(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [loading, user, isAdmin, navigate, location.pathname]);

  // Show loading state while checking
  if (loading || isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-cyberpunk" />
          <p className="text-white">Memeriksa autentikasi dan koneksi Supabase...</p>
        </div>
      </div>
    );
  }

  // Show database connection error
  if (supabaseStatus === 'error') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark">
        <div className="flex flex-col items-center gap-4 max-w-md text-center p-6">
          <Database className="h-12 w-12 text-red-500" />
          <h2 className="text-xl font-bold text-white">Koneksi Database Bermasalah</h2>
          <p className="text-gray-300 mb-4">
            Tidak dapat terhubung ke Supabase. Pastikan koneksi internet Anda stabil dan coba refresh halaman.
          </p>
          <div className="flex gap-3">
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-cyberpunk hover:bg-cyberpunk-light flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Halaman
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-700"
              onClick={() => navigate("/admin", { replace: true })}
            >
              Kembali ke Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Final auth check before rendering
  const manualSession = localStorage.getItem('manual_admin_session');
  const isAuthenticated = isAdmin() || manualSession === 'true';
  
  if (!isAuthenticated) {
    console.log("AuthGuard: Final check: Not authenticated as admin, redirecting to login page");
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  console.log("AuthGuard: User is authenticated as admin, rendering admin content");
  return <>{children}</>;
};

export default AuthGuard;
