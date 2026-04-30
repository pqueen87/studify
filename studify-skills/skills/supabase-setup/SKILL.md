---
name: supabase-setup
description: Use this skill when setting up Supabase authentication, database tables, storage buckets, or Row Level Security policies for Studify.
---

# Supabase Setup Skill

## Overview
This skill covers all Supabase configuration for Studify: auth, database schema, storage, and security rules.

---

## 1. Authentication (Supabase Auth)

Use Supabase's built-in email/password auth. No custom auth logic needed.

```javascript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Sign up
const { data, error } = await supabase.auth.signUp({ email, password });

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({ email, password });

// Sign out
await supabase.auth.signOut();

// Get current user
const { data: { user } } = await supabase.auth.getUser();
```

Auto-create a profile row when a new user signs up using a Supabase database trigger:

```sql
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
```

---

## 2. Database schema

Run these SQL statements in the Supabase SQL editor:

```sql
-- Profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  name text,
  created_at timestamp with time zone default now()
);

-- Songs table
create table public.songs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text,
  lyrics text,
  genre text,
  audio_url text,
  image_url text,
  created_at timestamp with time zone default now()
);
```

---

## 3. Row Level Security (RLS)

Enable RLS so users can only access their own data:

```sql
-- Enable RLS
alter table public.profiles enable row level security;
alter table public.songs enable row level security;

-- Profiles: users can only read and update their own profile
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Songs: users can only access their own songs
create policy "Users can view own songs"
  on songs for select using (auth.uid() = user_id);

create policy "Users can insert own songs"
  on songs for insert with check (auth.uid() = user_id);

create policy "Users can delete own songs"
  on songs for delete using (auth.uid() = user_id);
```

---

## 4. Auth state in React

Use a context to manage auth state globally:

```javascript
// contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

---

## 5. Protected routes

Wrap any screen that requires login:

```javascript
// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};
```
