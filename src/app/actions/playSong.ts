"use server"
import { sql } from "@vercel/postgres";


export async function playSong(id : string) {
    try {
        const { rows } = await sql`
          SELECT 
            k.judul,
            k.tanggal_rilis,
            k.tahun,
            k.durasi,
            s.total_play,
            ak.nama AS nama_penulis,
            a.judul AS judul_album
          FROM konten k
          JOIN song s ON k.id_konten = s.id_konten
          JOIN album a ON k.album_id = a.id
          JOIN Songwriter_Write_Song sws ON k.id_konten = sws.id_song
          JOIN Songwriter sw ON sws.id_songwriter = sw.id
          JOIN Akun ak ON sw.email_akun = ak.email
          WHERE k.id = ${id}
        `;

        console.log(rows[0])
        if (rows.length > 0) {
            return rows[0];
        } else {
            return null; // Jika lagu tidak ditemukan
        }

    } catch (error: any) {
        console.error("Failed to read the song:", error);
        throw error;
    }


}