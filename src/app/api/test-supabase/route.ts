import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Test connection
    const { data, error } = await supabase.from('waitlist').select('*').limit(5);
    
    // Get environment variables for debugging
    const envVars = {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      serviceKeyLength: process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0,
    };
    
    // Test table existence
    const { error: tableError } = await supabase.from('waitlist').select('count', { count: 'exact', head: true });
    
    return NextResponse.json({
      success: !error,
      connectionStatus: error ? 'error' : 'connected',
      envVars,
      data: data || [],
      error: error ? error.message : null,
      tableExists: !tableError,
      tableError: tableError ? tableError.message : null,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message,
      connectionStatus: 'exception',
    }, { status: 500 });
  }
} 