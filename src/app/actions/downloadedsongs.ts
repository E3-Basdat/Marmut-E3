"use server"
import { sql } from "@vercel/postgres";

export async function getDownloadedSongs(query : string){
    try{
        const results = await sql`
        SELECT
            k.judul AS title,
            a.nama AS by,
            k.id AS id
        FROM
            DOWNLOADED_SONG ds
        JOIN
            PREMIUM p ON ds.email_downloader = p.email
        JOIN
            KONTEN k ON ds.id_song = k.id
        JOIN
            SONG s ON k.id = s.id_konten
        JOIN
            ARTIST ar ON s.id_artist = ar.id
        JOIN
            AKUN a ON ar.email_akun = a.email
        WHERE
            p.email = ${query};
        `;
        return results;
    } catch (err) {
        throw new Error(`Error: ${err}`)
    }
}