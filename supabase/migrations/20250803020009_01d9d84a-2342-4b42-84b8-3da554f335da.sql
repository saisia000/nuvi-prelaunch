-- Create signups table for general user registrations
CREATE TABLE public.signups (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  name text,
  phone_number text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  source text DEFAULT 'website',
  UNIQUE(email)
);

-- Enable Row Level Security
ALTER TABLE public.signups ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts
CREATE POLICY "Allow public insert on signups" 
ON public.signups 
FOR INSERT 
WITH CHECK (true);