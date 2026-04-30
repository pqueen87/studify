-- Studify — Supabase SQL setup
-- Run this entire file in: Supabase Dashboard → SQL Editor → New query
-- ─────────────────────────────────────────────────────────────────────────


-- ── 1. Tables ──────────────────────────────────────────────────────────────

create table public.profiles (
  id         uuid references auth.users on delete cascade primary key,
  email      text,
  name       text,
  created_at timestamp with time zone default now()
);

create table public.songs (
  id         uuid default gen_random_uuid() primary key,
  user_id    uuid references public.profiles(id) on delete cascade not null,
  title      text,
  lyrics     text,
  genre      text,
  audio_url  text,
  image_url  text,
  created_at timestamp with time zone default now()
);


-- ── 2. Row Level Security ──────────────────────────────────────────────────

alter table public.profiles enable row level security;
alter table public.songs    enable row level security;

-- Profiles: each user can only read and update their own row
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Songs: each user can only access their own songs
create policy "Users can view own songs"
  on songs for select using (auth.uid() = user_id);

create policy "Users can insert own songs"
  on songs for insert with check (auth.uid() = user_id);

create policy "Users can delete own songs"
  on songs for delete using (auth.uid() = user_id);


-- ── 3. Trigger: auto-create profile on sign-up ─────────────────────────────

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
