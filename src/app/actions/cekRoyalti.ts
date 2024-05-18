"use server"
import { sql } from "@vercel/postgres";

export async function getRoyaltiArtist(email: string) {
    try {
        const results = await sql`
            SELECT 
                KONTEN.judul AS judul_lagu,
                ALBUM.judul AS judul_album,
                SONG.total_play AS total_play,
                SONG.total_download AS total_download,
                (PEMILIK_HAK_CIPTA.rate_royalti * SONG.total_play) AS total_royalti 
            FROM 
                ARTIST
            INNER JOIN 
                SONG ON ARTIST.id = SONG.id_artist
            INNER JOIN 
                KONTEN ON SONG.id_konten = KONTEN.id
            INNER JOIN 
                ALBUM ON SONG.id_album = ALBUM.id
            INNER JOIN 
                PEMILIK_HAK_CIPTA ON ARTIST.id_pemilik_hak_cipta = PEMILIK_HAK_CIPTA.id
            WHERE 
                ARTIST.email_akun = ${email}
            ORDER BY 
                KONTEN.judul
        `;
        return results.rows.map(row => ({
            judulLagu: row.judul_lagu,
            judulAlbum: row.judul_album,
            totalPlay: row.total_play,
            totalDownload: row.total_download,
            totalRoyalti: row.total_royalti
        }));

    } catch (err: any) {
        console.error("Failed to fetch Royalti:", err);
        throw new Error("Failed to fetch Royalti");
    }

}

export async function getRoyaltiSongwriter(email: string) {
    try {
        const results = await sql`
        SELECT 
            KONTEN.judul AS Judul_lagu,
            ALBUM.judul AS Judul_album,
            SONG.total_play AS total_play,
            SONG.total_download AS total_download,
            (PEMILIK_HAK_CIPTA.rate_royalti * SONG.total_play) AS total_royalti 
        FROM 
            SONGWRITER
        INNER JOIN 
            SONGWRITER_WRITE_SONG ON SONGWRITER.id = SONGWRITER_WRITE_SONG.id_songwriter
        INNER JOIN 
            SONG ON SONGWRITER_WRITE_SONG.id_song = SONG.id_konten
        INNER JOIN 
            KONTEN ON SONG.id_konten = KONTEN.id
        INNER JOIN 
            ALBUM ON SONG.id_album = ALBUM.id
        INNER JOIN 
            PEMILIK_HAK_CIPTA ON SONGWRITER.id_pemilik_hak_cipta = PEMILIK_HAK_CIPTA.id
        WHERE 
            SONGWRITER.email_akun = ${email}
        ORDER BY 
            KONTEN.judul
        `;
        return results.rows.map(row => ({
            judulLagu: row.judul_lagu,
            judulAlbum: row.judul_album,
            totalPlay: row.total_play,
            totalDownload: row.total_download,
            totalRoyalti: row.total_royalti
        }));
    } catch (err: any) {
        console.error("Failed to fetch Royalti:", err);
        throw new Error("Failed to fetch Royalti");
    }

}

export async function getRoyaltiLabel(email:string ) {
    try {
        const results = await sql`
        SELECT 
            KONTEN.judul AS judul_lagu,
            ALBUM.judul AS judul_album,
            SUM(SONG.total_play) AS total_play,
            SUM(SONG.total_download) AS total_download,
            SUM(PEMILIK_HAK_CIPTA.rate_royalti * SONG.total_play) AS total_royalti
        FROM 
            LABEL
        INNER JOIN 
            ALBUM ON LABEL.id = ALBUM.id_label
        INNER JOIN 
            SONG ON ALBUM.id = SONG.id_album
        INNER JOIN 
            KONTEN ON SONG.id_konten = KONTEN.id
        INNER JOIN 
            ARTIST ON SONG.id_artist = ARTIST.id
        INNER JOIN 
            PEMILIK_HAK_CIPTA ON ARTIST.id_pemilik_hak_cipta = PEMILIK_HAK_CIPTA.id
        WHERE 
            LABEL.email = 'asep@gmail.com'
        GROUP BY 
            KONTEN.judul, ALBUM.judul
        ORDER BY 
            KONTEN.judul
        `;
        return results.rows.map(row => ({
            judulLagu: row.judul_lagu,
            judulAlbum: row.judul_album,
            totalPlay: row.total_play,
            totalDownload: row.total_download,
            totalRoyalti: row.total_royalti
        }));
    } catch (err: any) {
        console.error("Failed to fetch Royalti:", err);
        throw new Error("Failed to fetch Royalti");
    }

}