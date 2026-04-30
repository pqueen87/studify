# Studify — Project Context for Claude Code

## What is this project?
You are an expert mobile web developer building **Studify**, an AI-powered educational app that transforms photos of study notes into personalized songs. This is a non-commercial school presentation project.

## Core concept
The user uploads a photo of their study notes, selects a music genre (pop, reggaeton, rock, hip-hop, classical), and the app automatically generates a full song with lyrics based on the content of those notes.

## Tech stack
- **Frontend:** React (responsive web app, mobile-first)
- **Backend / Database:** Supabase (auth, PostgreSQL database, file storage)
- **AI for reading notes + generating lyrics:** Anthropic API — model `claude-sonnet-4-20250514`
- **AI for audio generation:** Sonauto API (`sonauto.ai/developers`)
- **Payments:** Not included (demo version)
- **Deploy:** Vercel

## Design
The UI design and design system have already been created in Claude Design and will be handed off directly. Do not make design decisions — respect the existing design system, components, and styles provided in the project files.

## App screens
1. **Onboarding / Splash** — logo, sign in / sign up buttons
2. **Auth** — email and password via Supabase Auth
3. **Dashboard / Home** — welcome message, "Create new song" CTA, history access
4. **Create song** — image upload, genre selector, generate button
5. **Loading** — animated waiting screen (generation takes 15–30 seconds)
6. **Player** — generated song with lyrics, play/pause, save or regenerate options
7. **History** — list of previously generated songs

## Database schema (Supabase)

**Table: `profiles`**
- `id` uuid — references auth.users
- `email` text
- `name` text
- `created_at` timestamp

**Table: `songs`**
- `id` uuid — primary key
- `user_id` uuid — foreign key → profiles.id
- `title` text — first words of the lyrics
- `lyrics` text
- `genre` text
- `audio_url` text
- `image_url` text (optional)
- `created_at` timestamp

## Environment variables required
```
ANTHROPIC_API_KEY=sk-ant-...
SONAUTO_API_KEY=...
SUPABASE_URL=https://....supabase.co
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## General rules
- The app must be fully responsive and mobile-first
- Always show user-friendly error messages (e.g. "Something went wrong, please try again")
- Generation takes 20–40 seconds — always show a loading animation
- Comment code clearly in English
- No payment or subscription system in this version
