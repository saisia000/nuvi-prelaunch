-- Create table for caregiver survey responses
CREATE TABLE public.survey_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number TEXT NOT NULL,
  relationship TEXT NOT NULL,
  care_duration TEXT NOT NULL,
  support_areas TEXT[] NOT NULL,
  challenges TEXT[] NOT NULL,
  goals TEXT[] NOT NULL,
  tech_comfort INTEGER NOT NULL CHECK (tech_comfort >= 1 AND tech_comfort <= 5),
  additional_comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for collaborator submissions
CREATE TABLE public.collaborator_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  organization TEXT NOT NULL,
  role TEXT NOT NULL,
  collaboration TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (making them publicly readable for now since no auth yet)
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collaborator_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access (will update when we add auth)
CREATE POLICY "Allow public insert on survey responses" 
ON public.survey_responses 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public insert on collaborator submissions" 
ON public.collaborator_submissions 
FOR INSERT 
WITH CHECK (true);