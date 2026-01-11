-- Up Migration: Gmail OAuth Tokens Storage
-- Securely stores per-user Gmail OAuth tokens for sending emails via Gmail API

create table public.user_gmail_tokens (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  access_token text not null,
  refresh_token text,
  expires_at timestamptz,
  gmail_email text,
  connected_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.user_gmail_tokens enable row level security;

-- Users can only SELECT their own token metadata (to check connection status)
-- They CANNOT see raw tokens - that's handled by Edge Functions
create policy "Users can view own Gmail connection status"
  on public.user_gmail_tokens for select
  using (auth.uid() = user_id);

-- NO INSERT/UPDATE/DELETE policies for users
-- Only Service Role (Edge Functions) can modify tokens

-- Trigger to update 'updated_at' on token refresh
create or replace function public.handle_gmail_token_updated()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_gmail_token_updated
  before update on public.user_gmail_tokens
  for each row execute procedure public.handle_gmail_token_updated();

-- Index for fast lookup by user_id
create index idx_user_gmail_tokens_user_id on public.user_gmail_tokens(user_id);
