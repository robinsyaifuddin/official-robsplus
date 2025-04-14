
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
      console.log("Auth state loaded, checking admin status:", { 
        user: user, 
        isAdmin: isAdmin() 
      });
      
      // Set a small delay to ensure auth state is fully processed
      const timer = setTimeout(() => {
        if (!user || !isAdmin()) {
          console.log("Not authenticated as admin, redirecting to login");
          toast.error("Autentikasi diperlukan", {
            description: "Silakan login sebagai admin untuk mengakses halaman ini"
          });
          navigate("/admin", { replace: true });
        }
        setIsChecking(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [loading, user, isAdmin, navigate]);

  if (isChecking || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-cyberpunk" />
          <p className="text-white">Memeriksa autentikasi...</p>
        </div>
      </div>
    );
  }

  // Verify if the user is logged in and is an admin
  if (!user || !isAdmin()) {
    console.log("Not authenticated or not admin, redirecting to login");
    // Redirect to login if not authenticated
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  console.log("User authenticated and is admin, rendering children");
  return <>{children}</>;
};

export default AuthGuard;
