"use server"

import { sql } from "@vercel/postgres"

export async function getWriterArtist(email: string) {
    try {
        const { rows } = await sql`
        SELECT
        k.judul AS judul_lagu, k.tanggal_rilis AS tanggal_rilis, k.tahun, k.durasi
        FROM SONGWRITER sw
        JOIN SONGWRITER_WRITE_SONG s ON sw.id = s.id_songwriter
        JOIN KONTEN k ON k.id = s.id_song
        WHERE sw.email_akun = ${email};
    
        `;
        return rows;
    } catch (error) {
        console.error('Error fetching writer lagu:', error);
        throw new Error('Could not fetch writer lagu');
    }
}