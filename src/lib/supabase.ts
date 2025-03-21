import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  if (typeof window === 'undefined') {
    console.error('Supabase credentials are missing!');
  }
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export type WaitlistEntry = {
  id?: string;
  firstName: string;
  email: string;
  comments?: string;
  createdAt?: string;
  position: number;
};

/**
 * Saves a waitlist entry to Supabase
 */
export async function saveWaitlistEntry(entry: Omit<WaitlistEntry, 'id'>): Promise<{ success: boolean; error?: string; data?: any }> {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .insert([entry])
      .select();

    if (error) {
      console.error('Error saving to Supabase:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Exception saving to Supabase:', err);
    return { success: false, error: 'Failed to save waitlist entry' };
  }
}

/**
 * Gets all waitlist entries from Supabase
 */
export async function getWaitlistEntries(): Promise<{ success: boolean; error?: string; data?: WaitlistEntry[] }> {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .select('*')
      .order('position', { ascending: true });

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
      .from('waitlist')
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