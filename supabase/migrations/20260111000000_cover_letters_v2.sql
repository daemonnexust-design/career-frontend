-- Extend cover_letters table for versioning and customization
-- Run: npx supabase db push

-- Add new columns to cover_letters
ALTER TABLE public.cover_letters
ADD COLUMN IF NOT EXISTS title text DEFAULT 'Untitled',
ADD COLUMN IF NOT EXISTS version integer DEFAULT 1,
ADD COLUMN IF NOT EXISTS tone text DEFAULT 'professional' CHECK (tone IN ('professional', 'enthusiastic', 'creative')),
ADD COLUMN IF NOT EXISTS job_description text,
ADD COLUMN IF NOT EXISTS company_values text,
ADD COLUMN IF NOT EXISTS company_name text,
ADD COLUMN IF NOT EXISTS position text,
ADD COLUMN IF NOT EXISTS is_favorite boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Trigger to update updated_at on change
CREATE OR REPLACE FUNCTION public.handle_cover_letter_updated()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_cover_letter_updated ON public.cover_letters;
CREATE TRIGGER on_cover_letter_updated
  BEFORE UPDATE ON public.cover_letters
  FOR EACH ROW EXECUTE PROCEDURE public.handle_cover_letter_updated();

-- Allow users to insert their own cover letters (for save/edit functionality)
DROP POLICY IF EXISTS "Users can insert own cover letters" ON public.cover_letters;
CREATE POLICY "Users can insert own cover letters"
  ON public.cover_letters FOR INSERT
  WITH CHECK ( auth.uid() = user_id );
