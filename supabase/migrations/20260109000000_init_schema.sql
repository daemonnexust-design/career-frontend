-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES TABLE
-- Secure user profile table. Only the user can view/edit their own profile.
-- 'role' column is protected and can only be modified by service role (admin).
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using ( auth.uid() = id );

create policy "Users can update own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- TRIGGER: Protect 'role' column from user updates
create or replace function public.protect_role_column()
returns trigger as $$
begin
  -- If role is being changed and the current user is NOT a service_role
  if new.role is distinct from old.role and auth.role() != 'service_role' then
    raise exception 'You are not authorized to update the role column.';
  end if;
  return new;
end;
$$ language plpgsql;

create trigger protect_profiles_role
  before update on public.profiles
  for each row execute procedure public.protect_role_column();


-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- Note: 'role' defaults to 'user'.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- APPLICATIONS TABLE
-- Stores job applications. Private to the user.
create table public.applications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  company_name text not null,
  status text default 'draft', -- e.g., draft, applied, interviewed, rejected, offer
  created_at timestamptz default now()
);

alter table public.applications enable row level security;

create policy "Users can CRUD own applications"
  on public.applications for all
  using ( auth.uid() = user_id );


-- COVER LETTERS TABLE
-- Stores generated cover letters. Private to the user.
create table public.cover_letters (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  application_id uuid references public.applications(id),
  content text,
  generated_at timestamptz default now()
);

alter table public.cover_letters enable row level security;

create policy "Users can view own cover letters"
  on public.cover_letters for select
  using ( auth.uid() = user_id );

create policy "Users can delete own cover letters"
  on public.cover_letters for delete
  using ( auth.uid() = user_id );

-- "Users can view own cover letters" is defined above.
-- "Users can delete own cover letters" is defined above.
-- "Users can insert own cover letters" -- REMOVED.
-- Only Service Role (Edge Function) can insert generated cover letters.
-- Users CANNOT insert manually.

create policy "Users can update own cover letters"
  on public.cover_letters for update
  using ( auth.uid() = user_id );


-- EMAIL DRAFTS TABLE
-- Stores scheduled or draft emails. Private to the user.
create table public.email_drafts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  subject text,
  body text,
  scheduled_at timestamptz,
  status text default 'draft', -- draft, scheduled, sent
  sent_at timestamptz,
  created_at timestamptz default now()
);

alter table public.email_drafts enable row level security;

create policy "Users can CRUD own email drafts"
  on public.email_drafts for all
  using ( auth.uid() = user_id );

-- TRIGGER: Protect 'status' and 'sent_at' columns on email_drafts
create or replace function public.protect_email_status()
returns trigger as $$
begin
  -- Status transition to 'sent' is reserved for service_role (Edge Function)
  if (new.status = 'sent' and old.status != 'sent') or (new.sent_at is distinct from old.sent_at) then
     if auth.role() != 'service_role' then
        raise exception 'You are not authorized to mark emails as sent.';
     end if;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger protect_email_drafts_status
  before update on public.email_drafts
  for each row execute procedure public.protect_email_status();


-- ANALYTICS VIEWS (Admin Only technically, relying on backend to access)
-- We will create them but not expose them via RLS to public.
create or replace view public.total_applications_view as
  select count(*) as count from public.applications;

create or replace view public.ai_generation_counts_view as
  select count(*) as count from public.cover_letters;

create or replace view public.email_send_counts_view as
  select count(*) as count from public.email_drafts where sent_at is not null;

-- Grant access to authenticated users? NO.
-- These views should be accessed by the service role (Admin Edge Functions) only.
-- So we do NOT grant select on these views to 'authenticated' or 'anon'.
