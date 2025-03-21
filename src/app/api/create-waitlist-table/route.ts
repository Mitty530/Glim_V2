import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    // Create admin client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        success: false,
        error: 'Missing Supabase credentials'
      }, { status: 500 });
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // SQL to create the table and setup permissions
    const createTableSQL = `
      -- Create extension for UUID generation if it doesn't exist
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      
      -- Drop table if it exists
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
      CREATE POLICY "Allow inserts for anon users" ON public.waitlist FOR INSERT WITH CHECK (true);
      
      -- Create policy to allow select for service role only
      CREATE POLICY "Allow select for service role only" ON public.waitlist FOR SELECT USING (auth.role() = 'service_role');
    `;
    
    // Execute SQL with the rpc function to execute raw SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql: createTableSQL });
    
    if (error) {
      // Try with direct SQL query if RPC fails
      const { error: directError } = await supabase.from('waitlist').select('count').limit(1);
      
      if (directError && directError.message.includes('relation "waitlist" does not exist')) {
        // Try the insert API directly
        const { error: insertError } = await supabase
          .from('waitlist')
          .insert([
            { 
              firstName: 'Test User', 
              email: 'test@example.com', 
              position: 1 
            }
          ]);
          
        return NextResponse.json({
          success: false,
          error: error.message,
          directQueryError: directError?.message,
          insertAttempt: insertError ? 'failed' : 'succeeded',
          insertError: insertError?.message
        });
      }
      
      return NextResponse.json({
        success: false,
        error: error.message,
        directQueryError: directError?.message
      });
    }
    
    // Test insert after creation
    const { data: insertData, error: insertError } = await supabase
      .from('waitlist')
      .insert([
        { 
          firstName: 'Test User', 
          email: 'test@example.com', 
          position: 1 
        }
      ])
      .select();
    
    return NextResponse.json({
      success: true,
      data,
      tableCreated: !error,
      testInsert: {
        success: !insertError,
        data: insertData,
        error: insertError ? insertError.message : null
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