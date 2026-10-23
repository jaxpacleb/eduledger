import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv'

dotenv.config();

// Babasahin muna ang process.env (Node), kung wala, import.meta.env (Vite)
const supabaseUrl =
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) ||
  import.meta.env?.VITE_SUPABASE_URL;

const supabaseAnonKey =
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) ||
  import.meta.env?.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);