"use server"
import { sql } from "@vercel/postgres"
export async function getAllPodcast(email: string) {
    try {
        const { rows } = (await sql`
        SELECT p.id_konten AS id, k.judul, COUNT(e.*) AS jumlah_episode, k.durasi AS total_durasi 
        FROM podcast p
        LEFT JOIN konten k ON p.id_konten = k.id
        LEFT JOIN episode e ON k.id = e.id_konten_podcast
        WHERE email_podcaster = ${email}
        GROUP BY (p.id_konten, k.judul, k.tanggal_rilis, k.durasi)
    `)
        return rows;
    }
    catch (err) {
        console.error("Error get podcast:", err);
        throw new Error("Error get podcast");
    }
}