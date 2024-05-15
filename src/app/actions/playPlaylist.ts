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
          k.judul AS judul_lagu
          FROM User_playlist up
          JOIN Akun ak ON up.email_pembuat = ak.email
          JOIN Playlist pl ON up.id_playlist = pl.id
          JOIN Playlist_Song pls ON pl.id = pls.id_playlist
          JOIN Konten k ON pls.id_song = k.id
          WHERE up.id_playlist = ${id}
        `;

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
