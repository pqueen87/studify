import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Only generates lyrics with Claude — fast (~3-5s), well within gateway timeout
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

    const { imageBase64, mediaType = "image/jpeg", genre, subject } = await req.json();
    if (!imageBase64 || !genre) {
      return new Response(JSON.stringify({ error: "imageBase64 and genre are required" }), { status: 400, headers: CORS });
    }

    const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": Deno.env.get("ANTHROPIC_API_KEY"),
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1024,
        messages: [{
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: mediaType, data: imageBase64 } },
            {
              type: "text",
              text: `You are an expert in education and music. Analyze the study notes in this image${subject ? ` (subject: ${subject})` : ""}. Extract the key concepts and write a complete song in the style of ${genre}. Requirements: 2 verses and 1 chorus, natural rhymes that fit the genre, key concepts embedded memorably in the lyrics. Return ONLY the plain lyrics text. Do NOT use markdown, asterisks, hashtags, or any formatting. Label sections as [Verse 1], [Chorus], [Verse 2] in plain text.`,
            },
          ],
        }],
      }),
    });

    if (!claudeRes.ok) {
      console.error("Claude error:", await claudeRes.text());
      return new Response(JSON.stringify({ error: "Could not read your notes. Please try with a clearer image." }), { status: 500, headers: CORS });
    }

    const claudeData = await claudeRes.json();
    const lyrics = claudeData.content[0].text;
    const firstLine = lyrics.split("\n").find((l) => l.trim() && !l.startsWith("[")) ?? lyrics;
    const title = subject
      ? `${subject.substring(0, 30)} — ${genre} Mix`
      : firstLine.trim().substring(0, 50);

    console.log("generate-song: lyrics ready, title:", title);
    return new Response(JSON.stringify({ lyrics, title, genre }), {
      headers: { ...CORS, "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("generate-song error:", err);
    return new Response(JSON.stringify({ error: "Something went wrong. Please try again." }), { status: 500, headers: CORS });
  }
});
