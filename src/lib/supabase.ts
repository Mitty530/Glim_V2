import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl) {
  if (typeof window === 'undefined') {
    console.error('Supabase URL is missing!');
  }
}

if (!supabaseAnonKey) {
  console.error('Supabase anon key is missing!');
}

if (!supabaseServiceKey && typeof window === 'undefined') {
  console.error('Supabase service role key is missing!');
}

// Create a Supabase client for the browser (public operations)
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Create a Supabase admin client with service role key for server operations
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Define waitlist entry type based on table structure
export type WaitlistEntry = {
  id?: number;
  name: string;
  email: string;
  features?: string;
  created_at?: string;
};

/**
 * Saves a waitlist entry to Supabase
 */
export async function saveWaitlistEntry(entry: Omit<WaitlistEntry, 'id'>): Promise<{ success: boolean; error?: string; data?: any }> {
  try {
    console.log('Saving entry to Supabase:', entry);
    console.log('Using Supabase URL:', supabaseUrl);
    console.log('Service key available:', !!supabaseServiceKey);
    
    const { data, error } = await supabase
      .from('waiting_list')
      .insert([entry])
      .select();

    if (error) {
      console.error('Error saving to Supabase:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Exception saving to Supabase:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Failed to save waitlist entry' };
  }
}

/**
 * Gets all waitlist entries from Supabase
 */
export async function getWaitlistEntries(): Promise<{ success: boolean; error?: string; data?: WaitlistEntry[] }> {
  try {
    const { data, error } = await supabase
      .from('waiting_list')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching from Supabase:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (err) {
    console.error('Exception fetching from Supabase:', err);
    return { success: false, error: 'Failed to fetch waitlist entries' };
  }
}

/**
 * Gets the current waitlist count from Supabase
 */
export async function getWaitlistCount(): Promise<{ success: boolean; error?: string; count: number }> {
  try {
    const { count, error } = await supabase
      .from('waiting_list')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error counting waitlist entries:', error);
      return { success: false, error: error.message, count: 0 };
    }

    return { success: true, count: count || 0 };
  } catch (err) {
    console.error('Exception counting waitlist entries:', err);
    return { success: false, error: 'Failed to count waitlist entries', count: 0 };
  }
} 