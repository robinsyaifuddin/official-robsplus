
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Wait for authentication to complete
    if (!loading) {
      // Set a small delay to ensure auth state is fully processed
      const timer = setTimeout(() => {
        setIsChecking(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [loading]);

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

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
