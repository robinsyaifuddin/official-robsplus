
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Hard-coded credentials (will be replaced with Supabase auth)
    if (email === "robsplus.admin@gmail.com" && password === "robsplus@123") {
      // Set admin auth in localStorage (temporary - will be replaced with Supabase auth)
      localStorage.setItem("robsplus_admin_auth", JSON.stringify({
        isAdmin: true,
        email: email,
        loginTime: new Date().toISOString(),
      }));
      
      setTimeout(() => {
        toast.success("Login berhasil", {
          description: "Selamat datang di dashboard admin ROBsPlus"
        });
        navigate("/admin/dashboard");
        setIsLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        toast.error("Login gagal", {
          description: "Email atau kata sandi tidak valid"
        });
        setIsLoading(false);
      }, 1000);
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
                  required
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
    </div>
  );
};

export default AdminLogin;
