---
description: Deploy backend to Supabase (Database & Edge Functions)
---

1. Login to Supabase CLI (Interactive)
   `npx supabase login`

2. Link Project (Requires DB Password)
   `npx supabase link --project-ref npxgkzwrsmrhupahctqe`

3. Push Database Schema
   `npx supabase db push`

4. Deploy Edge Functions
   `npx supabase functions deploy`
