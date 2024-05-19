"use server";
import { sql } from "@vercel/postgres";


export async function playSong(id: string) {
    try {
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

export async function tambahPlaySong(email: string, id_song: string) {
    try {
        await sql`
            INSERT INTO AKUN_PLAY_SONG (email_pemain, id_song, waktu)
            VALUES (${email}, ${id_song}, current_timestamp);
        `;
    } catch (err: any) {
        console.error("Gagal menambahkan lagu ke playlist:", err);
        throw err;
    }
}

export async function downloadSong(email: string, id_song: string) {
    try {
        await sql`
            INSERT INTO downloaded_song (id_song, email_downloader)
            VALUES (${id_song}, ${email});
        `;
    } catch (err: any) {
        console.error("Gagal mengunduh lagu:", err);
        throw err;
    }
}

export async function getAllPlaylists() {
    try {
        const { rows } = await sql`
            SELECT
                up.id_user_playlist,
                up.judul AS judul_playlist,
                ak.nama AS nama_pembuat,
                up.deskripsi,
                up.jumlah_lagu,
                up.tanggal_dibuat,
                up.total_durasi
            FROM
                user_playlist up
            JOIN Akun ak ON up.email_pembuat = ak.email;
        `;
        
        return rows;
    } catch (error: any) {
        console.error("Failed to fetch playlists:", error);
        throw error;
    }
}

export async function tambahLagu(id_playlist : string , id_konten: string) {
    try {
        await sql`
            INSERT INTO PLAYLIST_SONG (id_playlist, id_song)
            VALUES (${id_playlist}, ${id_konten});
        `;
    } catch (err: any) {
        console.error("Gagal menambahkan lagu ke playlist:", err);
        throw err;
    }
}
