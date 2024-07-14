import { createClient, SupabaseClient } from "@supabase/supabase-js";
const supabase: SupabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);
import Todos from "./lib/todo";

const todos_model = new Todos(supabase);
export { supabase, todos_model };