"use server"
import { sql } from "@vercel/postgres";

export async function DeletePodcast(id:string) {
    try{
        await sql`DELETE FROM konten WHERE id = ${id}`;

    }
    catch (error: any) {
        console.error("Failed to Podcast", error);
        throw error;
    }
}