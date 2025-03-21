-- Create extension for UUID generation if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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