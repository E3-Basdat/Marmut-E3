"use server";
import { sql } from "@vercel/postgres";

export async function playSong(id: string) {
    try {
        console.log("Fetching song details for ID:", id);
        const { rows } = await sql`
        SELECT 
        k.judul,
        k.tanggal_rilis,
        k.tahun,
        k.durasi,
        s.total_play,
        ak.nama AS nama_penulis
    FROM konten k
    JOIN song s ON k.id = s.id_konten
    JOIN album a ON s.id_album = a.id
    JOIN Songwriter_Write_Song sws ON k.id = sws.id_song
    JOIN Songwriter sw ON sws.id_songwriter = sw.id
    JOIN Akun ak ON sw.email_akun = ak.email
    WHERE k.id = ${id}
    
        `;

        
        console.log("Query result:", rows);
        if (rows.length > 0) {
            return rows[0];
        } else {
            return null; // If the song is not found
        }

    } catch (error: any) {
        console.error("Failed to read the song:", error);
        throw error;
    }
}
