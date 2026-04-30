import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

const GENRE_PROMPTS = {
  "Pop":       "upbeat catchy pop song with clear vocals",
  "Reggaetón": "reggaeton urban latin beat with energetic vocals",
  "Rock":      "electric guitar rock song with powerful vocals",
  "R&B":       "smooth soulful r&b song with expressive vocals",
  "Lo-fi":     "chill lo-fi relaxing beat with soft vocals",
  "Trap":      "dark trap hip hop beat with rap vocals",
  "Cumbia":    "tropical latin cumbia with festive vocals",
  "Jazz":      "smooth jazz with piano and melodic vocals",
  "K-Pop":     "bright energetic korean pop song with clean vocals",
  "Electro":   "electronic synth dance track with modern vocals",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: CORS });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL"),
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace("Bearer ", ""),
    );
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: CORS });
    }

    const { lyrics, genre, title } = await req.json();
    if (!lyrics || !genre) {
      return new Response(JSON.stringify({ error: "lyrics and genre are required" }), { status: 400, headers: CORS });
    }

    const stylePrompt = GENRE_PROMPTS[genre] ?? `${genre} style song with vocals`;

    const sonautoRes = await fetch("https://api.sonauto.ai/v1/generations/v3", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("SONAUTO_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: stylePrompt, lyrics, instrumental: false }),
    });

    if (!sonautoRes.ok) {
      console.error("Sonauto error:", await sonautoRes.text());
      return new Response(JSON.stringify({ error: "Audio generation failed. Please try again." }), { status: 500, headers: CORS });
    }

    const sonautoData = await sonautoRes.json();
    const taskId = sonautoData.task_id ?? null;

    if (!taskId) {
      console.error("No task_id from Sonauto:", JSON.stringify(sonautoData));
      return new Response(JSON.stringify({ error: "Audio generation failed. Please try again." }), { status: 500, headers: CORS });
    }

    const safeTitle = (title ?? lyrics.split("\n").find((l) => l.trim() && !l.startsWith("[")) ?? lyrics).substring(0, 50);
    const { data: song } = await supabase
      .from("songs")
      .insert({ user_id: user.id, title: safeTitle, lyrics, genre, audio_url: null })
      .select()
      .single();

    console.log("start-audio: task_id:", taskId, "song_id:", song?.id);
    return new Response(JSON.stringify({ task_id: taskId, song_id: song?.id ?? null }), { headers: CORS });

  } catch (err) {
    console.error("start-audio error:", err);
    return new Response(JSON.stringify({ error: "Something went wrong. Please try again." }), { status: 500, headers: CORS });
  }
});
