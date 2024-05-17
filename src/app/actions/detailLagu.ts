"use server"
import { sql } from '@vercel/postgres'

export async function getDetailLagu(idLagu: string) {
    try {
        const results = await sql`
        SELECT 
            k.judul AS judul_lagu,
            a.judul AS judul_album,
            artist_akun.nama AS nama_artist,
            sw_akun.nama AS nama_songwriter,
            g.genre AS genre_lagu,
            k.durasi
        FROM 
            KONTEN k
        JOIN 
            SONG s ON k.id = s.id_konten
        JOIN 
            ALBUM a ON s.id_album = a.id
        JOIN 
            ARTIST art ON s.id_artist = art.id
        JOIN 
            AKUN artist_akun ON art.email_akun = artist_akun.email -- Join to get artist name from AKUN table
        JOIN 
            SONGWRITER_WRITE_SONG sws ON sws.id_song = s.id_konten
        JOIN 
            SONGWRITER sw ON sws.id_songwriter = sw.id
        JOIN 
            AKUN sw_akun ON sw.email_akun = sw_akun.email -- Join to get songwriter name from AKUN table
        JOIN 
            GENRE g ON g.id_konten = k.id
        WHERE 
            k.id = ${idLagu}
        `;
        return results.rows.map(row => ({
            judulLagu: row.judul_lagu,
            albumLagu: row.judul_album,
            artistLagu: row.nama_artist,
            songwriterLagu: row.nama_songwriter,
            genreLagu: row.genre_lagu,
            durasiLagu: row.durasi
        }));

    } catch (err: any) {
        console.error("Failed to fetch Song Detail:", err);
        throw new Error("Failed to fetch Song Detail");
    }
}