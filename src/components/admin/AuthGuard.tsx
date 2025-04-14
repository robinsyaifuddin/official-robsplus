
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
        
        if (!user || !adminStatus) {
          console.log("Not authenticated as admin, redirecting to login page");
          toast.error("Autentikasi diperlukan", {
            description: "Silakan login sebagai admin untuk mengakses halaman ini"
          });
          navigate("/admin", { replace: true });
        } else {
          console.log("User is authenticated as admin");
        }
        
        setIsChecking(false);
      }, 1000);
      
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

  // Final check to verify if the user is admin
  if (!user || !isAdmin()) {
    console.log("Final check: Not authenticated as admin, redirecting to login page");
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  console.log("User is authenticated as admin, rendering children");
  return <>{children}</>;
};

export default AuthGuard;
