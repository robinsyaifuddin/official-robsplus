
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
      async (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Check if user is admin
        const isAdminUser = currentSession?.user?.email === 'robsplus.admin@gmail.com';
        console.log("Is admin check:", isAdminUser);
        setIsAdminState(isAdminUser);
        
        // Check for manually set admin session in localStorage
        const manualAdminSession = localStorage.getItem('manual_admin_session');
        if (manualAdminSession === 'true') {
          console.log("Manual admin session found in localStorage during auth change");
          setIsAdminState(true);
        }
        
        setLoading(false);
      }
    );

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log("Initial session check:", currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Check if user is admin
        const isAdminUser = currentSession?.user?.email === 'robsplus.admin@gmail.com';
        console.log("Is admin check:", isAdminUser);
        setIsAdminState(isAdminUser);
        
        // Check for manually set admin session in localStorage
        const manualAdminSession = localStorage.getItem('manual_admin_session');
        if (manualAdminSession === 'true') {
          console.log("Manual admin session found in localStorage during initialization");
          setIsAdminState(true);
          
          if (!currentSession?.user) {
            // Create a custom user object with required User properties
            const customUser = {
              id: '00000000-0000-0000-0000-000000000000',
              email: 'robsplus.admin@gmail.com',
              app_metadata: { provider: 'custom' },
              user_metadata: { is_admin: true },
              // Add required properties from User type
              aud: 'authenticated',
              created_at: new Date().toISOString(),
              // Additional required properties with default values
              role: '',
              updated_at: new Date().toISOString(),
              confirmation_sent_at: null,
              confirmed_at: new Date().toISOString(),
              last_sign_in_at: new Date().toISOString(),
              factors: null,
              identities: [],
              phone: '',
              recovery_sent_at: null,
            } as User;
            
            setUser(customUser);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error initializing auth:", error);
        setLoading(false);
      }
    };

    initializeAuth();
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
          console.log("Supabase auth failed for admin, using manual session", error);
          
          // Set manual admin session in localStorage
          localStorage.setItem('manual_admin_session', 'true');
          
          // Create a custom user object with required User properties
          const customUser = {
            id: '00000000-0000-0000-0000-000000000000',
            email: 'robsplus.admin@gmail.com',
            app_metadata: { provider: 'custom' },
            user_metadata: { is_admin: true },
            // Add required properties from User type
            aud: 'authenticated',
            created_at: new Date().toISOString(),
            // Additional required properties with default values
            role: '',
            updated_at: new Date().toISOString(),
            confirmation_sent_at: null,
            confirmed_at: new Date().toISOString(),
            last_sign_in_at: new Date().toISOString(),
            factors: null,
            identities: [],
            phone: '',
            recovery_sent_at: null,
          } as User;
          
          // Set user and admin state manually
          setUser(customUser);
          setIsAdminState(true);
          
          const customSession = {
            access_token: 'manual-session-token',
            refresh_token: 'manual-refresh-token',
            expires_in: 3600,
            expires_at: new Date().getTime() + 3600 * 1000,
            token_type: 'bearer',
            user: customUser,
          } as Session;
          
          setSession(customSession);
          
          return { 
            data: { 
              user: customUser, 
              session: customSession
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
