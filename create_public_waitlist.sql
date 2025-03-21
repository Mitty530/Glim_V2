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

-- Enable Row Level Security but with policies that allow operations
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Remove any existing policies
DROP POLICY IF EXISTS "Allow all operations for everyone" ON public.waitlist;
DROP POLICY IF EXISTS "Allow inserts for anon users" ON public.waitlist;
DROP POLICY IF EXISTS "Allow select for service role only" ON public.waitlist;

-- Create a completely public policy that allows all operations from anyone
CREATE POLICY "Allow all operations for everyone" 
  ON public.waitlist 
  USING (true) 
  WITH CHECK (true);

-- Grant all privileges to anon and authenticated roles
GRANT ALL ON public.waitlist TO anon;
GRANT ALL ON public.waitlist TO authenticated;
GRANT ALL ON public.waitlist TO service_role;

-- Insert a test record to ensure it works
INSERT INTO public.waitlist (firstName, email, comments, position) 
VALUES ('Test User', 'test-user@example.com', 'Created by setup script', 999); 