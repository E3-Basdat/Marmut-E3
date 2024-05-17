"use server"
import { sql } from "@vercel/postgres";

export async function fetchAlbums() {
    try {
        const results = await sql`
            SELECT a.judul, l.nama, a.jumlah_lagu, a.total_durasi 
            FROM ALBUM a, LABEL l 
            WHERE A.id_label = L.id
        `;
        return results.rows.map(row => ({
            judul: row.judul,
            namaLabel: row.nama,
            jumlahLagu: row.jumlah_lagu,
            totalDurasi: row.total_durasi
        }));
    } catch (err: any) {
        console.error("Failed to fetch Album:", err);
        throw new Error("Failed to fetch Album");
    }
}

export async function getSelectedArtist() {
    
}

export async function getSelectedSongwriters() {

}

export async function deleteAlbum(judul: string) {
    try {
        const result = await sql`
        DELETE FROM ALBUM 
        WHERE judul = ${judul}
        `;
        if (result.rowCount === 0) {
            throw new Error('No album found to delete.');
        }
        return { success: true, message: "Album deleted successfully" };
    } catch (err: any) {
        console.error("Failed to delete album:", err);
        throw new Error("Failed to delete album");
    }
}