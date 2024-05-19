"use server"
import { sql } from '@vercel/postgres'

export async function fetchAlbumName(idAlbum: string): Promise<string[]> {
    const results = await sql`SELECT judul FROM ALBUM WHERE id = ${idAlbum}`;
    return results.rows.map(row => row.judul as string);
}

export async function fetchSongs(idAlbum: string) {
    try {
        const results = await sql`
        SELECT 
            k.id,
            k.judul,
            k.durasi,
            SUM(s.total_play) AS total_play,
            SUM(s.total_download) AS total_download 
        FROM 
            konten k 
        JOIN 
            song s 
        ON 
            k.id = s.id_konten 
        WHERE 
            s.id_album = ${idAlbum} 
        GROUP BY 
            k.id, k.judul, k.durasi
        `;
        return results.rows.map(row => ({
            idKonten: row.id,
            judulKonten: row.judul,
            durasiKonten: row.durasi,
            totalPlaySong: row.total_play,
            totalDownloadSong: row.total_download
        }));
    } catch (err: any) {
        console.error("Failed to fetch Album:", err);
        throw new Error("Failed to fetch Album");
    }
}

export async function deleteSong(idKonten: string) {
    try {
        const result = await sql`
        DELETE FROM KONTEN 
        WHERE id = ${idKonten}
        `;
        if (result.rowCount === 0) {
            throw new Error('No song found to delete.');
        }
        return { success: true, message: "Song deleted successfully" };
    } catch (err: any) {
        console.error("Failed to delete song:", err);
        throw new Error("Failed to delete song");
    }
}