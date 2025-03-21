import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  // Get environment variables directly
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  // Create the client directly
  const supabase = createClient(supabaseUrl || '', supabaseServiceKey || '');
  const anonClient = createClient(supabaseUrl || '', supabaseAnonKey || '');
  
  // Generate a unique test email
  const testEmail = `test-${Date.now()}@example.com`;
  
  // Test data to insert
  const testData = {
    name: 'Test User',
    email: testEmail,
    features: 'Test features'
  };
  
  // Results object
  const results: {
    env: {
      supabaseUrl: string | undefined;
      hasAnonKey: boolean;
      anonKeyLength: number;
      hasServiceKey: boolean;
      serviceKeyLength: number;
    };
    serviceRoleTest: {
      success: boolean;
      data?: any;
      error: string | null;
    } | null;
    anonRoleTest: {
      success: boolean;
      data?: any;
      error: string | null;
    } | null;
    tables?: {
      success: boolean;
      data?: any;
      error: string | null;
    };
  } = {
    env: {
      supabaseUrl,
      hasAnonKey: !!supabaseAnonKey,
      anonKeyLength: supabaseAnonKey?.length || 0,
      hasServiceKey: !!supabaseServiceKey,
      serviceKeyLength: supabaseServiceKey?.length || 0
    },
    serviceRoleTest: null,
    anonRoleTest: null
  };
  
  // Try inserting with service role
  try {
    const { data: serviceData, error: serviceError } = await supabase
      .from('waiting_list')
      .insert([testData])
      .select();
    
    results.serviceRoleTest = {
      success: !serviceError,
      data: serviceData || undefined,
      error: serviceError ? serviceError.message : null
    };
  } catch (err) {
    results.serviceRoleTest = {
      success: false,
      error: err instanceof Error ? err.message : String(err)
    };
  }
  
  // Try inserting with anon key (should work if RLS is configured correctly)
  try {
    const { data: anonData, error: anonError } = await anonClient
      .from('waiting_list')
      .insert([{
        name: 'Anon Test User',
        email: `anon-${Date.now()}@example.com`,
        features: 'Test from anon key'
      }])
      .select();
    
    results.anonRoleTest = {
      success: !anonError,
      data: anonData || undefined,
      error: anonError ? anonError.message : null
    };
  } catch (err) {
    results.anonRoleTest = {
      success: false,
      error: err instanceof Error ? err.message : String(err)
    };
  }
  
  // Try listing tables to see if we can connect at all
  try {
    const { data: tables, error: tablesError } = await supabase
      .from('pg_catalog.pg_tables')
      .select('schemaname, tablename')
      .eq('schemaname', 'public');
    
    results.tables = {
      success: !tablesError,
      data: tables || undefined,
      error: tablesError ? tablesError.message : null
    };
  } catch (err) {
    results.tables = {
      success: false,
      error: err instanceof Error ? err.message : String(err)
    };
  }
  
  return NextResponse.json(results);
} 