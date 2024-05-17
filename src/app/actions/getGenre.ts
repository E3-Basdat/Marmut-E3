"use server"

import { sql } from "@vercel/postgres"

export async function getGenre() {
    try {
        const { rows } = await sql`SELECT DISTINCT genre FROM genre ORDER BY genre ASC`;
        return rows;
    } catch (error) {
        console.error('Error fetching genres:', error);
        throw new Error('Could not fetch genres');
    }
}