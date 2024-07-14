import { SupabaseClient } from "@supabase/supabase-js";
import Base from "./base";
import { Todo } from "@/types";

export default class Todos extends Base<Todo> {
    constructor(supabase: SupabaseClient) {
        super("todos", supabase);
    }
    // add more logic like join here
}