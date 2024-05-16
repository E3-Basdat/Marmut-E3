"use server"
import { sql } from "@vercel/postgres";

export async function fetchJudulAlbum(): Promise<string[]> {
    const results = await sql`SELECT judul FROM ALBUM`;
    return results.rows.map(row => row.judul as string);
}

export async function fetchLabelAlbum(): Promise<string[]> {
    const results = await sql`SELECT L.nama FROM LABEL L, ALBUM A WHERE A.id_label = L.id`;
    return results.rows.map(row => row.nama as string);
}

export async function fetchJumlahLagu(): Promise<string[]> {
    const results = await sql`SELECT `;
    return results.rows.map(row => row.jumlah_lagu as string);
}

export async function fetchTotalDurasi(): Promise<string[]> {
    const results = await sql`SELECT `;
    return results.rows.map(row => row.total_durasi as string);
}

export async function deleteAlbum() {
    try {
        const result = await sql`DELETE FROM ALBUM WHERE id = ${}`;
    } catch (err: any) {
        console.error("Failed to fetch album:", err);
    }
}