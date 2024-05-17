"use server"

import { sql } from "@vercel/postgres"

export async function getLaguArtist(email: string) {
    try {
        const { rows } = await sql`
        SELECT
        k.judul AS judul_lagu, k.tanggal_rilis AS tanggal_rilis, k.tahun, k.durasi
    FROM ARTIST a
    JOIN SONG s ON a.id = s.id_artist
    JOIN KONTEN k ON s.id_konten = k.id
    WHERE a.email_akun = ${email};
    
        `;
        return rows;
    } catch (error) {
        console.error('Error fetching lagu:', error);
        throw new Error('Could not fetch lagu');
    }
}