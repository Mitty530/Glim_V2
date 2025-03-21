import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Client } from 'pg';

export async function GET() {
  try {
    // Get Supabase connection details
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({
        success: false,
        error: 'Missing Supabase credentials'
      }, { status: 500 });
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Try to use the current JS client to create the table
    const { data: tableInfo, error: tableError } = await supabase
      .from('pg_tables')
      .select('*')
      .eq('schemaname', 'public');
    
    // Check if waitlist table exists
    const waitlistExists = tableInfo && Array.isArray(tableInfo) && 
                           tableInfo.some(table => table.tablename === 'waitlist');
    
    // SQL to create waitlist table
    const createTableSQL = `
      -- Create extension for UUID generation if it doesn't exist
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      
      -- Drop table if it exists to recreate it fresh
      DROP TABLE IF EXISTS public.waitlist;
      
      -- Create waitlist table
      CREATE TABLE public.waitlist (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        firstName TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        comments TEXT,
        position INTEGER NOT NULL,
        createdAt TIMESTAMPTZ DEFAULT NOW()
      );
      
      -- Add row level security policy
      ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
      
      -- Create policy to allow insert for anonymous users
      DROP POLICY IF EXISTS "Allow inserts for anon users" ON public.waitlist;
      CREATE POLICY "Allow inserts for anon users" ON public.waitlist FOR INSERT WITH CHECK (true);
      
      -- Create policy to allow select for service role only
      DROP POLICY IF EXISTS "Allow select for service role only" ON public.waitlist;
      CREATE POLICY "Allow select for service role only" ON public.waitlist FOR SELECT USING (auth.role() = 'service_role');
      
      -- Insert a test record to make sure it's working
      INSERT INTO public.waitlist (firstName, email, comments, position) 
      VALUES ('Test User', 'test-user@example.com', 'Created by setup script', 999);
    `;
    
    // Try to run this SQL through a direct PostgreSQL connection instead
    const match = supabaseUrl.match(/https:\/\/([^\.]+)\.supabase\.co/);
    if (!match) {
      return NextResponse.json({
        success: false,
        error: 'Invalid Supabase URL format',
        url: supabaseUrl
      });
    }
    
    const project = match[1];
    const postgresPassword = supabaseServiceKey;
    
    // Direct Postgres connection attempt
    let pgResult = null;
    let pgError = null;
    
    try {
      const pgClient = new Client({
        host: `db.${project}.supabase.co`,
        port: 5432,
        database: 'postgres',
        user: 'postgres',
        password: postgresPassword,
        ssl: true
      });
      
      await pgClient.connect();
      pgResult = await pgClient.query(createTableSQL);
      await pgClient.end();
    } catch (err) {
      pgError = err instanceof Error ? err.message : String(err);
    }
    
    // Try to verify it worked with the Supabase client
    const { data: verifyData, error: verifyError } = await supabase
      .from('waitlist')
      .select('*')
      .limit(5);
    
    return NextResponse.json({
      success: !pgError && !verifyError,
      tableExistedBefore: waitlistExists,
      pgResult,
      pgError,
      verification: {
        data: verifyData,
        error: verifyError ? verifyError.message : null
      },
      message: pgError 
               ? 'Failed to create waitlist table with direct SQL' 
               : 'Waitlist table created successfully'
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message,
      stack: err.stack
    }, { status: 500 });
  }
} 