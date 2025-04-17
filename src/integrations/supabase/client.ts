
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://aslwtobapjbdmzjfrkjo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzbHd0b2JhcGpiZG16amZya2pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NDc4MzQsImV4cCI6MjA2MDEyMzgzNH0.YL2eXVEv1MRfW3h_EBMcRqAmqHT0IZjHsdEpeEF9XyU";

// Type assertion for the news table
type NewsItem = {
  id: string;
  title: string;
  content: string;
  image_url: string;
  contact_info: string | null;
  is_featured: boolean | null;
  slug: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'robsplus_admin_auth'
  },
  db: {
    schema: 'public',
  }
});

// Export the NewsItem type for use in components
export type { NewsItem };
