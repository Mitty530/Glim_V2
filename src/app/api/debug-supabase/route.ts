import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    // Get environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    
    // Create clients
    const anonClient = createClient(supabaseUrl, supabaseAnonKey);
    const serviceClient = createClient(supabaseUrl, supabaseServiceKey);
    
    // Check connection and list tables (service role)
    const { data: tableData, error: tableError } = await serviceClient
      .from('pg_tables')
      .select('*')
      .eq('schemaname', 'public');
    
    // Check if waitlist table exists
    const tableExists = tableData && tableData.some(table => table.tablename === 'waitlist');
    
    // Try to count waitlist entries
    const { count: serviceCount, error: serviceCountError } = await serviceClient
      .from('waitlist')
      .select('*', { count: 'exact', head: true });
    
    // Try to count with anon key
    const { count: anonCount, error: anonCountError } = await anonClient
      .from('waitlist')
      .select('*', { count: 'exact', head: true });
    
    // Try to create a test table as a fallback test
    const testTableResult = await serviceClient.rpc('create_test_table', {}).select();
    
    // Try a direct SQL query
    const { data: directSqlData, error: directSqlError } = await serviceClient.rpc('execute_sql', {
      sql_query: "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'waitlist')"
    });
    
    // Try to insert a test record with service role
    const testInsertResult = tableExists ? await serviceClient
      .from('waitlist')
      .insert([{
        firstName: 'Test User',
        email: `test${Date.now()}@example.com`,
        comments: 'Test comment',
        position: 9999
      }]) : { error: { message: 'Table does not exist, skipping insert test' } };
    
    return NextResponse.json({
      environment: {
        supabaseUrl,
        hasAnonKey: !!supabaseAnonKey,
        hasServiceKey: !!supabaseServiceKey,
        anonKeyLength: supabaseAnonKey.length,
        serviceKeyLength: supabaseServiceKey.length
      },
      tables: {
        data: tableData,
        error: tableError,
        waitlistTableExists: tableExists
      },
      counts: {
        serviceRole: {
          count: serviceCount,
          error: serviceCountError
        },
        anonRole: {
          count: anonCount,
          error: anonCountError
        }
      },
      testTableCreation: {
        result: testTableResult
      },
      directSql: {
        data: directSqlData,
        error: directSqlError
      },
      testInsert: {
        error: testInsertResult.error
      }
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message,
      stack: err.stack
    }, { status: 500 });
  }
} 