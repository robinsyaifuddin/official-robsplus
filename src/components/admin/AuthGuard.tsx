
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Wait for authentication to complete
    if (!loading) {
      console.log("Auth state loaded in AuthGuard:", { 
        user: user?.email, 
        isAdmin: isAdmin()
      });
      
      // Set a delay to ensure auth state is fully processed
      const timer = setTimeout(() => {
        const adminStatus = isAdmin();
        console.log("Admin status check result:", adminStatus);
        
        // Force reload localStorage to ensure it's up to date
        const manualAdminSession = localStorage.getItem('manual_admin_session');
        console.log("Manual admin session in AuthGuard:", manualAdminSession);
        
        if (!user && manualAdminSession !== 'true') {
          console.log("No user found and no manual admin session, redirecting");
          toast.error("Autentikasi diperlukan", {
            description: "Silakan login sebagai admin untuk mengakses halaman ini"
          });
          navigate("/admin", { replace: true });
        } else if (!adminStatus && manualAdminSession !== 'true') {
          console.log("User is not admin and no manual admin session, redirecting");
          toast.error("Akses ditolak", {
            description: "Anda tidak memiliki hak akses admin"
          });
          navigate("/admin", { replace: true });
        } else {
          console.log("User is authenticated as admin or has manual admin session");
        }
        
        setIsChecking(false);
      }, 1500); // Increase timeout to ensure state is fully updated
      
      return () => clearTimeout(timer);
    }
  }, [loading, user, isAdmin, navigate]);

  if (loading || isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-cyberpunk" />
          <p className="text-white">Memeriksa autentikasi...</p>
        </div>
      </div>
    );
  }

  // Final check - also check localStorage directly as a fallback
  const manualSession = localStorage.getItem('manual_admin_session');
  if ((!user || !isAdmin()) && manualSession !== 'true') {
    console.log("Final check: Not authenticated as admin, redirecting to login page");
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  console.log("User is authenticated as admin, rendering children");
  return <>{children}</>;
};

export default AuthGuard;
