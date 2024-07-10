import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "@/src/utils/supabase/database.types";

export const createClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );