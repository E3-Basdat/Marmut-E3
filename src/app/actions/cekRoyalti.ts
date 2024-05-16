"use server"
import { sql } from "@vercel/postgres";

export async function fetchTotalRoyalti(): Promise<string[]> {
    const results = await sql`SELECT `;
    return results.rows.map(row => row.total as string);
}

export async function getRoyalti() {
    const results = await sql`
        SELECT k.nama, a.judul, s.total_play, s.total_download 
        FROM KONTEN k, ALBUM a, SONG s, ROYALTI r 
        WHERE 
    `;

}