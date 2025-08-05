-- Add SELECT policies to view submitted data
CREATE POLICY "Allow admin to view signups" 
ON public.signups 
FOR SELECT 
USING (true);

CREATE POLICY "Allow admin to view survey responses" 
ON public.survey_responses 
FOR SELECT 
USING (true);

CREATE POLICY "Allow admin to view collaborator submissions" 
ON public.collaborator_submissions 
FOR SELECT 
USING (true);