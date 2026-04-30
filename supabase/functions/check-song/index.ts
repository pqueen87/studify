import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
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

    const { task_id, song_id } = await req.json();
    if (!task_id) {
      return new Response(JSON.stringify({ error: "task_id is required" }), { status: 400, headers: CORS });
    }

    const pollRes = await fetch(`https://api.sonauto.ai/v1/generations/${task_id}`, {
      headers: { "Authorization": `Bearer ${Deno.env.get("SONAUTO_API_KEY")}` },
    });

    if (!pollRes.ok) {
      return new Response(JSON.stringify({ done: false, status: "CHECKING" }), { headers: CORS });
    }

    const pollData = await pollRes.json();
    const status = pollData.status ?? "";
    console.log(`check-song task=${task_id} status=${status}`);

    if (status === "FAILURE") {
      return new Response(JSON.stringify({ done: true, error: "Audio generation failed. Please try again." }), { headers: CORS });
    }

    if (status !== "SUCCESS") {
      return new Response(JSON.stringify({ done: false, status }), { headers: CORS });
    }

    const audioUrl = pollData.song_paths?.[0] ?? null;
    if (!audioUrl) {
      return new Response(JSON.stringify({ done: false, status: "SUCCESS_NO_URL" }), { headers: CORS });
    }

    let song = null;
    if (song_id) {
      const { data } = await supabase
        .from("songs")
        .update({ audio_url: audioUrl })
        .eq("id", song_id)
        .eq("user_id", user.id)
        .select()
        .single();
      song = data;
    }

    console.log("check-song: SUCCESS, audio_url:", audioUrl);
    return new Response(JSON.stringify({ done: true, audio_url: audioUrl, song }), { headers: CORS });

  } catch (err) {
    console.error("check-song error:", err);
    return new Response(JSON.stringify({ done: false, status: "ERROR" }), { headers: CORS });
  }
});
