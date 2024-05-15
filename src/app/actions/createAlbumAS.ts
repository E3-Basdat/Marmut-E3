"use server"
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from 'uuid';

export async function fetchLabelNames(): Promise<string[]> {
    const results = await sql`SELECT nama FROM label`;
    return results.rows.map(row => row.nama as string);
}

export async function createAlbumAS(formData: FormData) {
    const judul = formData.get('judul') as string;
    const labelName = formData.get('label') as string;
    const labelId = await getLabelIdByName(labelName);
    if (!labelId) {
        throw new Error("Label not found.");
    }

    try {
        const newAlbumId = uuidv4();
        await sql`
            INSERT INTO ALBUM (
                id, 
                judul, 
                id_label
            ) VALUES (
                ${newAlbumId}, 
                ${judul}, 
                ${labelId}
            )
        `;
    } catch (err: any) {
        console.error("Failed to create album:", err);
    }
}

async function getLabelIdByName(labelName: string): Promise<string> {
    const result = await sql`
        SELECT id 
        FROM label 
        WHERE nama = ${labelName}
    `;

    if (result.rowCount === 0) {
        throw new Error(`Label "${labelName}" not found.`);
    }
    return result.rows[0].id as string;
}