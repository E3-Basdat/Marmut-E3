"use server"
import { sql } from "@vercel/postgres";

export async function getSearch(query : string) {
    try {
        const results = await sql`
        SELECT 'SONG' AS type, k.judul AS title, a.nama AS by, k.id AS id
        FROM SONG s
        JOIN KONTEN k ON s.id_konten = k.id
        JOIN ARTIST ar ON s.id_artist = ar.id
        JOIN AKUN a ON ar.email_akun = a.email
        WHERE k.judul ILIKE ${query}
        UNION
        SELECT 'PODCAST' AS type, k.judul AS title, ak.nama AS by, k.id AS id
        FROM PODCAST p
        JOIN KONTEN k ON p.id_konten = k.id
        JOIN PODCASTER po ON p.email_podcaster = po.email
        JOIN AKUN ak ON po.email = ak.email
        WHERE k.judul ILIKE ${query}
        UNION
        SELECT 'USER_PLAYLIST' AS type, up.judul AS title, u.nama AS by, up.id_user_playlist AS id
        FROM USER_PLAYLIST up
        JOIN AKUN u ON up.email_pembuat = u.email
        WHERE up.judul ILIKE ${query}; 
        `;
        return results;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}