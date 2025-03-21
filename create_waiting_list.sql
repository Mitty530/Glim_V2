-- Start with a clean slate
DROP TABLE IF EXISTS public.waiting_list;

-- Create the waiting_list table
CREATE TABLE public.waiting_list (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    features TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.waiting_list ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Allow all operations for everyone" ON public.waiting_list;

-- Create a policy that allows anyone to insert data (for public form submissions)
CREATE POLICY "Allow all operations for everyone" 
ON public.waiting_list 
FOR ALL
USING (true)
WITH CHECK (true);

-- Explicitly grant permissions to roles
GRANT ALL ON public.waiting_list TO postgres;
GRANT ALL ON public.waiting_list TO anon;
GRANT ALL ON public.waiting_list TO authenticated;
GRANT ALL ON public.waiting_list TO service_role;

-- Grant permission for the sequence as well (needed for ID generation)
GRANT USAGE, SELECT ON SEQUENCE waiting_list_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE waiting_list_id_seq TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE waiting_list_id_seq TO service_role;

-- Insert a test record to verify everything works
INSERT INTO public.waiting_list (name, email, features)
VALUES ('Test User', 'test@example.com', 'Test features from setup script');

-- Verify the record was inserted
SELECT * FROM public.waiting_list; 