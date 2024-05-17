"use server"
import { sql } from "@vercel/postgres";

export async function fetchAlbumsArtist(email: string) {
    try {
        const results = await sql`
        SELECT 
            a.id, a.judul, l.nama, a.jumlah_lagu, a.total_durasi 
        FROM 
            ALBUM a
        JOIN 
            LABEL l ON a.id_label = l.id
        JOIN 
            SONG s ON s.id_album = a.id
        JOIN 
            ARTIST art ON s.id_artist = art.id
        WHERE 
            art.email_akun = ${email}
        GROUP BY 
            a.id, a.judul, l.nama, a.jumlah_lagu, a.total_durasi
        `;
        return results.rows.map(row => ({
            id: row.id,
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

export async function fetchAlbumsSongwriter(email: string) {
    try {
        const results = await sql`
        SELECT 
            a.id, a.judul, l.nama, a.jumlah_lagu, a.total_durasi
        FROM 
            ALBUM a
        JOIN 
            LABEL l ON a.id_label = l.id
        JOIN 
            SONG s ON s.id_album = a.id
        JOIN 
            SONGWRITER_WRITE_SONG sws ON sws.id_song = s.id_konten
        JOIN 
            SONGWRITER sw ON sw.id = sws.id_songwriter
        WHERE 
            sw.email_akun = 'emily.brown@example.com' 
        GROUP BY 
            a.id, a.judul, l.nama, a.jumlah_lagu, a.total_durasi
        `;
        return results.rows.map(row => ({
            id: row.id,
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

export async function deleteAlbum(id: string) {
    try {
        const result = await sql`
        DELETE FROM ALBUM 
        WHERE id = ${id}
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