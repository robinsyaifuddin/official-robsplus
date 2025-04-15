
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, Database } from 'lucide-react';
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
    // Verifikasi koneksi Supabase
    const checkSupabaseConnection = async () => {
      try {
        console.log("AuthGuard: Checking Supabase connection...");
        // Periksa koneksi ke Supabase dengan menjalankan query sederhana
        const { error } = await supabase.from('settings').select('id').limit(1);
        
        if (error) {
          console.error("AuthGuard: Supabase connection error:", error);
          setSupabaseStatus('error');
          toast.error("Koneksi Supabase gagal", {
            description: "Terjadi masalah saat terhubung ke database"
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
    
    checkSupabaseConnection();
    
    // Wait for authentication to complete
    if (!loading) {
      console.log("AuthGuard: Auth state loaded:", { 
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
        
        console.log("AuthGuard: Admin authentication check:", {
          userExists: !!user,
          isAdmin: isAdmin(),
          manualAdminSession: manualAdminSession,
          finalAdminStatus: adminStatus
        });
        
        if (!adminStatus) {
          console.log("AuthGuard: Failed admin authentication, redirecting to login");
          
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
          console.log("AuthGuard: Admin authentication successful, rendering content");
          // Re-validate manual admin session if needed
          if (!user && manualAdminSession === 'true') {
            console.log("AuthGuard: Using manual admin session without user object");
            
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
              className="bg-cyberpunk hover:bg-cyberpunk-light"
            >
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

  // Perform final authentication check
  const manualSession = localStorage.getItem('manual_admin_session');
  const isAuthenticated = isAdmin() || manualSession === 'true';
  
  if (!isAuthenticated) {
    console.log("AuthGuard: Final check: Not authenticated as admin, redirecting to login page");
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  console.log("AuthGuard: User is authenticated as admin, rendering admin content", {path: location.pathname});
  return <>{children}</>;
};

export default AuthGuard;
