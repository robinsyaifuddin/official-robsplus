
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://aslwtobapjbdmzjfrkjo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzbHd0b2JhcGpiZG16amZya2pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NDc4MzQsImV4cCI6MjA2MDEyMzgzNH0.YL2eXVEv1MRfW3h_EBMcRqAmqHT0IZjHsdEpeEF9XyU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'robsplus_admin_auth'
  }
});
