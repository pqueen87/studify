---
name: generate-song
description: Use this skill when implementing or modifying the song generation flow — reading notes from an image, generating lyrics with Claude API, and creating audio with Sonauto API.
---

# Song Generation Skill

## Overview
This skill handles the complete flow: image → lyrics (Claude AI) → audio (Sonauto API) → saved song.

---

## Supabase Edge Function: `generate-song`

Create this as a Supabase Edge Function. It runs server-side so API keys are never exposed to the client.

### Full flow

**Step 1 — Validate request**
- Accept: `{ imageBase64: string, genre: string }` in the request body
- Verify the user is authenticated via Supabase Auth JWT
- Return 401 if not authenticated

**Step 2 — Extract text and generate lyrics with Claude API**

Call the Anthropic API with the image and this exact prompt:

```
You are an expert in education and music. Analyze the text in this image of study notes.
Extract the key concepts and write a complete song in the style of [GENRE].

Requirements:
- 2 verses and 1 chorus
- Natural rhymes that fit the genre's rhythm
- The most important concepts from the notes must be embedded memorably in the lyrics
- Return ONLY the lyrics, no titles, explanations, or extra formatting
```

API call structure:
```javascript
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "x-api-key": Deno.env.get("ANTHROPIC_API_KEY"),
    "anthropic-version": "2023-06-01",
    "content-type": "application/json",
  },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [{
      role: "user",
      content: [
        {
          type: "image",
          source: {
            type: "base64",
            media_type: "image/jpeg",
            data: imageBase64,
          },
        },
        {
          type: "text",
          text: `You are an expert in education and music. Analyze the text in this image of study notes. Extract the key concepts and write a complete song in the style of ${genre}. Requirements: 2 verses and 1 chorus, natural rhymes, key concepts embedded memorably. Return ONLY the lyrics.`,
        },
      ],
    }],
  }),
});
const lyrics = response.content[0].text;
```

**Step 3 — Generate audio with Sonauto API**

```javascript
const sonautoResponse = await fetch("https://sonauto.ai/api/v1/generations", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${Deno.env.get("SONAUTO_API_KEY")}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    prompt: lyrics,
    tags: genre,          // e.g. "pop", "reggaeton", "rock", "hip-hop", "classical"
    instrumental: false,  // we want vocals
  }),
});
const { audio_url } = await sonautoResponse.json();
```

> Note: Sonauto generation is async. Poll the status endpoint until `status === "complete"` before returning the audio URL. Implement a polling loop with a max wait of 60 seconds.

**Step 4 — Save to Supabase and return**

```javascript
const { data, error } = await supabase
  .from("songs")
  .insert({
    user_id: user.id,
    title: lyrics.split("\n")[0].substring(0, 50),
    lyrics,
    genre,
    audio_url,
  })
  .select()
  .single();

return new Response(JSON.stringify({ song: data }), { status: 200 });
```

---

## Error handling
- If Claude API fails: return `{ error: "Could not read your notes. Please try with a clearer image." }`
- If Sonauto fails: return `{ error: "Audio generation failed. Please try again." }`
- If Supabase insert fails: log the error, still return the song data to the user
- Always wrap the entire function in try/catch

---

## Frontend integration

Call the Edge Function from the React component:

```javascript
const generateSong = async (imageFile, genre) => {
  // Convert image to base64
  const base64 = await fileToBase64(imageFile);

  const { data, error } = await supabase.functions.invoke("generate-song", {
    body: { imageBase64: base64, genre },
  });

  if (error) throw new Error(error.message);
  return data.song;
};
```

Show the loading screen immediately after calling `generateSong`. Navigate to the player screen once the promise resolves.

---

## Genre tag mapping for Sonauto

```javascript
const GENRE_TAGS = {
  pop: "pop upbeat catchy",
  reggaeton: "reggaeton urban latin",
  rock: "rock electric guitar",
  "hip-hop": "hip-hop rap beats",
  classical: "classical orchestral piano",
};
```
