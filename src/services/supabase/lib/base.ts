import { SupabaseClient, createClient, PostgrestSingleResponse } from "@supabase/supabase-js"
export default class Base<T> {
    private supabase: SupabaseClient;
    private table_name: string;

    constructor(table_name: string, supabase: SupabaseClient) {
        this.table_name = table_name;
        this.supabase = supabase;
    }
    private returnResponse = (response: PostgrestSingleResponse<any[]>) => {
        if (response.status > 299) {
            throw response.error
        }
        return response.data as T | T[]
    }

    // funtion to subscribe to websocket table
    Subscribe = (onCallback: (payload: any) => void) => {
        this.supabase.channel(this.table_name).on("postgres_changes", { event: "*", schema: 'public', table: 'todos' }, onCallback).subscribe();
    }

    // get single data by id
    GetSingle = async (id: number) => {
        const response = await this.supabase.from(this.table_name).select().eq('id', id)
        return this.returnResponse(response);
    }

    // get all data
    GetAll = async () => {
        const response = await this.supabase.from(this.table_name).select().order('id', { ascending: true });
        return this.returnResponse(response);
    }

    // insert data
    Insert = async (request: T | T[]) => {
        const response = await this.supabase.from(this.table_name).insert(request).select();
        return this.returnResponse(response);
    }

    // update data by id
    Update = async (id: number, request: T) => {
        const response = await this.supabase.from(this.table_name).update(request).eq('id', id).select();
        return this.returnResponse(response);
    }

    // upsert data
    Upsert = async (request: T | T[]) => {
        const response = await this.supabase.from(this.table_name).update(request).select();
        return this.returnResponse(response);
    }

    // delete data by id
    Delete = async (id: number) => {
        const response = await this.supabase.from(this.table_name).delete().eq("id", id).select();
        return this.returnResponse(response);
    }
}