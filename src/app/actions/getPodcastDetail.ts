"use server"
import { sql } from "@vercel/postgres";


export async function getPodcastDetail(podcastId: string) {
    const { rows } = await sql`
        SELECT judul,nama,durasi,tanggal_rilis,tahun
        FROM konten 
        LEFT JOIN podcast ON konten.id = podcast.id_konten 
        LEFT JOIN akun ON akun.email = podcast.email_podcaster  
        WHERE podcast.id_konten = ${podcastId}
    `;
    return rows[0];
}