import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('CRITICAL: Missing Supabase environment variables. Verify VITE_PUBLIC_SUPABASE_URL and VITE_PUBLIC_SUPABASE_ANON_KEY are set.');
} else {
  console.info('✅ Supabase initialized successfully:', supabaseUrl);
}

// Fallback to empty strings to prevent createClient from throwing if variables are undefined
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
