"use server";
import { sql } from "@vercel/postgres";
import { count } from "console";
import { v4 as uuidv4 } from "uuid";

export async function showPlaylist(id: string, email: string) {
    try {
        const { rows } = await sql`
            SELECT
                up.judul AS judul_playlist,
                up.jumlah_lagu,
                up.total_durasi,
                up.id_user_playlist
            FROM user_playlist up
            WHERE up.id_user_playlist = ${id} 
            
        `;
        // AND up.email_pembuat = ${email};

        console.log(rows);
        
        if (rows.length > 0) {
            return rows;
        } else {
            return null;
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
                pls.id_song,
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
        
        console.log(rows);
        
        return rows;
    } catch (error: any) {
        console.error("Failed to fetch playlists:", error);
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

export async function tambahPlaylist(formData: FormData, email : string) {
    const judul = formData.get('judul') as string;
    const deskripsi = formData.get('deskripsi') as string;
    const id_user_playlist= uuidv4();
    const id_playlist = uuidv4();
    const total_durasi = 0;
    const jumlah_lagu = 0;

    
    try {
        await sql`
        INSERT INTO PLAYLIST (id) VALUES (${id_playlist});
        `;
        
        await sql`
        INSERT INTO USER_PLAYLIST (email_pembuat, id_user_playlist, judul, deskripsi, jumlah_lagu, tanggal_dibuat, id_playlist, total_durasi) 
VALUES (${email}, ${id_user_playlist}, ${judul}, ${deskripsi}, ${jumlah_lagu}, CURRENT_DATE, ${id_playlist}, ${total_durasi});
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
        SELECT a.nama AS nama_penyanyi, k.judul AS judul_lagu, s.id_konten
        FROM SONG s
        JOIN ARTIST ar ON s.id_artist = ar.id
        JOIN AKUN a ON ar.email_akun = a.email
        JOIN KONTEN k ON s.id_konten = k.id;

        `;
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

export async function tambahLagu(id_playlist : string , id_konten: string) {
    try {
        await sql`
            INSERT INTO PLAYLIST_SONG (id_playlist, id_song)
            VALUES (${id_playlist}, ${id_konten});
        `;
        
        console.log("Lagu berhasil ditambahkan ke playlist.");
    } catch (err: any) {
        console.error("Gagal menambahkan lagu ke playlist:", err);
        throw err;
    }
}

export async function cariIdLagu(judul_lagu: string) {
    try {
        console.log(judul_lagu);
        const { rows } = await sql`
            SELECT
            s.id_konten
            FROM SONG s
            JOIN KONTEN k ON s.id_konten = k.id
            WHERE k.judul = ${judul_lagu}
        `;

        console.log("hasil :",rows);
        
        return rows[0];
    } catch (err: any) {
        console.error("Failed to delete playlist:", err);
        throw err;
    }
}


export async function cariIdPlaylist(id_user_playlist: string) {
    console.log("atas =", id_user_playlist);
    try {
        const { rows } = await sql`
           SELECT
           pl.id
           FROM playlist pl
           JOIN user_playlist up ON pl.id = up.id_playlist
           WHERE up.id_user_playlist = ${id_user_playlist};
        `;

        console.log("row =", rows);
        
        if (rows.length > 0) {
            return rows[0].id_konten; // Mengembalikan id_konten dari hasil query
        } else {
            return null; // Jika lagu tidak ditemukan
        }
    } catch (err: any) {
        console.error("Failed to delete playlist:", err);
        throw err;
    }
}


export async function hapusLagu(id: string) {
    try {
        await sql`
            DELETE FROM playlist_song
            WHERE id_song = ${id};
        `;
        
        console.log("Playlist deleted successfully");
    } catch (err: any) {
        console.error("Failed to delete playlist:", err);
        throw err;
    }
}

export async function cekPlaylist(id_song: string, id_user_playlist: string) {
    try {
        const { rows } = await sql`
            SELECT COUNT(*) AS count_song
            FROM USER_PLAYLIST up
            JOIN PLAYLIST_SONG ps ON up.id_playlist = ps.id_playlist
            WHERE ps.id_song = ${id_song}
            AND up.id_user_playlist = ${id_user_playlist};
        `;

        const count = rows[0].count_song;
        console.log(count);

        if (count > 0) {
            return null; // Jika lagu sudah ada dalam user_playlist, kembalikan nilai null
        } else {
            return "Lagu belum ada dalam user_playlist"; // Jika lagu belum ada dalam user_playlist
        }
    } catch (error: any) {
        console.error("Gagal membaca playlist:", error);
        throw error;
    }
}



