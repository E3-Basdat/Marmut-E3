"use server"
import { sql } from "@vercel/postgres";

export async function getAllAlbum() {
    try {
        const result = await sql`SELECT * FROM ALBUM`;
        return result;
    } catch (err: any) {
        console.error("Failed to fetch album:", err);
    }
}