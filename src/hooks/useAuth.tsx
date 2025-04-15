
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { toast } from 'sonner';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdminState, setIsAdminState] = useState(false);

  useEffect(() => {
    console.log("useAuth: Initializing auth state...");
    
    // Check for manually set admin session in localStorage before setting up listeners
    const manualAdminSession = localStorage.getItem('manual_admin_session');
    if (manualAdminSession === 'true') {
      console.log("useAuth: Found manual admin session during init");
      setIsAdminState(true);
      
      if (!user) {
        // Create a custom admin user when using manual session
        const createManualAdminUser = () => {
          const customUser = {
            id: '00000000-0000-0000-0000-000000000000',
            email: 'robsplus.admin@gmail.com',
            app_metadata: { provider: 'custom' },
            user_metadata: { is_admin: true },
            // Add required properties from User type
            aud: 'authenticated',
            created_at: new Date().toISOString(),
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
        };
        
        createManualAdminUser();
      }
    }
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("useAuth: Auth state changed:", event);
        
        // Update session and user from currentSession
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Admin check: email-based
        const isAdminUser = currentSession?.user?.email === 'robsplus.admin@gmail.com';
        console.log("useAuth: Is admin check from email:", isAdminUser);
        
        if (isAdminUser) {
          setIsAdminState(true);
        }
        
        // Also check for manually set admin status
        const manualAdmin = localStorage.getItem('manual_admin_session') === 'true';
        if (manualAdmin) {
          console.log("useAuth: Manual admin session found during auth change");
          setIsAdminState(true);
        }
        
        setLoading(false);
      }
    );

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log("useAuth: Initial session check:", currentSession?.user?.email);
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Admin check: email-based
        const isAdminUser = currentSession?.user?.email === 'robsplus.admin@gmail.com';
        console.log("useAuth: Is admin check from email:", isAdminUser);
        
        if (isAdminUser) {
          setIsAdminState(true);
        }
        
        // Also check for manually set admin status again
        const manualAdmin = localStorage.getItem('manual_admin_session') === 'true';
        if (manualAdmin && !currentSession?.user) {
          console.log("useAuth: Manual admin session found but no session, creating custom user");
          
          // Create a custom user object with required User properties
          const customUser = {
            id: '00000000-0000-0000-0000-000000000000',
            email: 'robsplus.admin@gmail.com',
            app_metadata: { provider: 'custom' },
            user_metadata: { is_admin: true },
            // Add required properties from User type
            aud: 'authenticated',
            created_at: new Date().toISOString(),
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
          setIsAdminState(true);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("useAuth: Error initializing auth:", error);
        setLoading(false);
      }
    };

    initializeAuth();
    return () => subscription.unsubscribe();
  }, []);

  const isAdmin = useCallback(() => {
    return isAdminState || localStorage.getItem('manual_admin_session') === 'true';
  }, [isAdminState]);

  const signIn = async (email: string, password: string) => {
    console.log("useAuth: Attempting to sign in with:", email);
    
    // Handle special case for admin login
    if (email === 'robsplus.admin@gmail.com' && password === 'robsplus@123') {
      try {
        console.log("useAuth: Admin login credentials match, attempting Supabase auth");
        
        // First try regular Supabase auth
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          console.log("useAuth: Supabase auth failed for admin, using manual session", error);
          
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
        
        console.log("useAuth: Admin sign in successful with Supabase auth:", data);
        setIsAdminState(true);
        return { data, error: null };
      } catch (error: any) {
        console.error('useAuth: Error signing in admin:', error.message);
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
        console.log("useAuth: Sign in successful:", data);
        
        // Check if user is admin
        const isAdminUser = data.user?.email === 'robsplus.admin@gmail.com';
        setIsAdminState(isAdminUser);
        
        return { data, error: null };
      } catch (error: any) {
        console.error('useAuth: Error signing in:', error.message);
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
      
      console.log("useAuth: User signed out successfully");
      return { error: null };
    } catch (error: any) {
      console.error('useAuth: Error signing out:', error.message);
      return { error };
    }
  };

  return {
    user,
    session,
    loading,
    signIn,
    signOut,
    isAdmin,
  };
};
