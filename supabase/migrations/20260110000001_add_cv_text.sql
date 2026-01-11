-- Add cv_text column to user_cvs table for AI to read
-- This allows users to paste their CV content as text

ALTER TABLE public.user_cvs 
ADD COLUMN IF NOT EXISTS cv_text text;

-- Add comment for clarity
COMMENT ON COLUMN public.user_cvs.cv_text IS 'User-provided CV text for AI analysis';
