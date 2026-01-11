-- AI INTEGRATION SCHEMA DEFINITION (STATE_1)
-- Description: Zero-Trust schema for tracking AI usage and auditing decisions.
-- Author: Senior AI Systems Engineer

-- 1. AI USAGE LOGS
-- Tracks token consumption and quota enforcement.
CREATE TABLE IF NOT EXISTS public.ai_usage_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    model_id TEXT NOT NULL, -- e.g., 'gemini-1.5-flash'
    tokens_input INTEGER NOT NULL DEFAULT 0,
    tokens_output INTEGER NOT NULL DEFAULT 0,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    request_type TEXT NOT NULL -- 'cv_assessment', 'chat', etc.
);

-- Indexes for Quota Aggregation
CREATE INDEX IF NOT EXISTS idx_ai_usage_user_timestamp 
ON public.ai_usage_logs (user_id, timestamp);

-- 2. AI AUDIT LOGS
-- Atomic audit trail for compliance and safety. 
-- Input context is HASHED for privacy/security unless strictly necessary.
CREATE TABLE IF NOT EXISTS public.ai_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Request Integrity
    request_signature TEXT NOT NULL, -- HMAC of input + user_id
    
    -- Execution Context
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    action_type TEXT NOT NULL, -- 'assess_cv'
    
    -- Output & Decision
    decision_payload JSONB NOT NULL, -- Stores { qualification_score, warnings, match_level }
    processing_time_ms INTEGER,
    
    -- Safety
    meta_warnings TEXT[] -- Array of warnings raised by system or model
);

-- Indexes for Auditing
CREATE INDEX IF NOT EXISTS idx_ai_audit_user 
ON public.ai_audit_logs (user_id);

-- 3. ROW LEVEL SECURITY (RLS)
-- Principle: "Insert-Only" via Edge Functions (Service Role). 
-- Users cannot write directly. Users can purely READ their own logs for transparency (optional).

ALTER TABLE public.ai_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_audit_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Admin / Service Role Full Access
-- Note: Supabase Edge Functions using Service Role Bypass RLS automatically.
-- These policies are for ensuring no CLIENT-SIDE leakage.

CREATE POLICY "No client write access to usage logs"
ON public.ai_usage_logs
FOR INSERT
TO authenticated
WITH CHECK (false); -- Explicitly deny client inserts

drop policy if exists "Users view own usage logs" on public.ai_usage_logs;
CREATE POLICY "Users view own usage logs"
ON public.ai_usage_logs
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

drop policy if exists "No client write access to audit logs" on public.ai_audit_logs;
CREATE POLICY "No client write access to audit logs"
ON public.ai_audit_logs
FOR INSERT
TO authenticated
WITH CHECK (false);

drop policy if exists "Users view own audit logs" on public.ai_audit_logs;
CREATE POLICY "Users view own audit logs"
ON public.ai_audit_logs
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 4. COMMENTS
COMMENT ON TABLE public.ai_usage_logs IS 'Tracks token usage for quota limits (e.g. 5 requests/day).';
COMMENT ON TABLE public.ai_audit_logs IS 'Immutable record of AI decisions and safety warnings.';
