import { createClient } from '@supabase/supabase-js';

// Server-only Supabase client — never import in client components.
// Gracefully returns null if env vars are not yet configured.
function getSupabaseServer() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export const supabaseServer = getSupabaseServer();
