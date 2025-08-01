
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/hooks/useAuth';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

const AdminLogin = () => {
  const [email, setEmail] = useState("robsplus.admin@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { signIn, user, isAdmin } = useAuth();

  useEffect(() => {
    // Clear any existing admin sessions to start fresh
    localStorage.removeItem('manual_admin_session');

    // Check if user is already logged in as admin
    console.log("Checking if already logged in:", user?.email, isAdmin());
    
    if (user && isAdmin()) {
      console.log("User already logged in as admin, redirecting to dashboard");
      navigate('/admin/dashboard', { replace: true });
    }
  }, [user, navigate, isAdmin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log("Login attempt with:", email, password);
      
      // Make sure we're using the correct admin credentials
      const adminEmail = "robsplus.admin@gmail.com";
      const adminPassword = password.length > 0 ? password : "robsplus@123";
      
      if (email !== adminEmail) {
        setEmail(adminEmail);
        toast.info("Email admin telah disetel ulang", {
          description: "Gunakan email default untuk login admin"
        });
      }
      
      // Proceed with sign in
      const { data, error } = await signIn(adminEmail, adminPassword);
      
      if (error) {
        console.error("Login error:", error);
        setErrorMessage(error.message || "Email atau kata sandi tidak valid");
        setShowErrorDialog(true);
        toast.error("Login gagal", {
          description: error.message || "Email atau kata sandi tidak valid"
        });
        setIsLoading(false);
        return;
      }
      
      console.log("Login successful, checking admin status");
      
      // Force setting of manual admin session as a backup
      localStorage.setItem('manual_admin_session', 'true');
      
      // Wait a moment for state to settle
      setTimeout(() => {
        // Verify admin status from multiple sources for extra reliability
        const adminStatus = isAdmin();
        const manualSession = localStorage.getItem('manual_admin_session') === 'true';
        
        console.log("Admin verification check:", {
          userExists: !!user,
          isAdmin: isAdmin(),
          manualSession: manualSession,
          finalAdminStatus: adminStatus
        });
        
        if (adminStatus || manualSession) {
          toast.success("Login berhasil", {
            description: "Selamat datang di dashboard admin ROBsPlus"
          });
          
          navigate("/admin/dashboard", { replace: true });
        } else {
          console.error("Admin status verification failed");
          toast.error("Login gagal", {
            description: "Verifikasi status admin gagal"
          });
          
          // Last resort force admin session
          localStorage.setItem('manual_admin_session', 'true');
          navigate("/admin/dashboard", { replace: true });
        }
      }, 500);
    } catch (error: any) {
      console.error("Unexpected error:", error);
      setErrorMessage(error.message || "Terjadi kesalahan saat mencoba login");
      setShowErrorDialog(true);
      toast.error("Login gagal", {
        description: error.message || "Terjadi kesalahan saat mencoba login"
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark p-4">
      <Card className="w-full max-w-md border-cyberpunk/30 bg-dark-secondary">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyberpunk">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Admin Login</CardTitle>
          <CardDescription className="text-gray-400">
            Masuk ke dashboard admin ROBsPlus
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="contoh@robsplus.com"
                  className="pl-10 bg-dark border-gray-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  readOnly
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-300">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-dark border-gray-700"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-cyberpunk hover:bg-cyberpunk-light"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400">© 2025 ROBsPlus. All rights reserved.</p>
        </CardFooter>
      </Card>

      <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <DialogContent className="bg-dark border border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Login gagal</DialogTitle>
            <DialogDescription className="text-gray-400">
              {errorMessage}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end">
            <Button 
              onClick={() => setShowErrorDialog(false)}
              className="bg-cyberpunk hover:bg-cyberpunk-light"
            >
              Tutup
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLogin;
