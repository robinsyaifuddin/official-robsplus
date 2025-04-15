
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Verifikasi koneksi Supabase
    const checkSupabaseConnection = async () => {
      try {
        // Periksa koneksi ke Supabase dengan menjalankan query sederhana
        const { error } = await supabase.from('settings').select('id').limit(1);
        
        if (error) {
          console.error("Supabase connection error:", error);
          toast.error("Koneksi Supabase gagal", {
            description: "Terjadi masalah saat terhubung ke database"
          });
        } else {
          console.log("Supabase connection successful");
        }
      } catch (e) {
        console.error("Failed to connect to Supabase:", e);
      }
    };
    
    checkSupabaseConnection();
    
    // Wait for authentication to complete
    if (!loading) {
      console.log("Auth state loaded in AuthGuard:", { 
        user: user?.email, 
        isAdmin: isAdmin(),
        path: location.pathname,
        manualSession: localStorage.getItem('manual_admin_session')
      });
      
      // Set a delay to ensure auth state is fully processed
      const timer = setTimeout(() => {
        // Force reload localStorage to ensure it's up to date
        const manualAdminSession = localStorage.getItem('manual_admin_session');
        const adminStatus = isAdmin() || manualAdminSession === 'true';
        
        console.log("Admin authentication check:", {
          userExists: !!user,
          isAdmin: isAdmin(),
          manualAdminSession: manualAdminSession,
          finalAdminStatus: adminStatus
        });
        
        if (!adminStatus) {
          console.log("Failed admin authentication, redirecting to login");
          
          // Only show toast if not coming from login page
          if (location.pathname !== "/admin") {
            toast.error("Autentikasi diperlukan", {
              description: "Silakan login sebagai admin untuk mengakses halaman ini"
            });
          }
          
          // Force clear any potentially corrupted admin sessions
          localStorage.removeItem('manual_admin_session');
          
          navigate("/admin", { replace: true });
        } else {
          console.log("Admin authentication successful, rendering content");
          // Re-validate manual admin session if needed
          if (!user && manualAdminSession === 'true') {
            console.log("Using manual admin session without user object");
            
            // Refresh session for better reliability
            localStorage.setItem('manual_admin_session', 'true');
          }
        }
        
        setIsChecking(false);
      }, 200); // Reduced timeout for faster response
      
      return () => clearTimeout(timer);
    }
  }, [loading, user, isAdmin, navigate, location.pathname]);

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

  // Perform final authentication check
  const manualSession = localStorage.getItem('manual_admin_session');
  const isAuthenticated = isAdmin() || manualSession === 'true';
  
  if (!isAuthenticated) {
    console.log("Final check: Not authenticated as admin, redirecting to login page");
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  console.log("User is authenticated as admin, rendering admin content", {path: location.pathname});
  return <>{children}</>;
};

export default AuthGuard;
