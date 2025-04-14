
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
    
    // Handle special case for admin login separately
    if (email === 'robsplus.admin@gmail.com' && password === 'robsplus@123') {
      try {
        // First try regular Supabase auth
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          console.log("Supabase auth failed for admin, using custom session");
          
          // If Supabase auth fails, create a manual admin session
          const customUser = {
            id: '00000000-0000-0000-0000-000000000000',
            email: 'robsplus.admin@gmail.com',
            role: 'admin',
            app_metadata: { provider: 'custom' },
            user_metadata: { is_admin: true }
          };
          
          // Set user and session manually
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
        
        console.log("Admin sign in successful with Supabase auth:", data);
        return { data, error: null };
      } catch (error: any) {
        console.error('Error signing in admin:', error.message);
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
