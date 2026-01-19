-- Create company_insights table
create table public.company_insights (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  target_url text not null,
  swot_analysis jsonb,
  strategic_focus text,
  culture_decoder jsonb,
  interview_war_room jsonb,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.company_insights enable row level security;

-- Policies
create policy "Users can view own company insights"
  on public.company_insights for select
  using ( auth.uid() = user_id );

create policy "Users can insert own company insights"
  on public.company_insights for insert
  with check ( auth.uid() = user_id );

create policy "Users can delete own company insights"
  on public.company_insights for delete
  using ( auth.uid() = user_id );

-- Grant access to service role (implicit but good for documentation/explicitness in some setups, though strictly not needed if service_role bypasses RLS)
grant all on public.company_insights to service_role;
