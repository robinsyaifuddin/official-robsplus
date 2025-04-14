import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Shield, Copy, CheckCircle2 } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const TOKEN_KEY = "setup_admin_token";

interface TokenSettings {
  token: string;
  used: boolean;
  admin_id?: string;
  created_at: string;
}

const GenerateSetupToken = () => {
  const { user, isAdmin } = useAuth();
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  if (!user || !isAdmin()) {
    return <Navigate to="/admin" replace />;
  }
  
  const generateToken = async () => {
    setIsLoading(true);
    
    try {
      const randomBytes = new Uint8Array(32);
      crypto.getRandomValues(randomBytes);
      const newToken = Array.from(randomBytes)
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
      
      const tokenSettings: TokenSettings = {
        token: newToken,
        used: false,
        created_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('settings')
        .upsert([
          { 
            id: TOKEN_KEY, 
            value: tokenSettings
          }
        ]);
      
      if (error) {
        throw error;
      }
      
      setToken(newToken);
      toast.success("Token berhasil dibuat");
      
    } catch (error: any) {
      console.error("Error generating token:", error);
      toast.error("Gagal membuat token", {
        description: error.message || "Terjadi kesalahan saat membuat token"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const copyToClipboard = async () => {
    const setupUrl = `${window.location.origin}/setup-admin?token=${token}`;
    
    try {
      await navigator.clipboard.writeText(setupUrl);
      setCopied(true);
      toast.success("URL berhasil disalin");
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error("Gagal menyalin URL");
      console.error("Failed to copy:", error);
    }
  };
  
  return (
    <div className="container mx-auto max-w-4xl p-6">
      <Card className="border-gray-700 bg-dark-secondary">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-cyberpunk" />
            <div>
              <CardTitle className="text-xl text-white">Generate Setup Admin URL</CardTitle>
              <CardDescription className="text-gray-400">
                Buat URL sekali pakai untuk mendaftarkan admin baru
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-gray-800 p-4">
            <p className="text-sm text-gray-300 mb-2">
              URL sekali pakai ini dapat digunakan untuk membuat akun admin baru. 
              URL ini hanya dapat digunakan satu kali dan akan kedaluwarsa setelah digunakan.
            </p>
            <p className="text-sm text-gray-300 font-bold">
              Pastikan untuk menyimpan URL ini dengan aman dan hanya membagikannya kepada orang yang tepercaya.
            </p>
          </div>
          
          {token ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input 
                  value={`${window.location.origin}/setup-admin?token=${token}`}
                  readOnly
                  className="bg-dark border-gray-700 text-white font-mono"
                />
                <Button
                  onClick={copyToClipboard}
                  className="bg-gray-700 hover:bg-gray-600 text-white"
                >
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Button
                onClick={generateToken}
                className="w-full bg-cyberpunk hover:bg-cyberpunk-light"
              >
                Generate Token Baru
              </Button>
            </div>
          ) : (
            <Button
              onClick={generateToken}
              className="w-full bg-cyberpunk hover:bg-cyberpunk-light"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Setup URL"}
            </Button>
          )}
        </CardContent>
        <CardFooter className="border-t border-gray-700 pt-4">
          <p className="text-xs text-gray-400">
            Token yang dihasilkan akan disimpan di database dan dapat digunakan untuk mendaftarkan admin baru 
            dengan akses penuh ke website ROBsPlus.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GenerateSetupToken;
