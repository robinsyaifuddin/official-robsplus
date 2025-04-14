
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Lock, Mail, User, Shield, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Json } from '@/integrations/supabase/types';

const TOKEN_KEY = "setup_admin_token";

// Define the token settings interface
interface TokenSettings {
  token: string;
  used: boolean;
  admin_id?: string;
  created_at?: string;
}

// Helper function to safely validate token settings
const isValidTokenSettings = (value: Json): value is TokenSettings => {
  return typeof value === 'object' && 
         value !== null && 
         !Array.isArray(value) &&
         'token' in value && 
         'used' in value;
};

const SetupAdmin = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const [tokenChecking, setTokenChecking] = useState(true);
  
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setTokenChecking(false);
        return;
      }
      
      try {
        const { data: settings, error: settingsError } = await supabase
          .from('settings')
          .select('*')
          .eq('id', TOKEN_KEY)
          .single();
        
        if (settingsError) {
          if (settingsError.code === 'PGRST116') {
            setTokenValid(true);
            setTokenChecking(false);
            return;
          }
          throw settingsError;
        }
        
        // Safely validate and access token settings
        if (settings && settings.value && isValidTokenSettings(settings.value)) {
          if (settings.value.token === token && !settings.value.used) {
            setTokenValid(true);
          } else {
            toast.error("Token tidak valid atau sudah digunakan");
          }
        } else {
          toast.error("Format token tidak valid");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        toast.error("Terjadi kesalahan saat memverifikasi token");
      } finally {
        setTokenChecking(false);
      }
    };
    
    verifyToken();
  }, [token]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token || !tokenValid) {
      toast.error("Token tidak valid");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Kata sandi dan konfirmasi tidak cocok");
      return;
    }
    
    if (password.length < 6) {
      toast.error("Kata sandi harus minimal 6 karakter");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data: admin, error: adminError } = await supabase
        .from('admins')
        .insert([{ email, password }])
        .select()
        .single();
      
      if (adminError) {
        throw adminError;
      }
      
      // Update token as used, with proper type casting
      const tokenSettings: TokenSettings = {
        token, 
        used: true, 
        admin_id: admin.id, 
        created_at: new Date().toISOString()
      };
      
      const { error: tokenError } = await supabase
        .from('settings')
        .upsert([
          { 
            id: TOKEN_KEY, 
            value: tokenSettings as unknown as Json
          }
        ]);
      
      if (tokenError) {
        throw tokenError;
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            is_admin: true,
            name
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      toast.success("Admin berhasil dibuat", {
        description: "Silahkan login menggunakan email dan kata sandi yang telah dibuat"
      });
      
      navigate('/admin');
      
    } catch (error: any) {
      console.error("Error creating admin:", error);
      toast.error("Gagal membuat admin", {
        description: error.message || "Terjadi kesalahan saat membuat admin"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (tokenChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark">
        <Card className="w-full max-w-md border-cyberpunk/30 bg-dark-secondary">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-white">Memverifikasi Token</CardTitle>
            <CardDescription className="text-gray-400">
              Mohon tunggu sementara kami memverifikasi token...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }
  
  if (!token || !tokenValid) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark">
        <Card className="w-full max-w-md border-cyberpunk/30 bg-dark-secondary">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <CardTitle className="text-xl text-white">Token Tidak Valid</CardTitle>
            <CardDescription className="text-gray-400">
              Token yang Anda gunakan tidak valid atau sudah digunakan sebelumnya.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button 
              className="w-full bg-cyberpunk hover:bg-cyberpunk-light"
              onClick={() => navigate('/')}
            >
              Kembali ke Beranda
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-dark p-4">
      <Card className="w-full max-w-md border-cyberpunk/30 bg-dark-secondary">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyberpunk">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Setup Admin</CardTitle>
          <CardDescription className="text-gray-400">
            Buat akun admin untuk mengelola website ROBsPlus
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-300">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  className="pl-10 bg-dark border-gray-700"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@robsplus.com"
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
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                Konfirmasi Kata Sandi
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-dark border-gray-700"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-cyberpunk hover:bg-cyberpunk-light"
              disabled={isLoading}
            >
              {isLoading ? "Membuat Admin..." : "Buat Admin"}
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

export default SetupAdmin;
