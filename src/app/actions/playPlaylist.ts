"use server";
import { sql } from "@vercel/postgres";

export async function playPlaylist(id: string) {
    try {
        const { rows } = await sql`
            SELECT
                up.judul AS judul_playlist,
                ak.nama AS nama_pembuat,
                up.deskripsi,
                up.jumlah_lagu,
                up.tanggal_dibuat,
                up.total_durasi,
                k.judul AS judul_lagu,
                k.durasi,
                subquery.nama_penyanyi
            FROM
                user_playlist up
            JOIN Akun ak ON up.email_pembuat = ak.email
            JOIN Playlist pl ON up.id_playlist = pl.id
            JOIN Playlist_Song pls ON pl.id = pls.id_playlist
            JOIN Konten k ON pls.id_song = k.id
            LEFT JOIN (
                SELECT
                    pl.id,
                    ak.nama as nama_penyanyi
                FROM
                    Playlist pl
                JOIN Playlist_Song pls ON pl.id = pls.id_playlist
                JOIN Konten k ON pls.id_song = k.id
                JOIN song sg ON k.id = sg.id_konten
                JOIN artist  ar ON sg.id_artist = ar.id
                JOIN akun ak ON ar.email_akun = ak.email
                GROUP BY
                    pl.id,
                    ak.nama
            ) AS subquery ON pl.id = subquery.id
            WHERE
                up.id_user_playlist = ${id};
        `;
        
        console.log(rows[0]);
        
        if (rows.length > 0) {
            return rows;
        } else {
            return null; // Jika lagu tidak ditemukan
        }
    } catch (error: any) {
        console.error("Failed to read the playlist:", error);
        throw error;
    }
}
