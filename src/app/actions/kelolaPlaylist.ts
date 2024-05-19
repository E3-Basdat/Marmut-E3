"use server";
import { sql } from "@vercel/postgres";
import { count } from "console";
import { v4 as uuidv4 } from "uuid";

export async function showPlaylist(id: string) {
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

export async function getUserPlaylists(email:string) {
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
            JOIN Akun ak ON up.email_pembuat = ak.email
            WHERE up.email_pembuat = ${email};
        `;
        
        return rows;
    } catch (error: any) {
        console.error("Failed to fetch playlists:", error);
        throw error;
    }
}


export async function showPlaylistDashboard(email: string) {
    try {
        const { rows } = await sql`
            SELECT
                up.judul AS judul_playlist,
                up.jumlah_lagu,
                up.total_durasi,
                up.id_user_playlist
            FROM user_playlist up
            WHERE  up.email_pembuat = ${email};
            
        `;

        return rows;
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
                up.total_durasi
            FROM
                user_playlist up
            JOIN Akun ak ON up.email_pembuat = ak.email
            WHERE
                up.id_user_playlist = ${id};
        `;
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

export async function getSongsInPlaylist(id: string) {
    try {
        const { rows } = await sql`
            SELECT
                k.judul AS judul_lagu,
                k.id AS id_song
            FROM
                user_playlist up
            JOIN Playlist pl ON up.id_playlist = pl.id
            JOIN Playlist_Song pls ON pl.id = pls.id_playlist
            JOIN Konten k ON pls.id_song = k.id
            WHERE
                up.id_user_playlist = ${id};
        `;
        if (rows.length > 0) {
            return rows;
        } else {
            return []; // Return an empty array if no songs are found
        }
    } catch (error: any) {
        console.error("Failed to read the songs in the playlist:", error);
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
        
    } catch (err: any) {
        console.error("Gagal menambahkan lagu ke playlist:", err);
        throw err;
    }
}

export async function cariIdLagu(judul_lagu: string) {
    try {
        const { rows } = await sql`
            SELECT
                s.id_konten
            FROM
                SONG s
            JOIN
                KONTEN k ON s.id_konten = k.id
            WHERE
                k.judul = ${judul_lagu}
        `;

        return rows[0]; 
    } catch (err: any) {
        console.error("Failed to fetch song ID:", err);
        throw err;
    }
}



export async function cariIdPlaylist(id_user_playlist: string) {
    try {
        const { rows } = await sql`
            SELECT
                pl.id
            FROM
                playlist pl
            JOIN
                user_playlist up ON pl.id = up.id_playlist
            WHERE
                up.id_user_playlist = ${id_user_playlist}
        `;

        if (rows.length > 0) {
            return rows[0].id; // Correctly return the id
        } else {
            return null; // Return null if not found
        }
    } catch (err: any) {
        console.error("Failed to find playlist ID:", err);
        throw err;
    }
}




export async function hapusLagu(id: string) {
    try {
        await sql`
            DELETE FROM playlist_song
            WHERE id_song = ${id};
        `;
    } catch (err: any) {
        console.error("Failed to delete playlist:", err);
        throw err;
    }
}

export async function cekPlaylist(id_song: string, id_user_playlist: string) {
    try {
        const { rows } = await sql`
            SELECT COUNT(*) AS count_song
            FROM
                user_playlist up
            JOIN
                playlist_song ps ON up.id_playlist = ps.id_playlist
            WHERE
                ps.id_song = ${id_song}
                AND up.id_user_playlist = ${id_user_playlist}
        `;

        const count = rows[0].count_song;
        return count > 0; // Return true if the song exists
    } catch (error: any) {
        console.error("Failed to check playlist:", error);
        throw error;
    }
}




