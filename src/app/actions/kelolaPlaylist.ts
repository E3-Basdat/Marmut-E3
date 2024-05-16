"use server";
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from "uuid";

export async function showPlaylist(email: string) {
    try {
        const { rows } = await sql`
          SELECT
          up.judul AS judul_playlist,
          up.jumlah_lagu,
          up.total_durasi,
          up.id_user_playlist
          FROM user_playlist up
          WHERE up.id_user_playlist = ${email}
        `;
        console.log("tes")
        console.log(rows[0]);
        if (rows.length > 0) {
            return rows;
        } else {
            return null; // Jika playlist tidak ditemukan
        }
    } catch (error: any) {
        console.error("Failed to read the playlist:", error);
        throw error;
    }
}

export async function detailPlaylist(id: string) {
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

export async function ubahPlaylist(formData: FormData, id : string) {
    const judul = formData.get('judul') as string;
    const deskripsi = formData.get('deskripsi') as string;
    
    try {
        await sql`
            UPDATE user_playlist
            SET judul = ${judul}, deskripsi = ${deskripsi}
            WHERE id_user_playlist = ${id};
        `;
        
        console.log("Playlist updated successfully");
    } catch (err: any) {
        console.error("Failed to update playlist:", err);
        throw err;
    }
}

export async function tambahPlaylist(formData: FormData) {
    const judul = formData.get('judul') as string;
    const deskripsi = formData.get('deskripsi') as string;
    const id = uuidv4();
    const total_durasi = 0;
    const jumlah_lagu = 0;

    
    try {
        await sql`
           
        `;
        
        console.log("Playlist updated successfully");
    } catch (err: any) {
        console.error("Failed to update playlist:", err);
        throw err;
    }
}


export async function hapusPlaylist(id: string) {
    try {
        await sql`
            DELETE FROM user_playlist
            WHERE id_user_playlist = ${id};
        `;
        
        console.log("Playlist deleted successfully");
    } catch (err: any) {
        console.error("Failed to delete playlist:", err);
        throw err;
    }
}

export async function listLagu() {
    try {
        const { rows } = await sql`
        SELECT a.nama AS nama_penyanyi, k.judul AS judul_lagu
        FROM SONG s
        JOIN ARTIST ar ON s.id_artist = ar.id
        JOIN AKUN a ON ar.email_akun = a.email
        JOIN KONTEN k ON s.id_konten = k.id;

        `;
        console.log("tes")
        console.log(rows[0]);
        if (rows.length > 0) {
            return rows;
        } else {
            return null; // Jika playlist tidak ditemukan
        }
    } catch (error: any) {
        console.error("Failed to read the playlist:", error);
        throw error;
    }
}

export async function tambahLagu(formData: FormData, id : string) {
    const judul = formData.get('judul') as string;
    const deskripsi = formData.get('deskripsi') as string;
    
    try {
        await sql`
            UPDATE user_playlist
            SET judul = ${judul}, deskripsi = ${deskripsi}
            WHERE id_user_playlist = ${id};
        `;
        
        console.log("Playlist updated successfully");
    } catch (err: any) {
        console.error("Failed to update playlist:", err);
        throw err;
    }
}

