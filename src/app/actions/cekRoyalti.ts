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
            KONTEN.judul;
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
            LABEL
        INNER JOIN 
            SONG ON LABEL.id = SONG.id_label
        INNER JOIN 
            KONTEN ON SONG.id_konten = KONTEN.id
        INNER JOIN 
            ALBUM ON SONG.id_album = ALBUM.id
        INNER JOIN 
            PEMILIK_HAK_CIPTA ON LABEL.id_pemilik_hak_cipta = PEMILIK_HAK_CIPTA.id
        WHERE 
            SONGWRITER.email_akun = ${email} 
        ORDER BY 
            KONTEN.judul;
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
            SONG ON LABEL.id = SONG.id_label
        INNER JOIN 
            KONTEN ON SONG.id_konten = KONTEN.id
        INNER JOIN 
            ALBUM ON SONG.id_album = ALBUM.id
        INNER JOIN 
            PEMILIK_HAK_CIPTA ON LABEL.id_pemilik_hak_cipta = PEMILIK_HAK_CIPTA.id
        WHERE 
            LABEL.email = ${email} 
        ORDER BY 
            KONTEN.judul;
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