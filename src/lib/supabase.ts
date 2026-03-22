import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://kurxkrexeyeqjdrrfayc.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1cnhrcmV4ZXllcWpkcnJmYXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMTg5OTQsImV4cCI6MjA4OTU5NDk5NH0.7VRBf37N1B8My9Dtec4xEn6x7Lp2wWMCpaT-HEbQwcE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
