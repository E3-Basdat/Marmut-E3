"use server"
import { sql } from "@vercel/postgres";

export async function getRoyaltiArtist(email: string) {
    try {
        const results = await sql`
        SELECT 
            KONTEN.judul AS Judul_Lagu,
            ALBUM.judul AS Judul_Album,
            SONG.total_play AS Total_Play,
            SONG.total_download AS Total_Download,
            (PEMILIK_HAK_CIPTA.rate_royalti * SONG.total_play) AS Total_Royalti_Didapat
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
            judulLagu: row.Judul_Lagu,
            judulAlbum: row.Judul_Album,
            totalPlay: row.Total_Play,
            totalDownload: row.Total_Download,
            totalRoyalti: row.Total_Royalti_Didapat
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
            KONTEN.judul AS Judul_Lagu,
            ALBUM.judul AS Judul_Album,
            SONG.total_play AS Total_Play,
            SONG.total_download AS Total_Download,
            (PEMILIK_HAK_CIPTA.rate_royalti * SONG.total_play) AS Total_Royalti_Didapat
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
            judulLagu: row.Judul_Lagu,
            judulAlbum: row.Judul_Album,
            totalPlay: row.Total_Play,
            totalDownload: row.Total_Download,
            totalRoyalti: row.Total_Royalti_Didapat
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
            KONTEN.judul AS Judul_Lagu,
            ALBUM.judul AS Judul_Album,
            SONG.total_play AS Total_Play,
            SONG.total_download AS Total_Download,
            (PEMILIK_HAK_CIPTA.rate_royalti * SONG.total_play) AS Total_Royalti_Didapat
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
            LABEL.email = ${email}
        GROUP BY 
            KONTEN.judul, ALBUM.judul
        ORDER BY 
            KONTEN.judul
        `;
        return results.rows.map(row => ({
            judulLagu: row.Judul_Lagu,
            judulAlbum: row.Judul_Album,
            totalPlay: row.Total_Play,
            totalDownload: row.Total_Download,
            totalRoyalti: row.Total_Royalti_Didapat
        }));
    } catch (err: any) {
        console.error("Failed to fetch Royalti:", err);
        throw new Error("Failed to fetch Royalti");
    }

}