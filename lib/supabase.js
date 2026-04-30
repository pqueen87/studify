// Studify — Supabase client
// Loaded after the Supabase UMD CDN bundle and config.js.
// Exposes a single `window.db` client used throughout the app.

(function () {
  var cfg = window.STUDIFY_CONFIG;

  if (!cfg || cfg.supabaseUrl === "YOUR_SUPABASE_URL") {
    console.warn(
      "[Studify] Supabase is not configured yet.\n" +
      "Open config.js and fill in your supabaseUrl and supabaseAnonKey.\n" +
      "Get them from: Supabase Dashboard → Project Settings → API"
    );
    // Create a no-op stub so the app loads without crashing before keys are set
    window.db = {
      auth: {
        signUp: () => Promise.resolve({ error: { message: "Supabase not configured" } }),
        signInWithPassword: () => Promise.resolve({ error: { message: "Supabase not configured" } }),
        signOut: () => Promise.resolve({}),
        getSession: () => Promise.resolve({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => Promise.resolve({ data: null, error: null }),
      }),
      functions: {
        invoke: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
      },
    };
    return;
  }

  var createClient = window.supabase.createClient;
  window.db = createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
})();
