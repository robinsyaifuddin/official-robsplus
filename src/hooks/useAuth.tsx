
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { toast } from 'sonner';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdminState, setIsAdminState] = useState(false);

  useEffect(() => {
    console.log("Initializing auth state...");
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Check if user is admin
        const isAdminUser = currentSession?.user?.email === 'robsplus.admin@gmail.com';
        console.log("Is admin check:", isAdminUser);
        setIsAdminState(isAdminUser);
        
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession?.user?.email);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // Check if user is admin
      const isAdminUser = currentSession?.user?.email === 'robsplus.admin@gmail.com';
      console.log("Is admin check:", isAdminUser);
      setIsAdminState(isAdminUser);
      
      setLoading(false);
    });

    // Check for manually set admin session in localStorage
    const manualAdminSession = localStorage.getItem('manual_admin_session');
    if (manualAdminSession === 'true') {
      console.log("Manual admin session found in localStorage");
      setIsAdminState(true);
      if (!user) {
        setUser({
          id: '00000000-0000-0000-0000-000000000000',
          email: 'robsplus.admin@gmail.com',
          app_metadata: { provider: 'custom' },
          user_metadata: { is_admin: true }
        } as User);
      }
    }

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log("Attempting to sign in with:", email);
    
    // Handle special case for admin login
    if (email === 'robsplus.admin@gmail.com' && password === 'robsplus@123') {
      try {
        console.log("Admin login credentials match, attempting Supabase auth");
        
        // First try regular Supabase auth
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          console.log("Supabase auth failed for admin, using manual session");
          
          // Set manual admin session in localStorage
          localStorage.setItem('manual_admin_session', 'true');
          
          // Create a manual user object
          const customUser = {
            id: '00000000-0000-0000-0000-000000000000',
            email: 'robsplus.admin@gmail.com',
            app_metadata: { provider: 'custom' },
            user_metadata: { is_admin: true }
          };
          
          // Set user and admin state manually
          setUser(customUser as User);
          setIsAdminState(true);
          
          return { 
            data: { 
              user: customUser, 
              session: { user: customUser } 
            }, 
            error: null 
          };
        }
        
        console.log("Admin sign in successful with Supabase auth:", data);
        setIsAdminState(true);
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
        
        // Check if user is admin
        const isAdminUser = data.user?.email === 'robsplus.admin@gmail.com';
        setIsAdminState(isAdminUser);
        
        return { data, error: null };
      } catch (error: any) {
        console.error('Error signing in:', error.message);
        return { data: null, error };
      }
    }
  };

  const signOut = async () => {
    try {
      // Clear manual admin session if it exists
      localStorage.removeItem('manual_admin_session');
      
      // If using Supabase session
      if (session?.access_token) {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      }
      
      // Reset states
      setUser(null);
      setIsAdminState(false);
      setSession(null);
      
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
    isAdmin: () => isAdminState,
  };
};
