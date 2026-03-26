-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query)

-- 1. Profiles table (extends auth.users with app-specific fields)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null default '',
  plan text not null default 'Starter',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create a profile row whenever a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', ''));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. Websites table
create table if not exists public.websites (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  business_name text not null,
  email text not null default '',
  description text not null default '',
  product_link text not null default '',
  logo text not null default '',
  notes text not null default '',
  category text not null,
  category_name text not null,
  blueprint_id text not null,
  blueprint_name text not null,
  tone_id text not null,
  sections jsonb not null default '[]',
  section_contents jsonb not null default '{}',
  slug text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.websites enable row level security;

create policy "Users can view own websites"
  on public.websites for select
  using (auth.uid() = user_id);

create policy "Users can insert own websites"
  on public.websites for insert
  with check (auth.uid() = user_id);

create policy "Users can update own websites"
  on public.websites for update
  using (auth.uid() = user_id);

create policy "Users can delete own websites"
  on public.websites for delete
  using (auth.uid() = user_id);


-- 3. Generations table (tracks daily usage per user)
create table if not exists public.generations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  date date not null default current_date,
  count integer not null default 1,
  unique(user_id, date)
);

alter table public.generations enable row level security;

create policy "Users can view own generations"
  on public.generations for select
  using (auth.uid() = user_id);

create policy "Users can insert own generations"
  on public.generations for insert
  with check (auth.uid() = user_id);

create policy "Users can update own generations"
  on public.generations for update
  using (auth.uid() = user_id);


-- 4. Image generations table (tracks daily AI image usage per user, 5/day)
create table if not exists public.image_generations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  date date not null default current_date,
  count integer not null default 1,
  unique(user_id, date)
);

alter table public.image_generations enable row level security;

create policy "Users can view own image generations"
  on public.image_generations for select
  using (auth.uid() = user_id);

create policy "Users can insert own image generations"
  on public.image_generations for insert
  with check (auth.uid() = user_id);

create policy "Users can update own image generations"
  on public.image_generations for update
  using (auth.uid() = user_id);


-- 5. Feature access table (per-feature premium unlocks)
create table if not exists public.feature_access (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  feature text not null,
  granted_at timestamptz not null default now(),
  unique(user_id, feature)
);

alter table public.feature_access enable row level security;

create policy "Users can view own feature access"
  on public.feature_access for select
  using (auth.uid() = user_id);

-- Service role inserts only — users cannot grant themselves access
-- Insert policy intentionally omitted for anon/authenticated roles


-- 6. Add language column to websites (if not present)
alter table public.websites add column if not exists language text;
