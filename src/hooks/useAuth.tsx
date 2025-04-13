
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { toast } from 'sonner';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsAdmin(currentSession?.user?.email === 'robsplus.admin@gmail.com');
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsAdmin(currentSession?.user?.email === 'robsplus.admin@gmail.com');
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log("Attempting to sign in with:", email);
    
    if (email === 'robsplus.admin@gmail.com') {
      try {
        // Coba login dengan tabel admin terlebih dahulu
        const { data, error } = await supabase
          .from('admins')
          .select('*')
          .eq('email', email)
          .single();
        
        if (error) {
          console.error('Error checking admin:', error.message);
          throw new Error('Invalid login credentials');
        }
        
        if (!data) {
          throw new Error('Admin not found');
        }
        
        // Untuk implementasi sederhana, kita akan memverifikasi password secara langsung
        // Catatan: Dalam produksi, Anda harus menggunakan bcrypt.compare atau metode hash yang aman
        if (password === 'robsplus@123') {
          // Jika password benar (dalam kasus ini hardcoded), login menggunakan Supabase
          const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (authError) {
            // Jika gagal login dengan Supabase auth, maka kita akan membuat sesi manual
            console.log("Supabase auth failed, creating custom session");
            
            // Buat session manual
            const customUser = {
              id: data.id,
              email: data.email,
              role: 'admin',
              app_metadata: { provider: 'custom' },
              user_metadata: { is_admin: true }
            };
            
            // Set user dan session manual
            setUser(customUser as any);
            setIsAdmin(true);
            
            return { 
              data: { 
                user: customUser, 
                session: { user: customUser } 
              }, 
              error: null 
            };
          }
          
          console.log("Sign in successful:", authData);
          return { data: authData, error: null };
        } else {
          throw new Error('Invalid password');
        }
      } catch (error: any) {
        console.error('Error signing in:', error.message);
        return { data: null, error };
      }
    } else {
      // For non-admin users, use regular Supabase auth
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        console.log("Sign in successful:", data);
        return { data, error: null };
      } catch (error: any) {
        console.error('Error signing in:', error.message);
        return { data: null, error };
      }
    }
  };

  const signOut = async () => {
    try {
      // Jika user adalah admin dengan sesi manual
      if (isAdmin && user && !(session?.access_token)) {
        // Hapus sesi manual
        setUser(null);
        setIsAdmin(false);
        setSession(null);
        return { error: null };
      }
      
      // Jika menggunakan sesi Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error('Error signing out:', error.message);
      return { error };
    }
  };

  return {
    user,
    session,
    loading,
    signIn,
    signOut,
    isAdmin: () => isAdmin,
  };
};
