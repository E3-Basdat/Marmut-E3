"use server"

import { sql } from "@vercel/postgres"

export async function CreateEpisode(title:string, description:string, duration:string, id_podcast:string) {

    const intDuration = parseInt(duration);
    await sql`
    INSERT INTO EPISODE(id_episode, id_konten_podcast, judul, deskripsi, durasi, tanggal_rilis)
    VALUES (gen_random_uuid(), ${id_podcast}, ${title}, ${description}, ${intDuration}, NOW())
    `;
}