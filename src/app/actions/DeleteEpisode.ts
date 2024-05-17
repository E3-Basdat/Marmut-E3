"use server"

import { sql } from "@vercel/postgres"

export async function DeleteEpisode(id_episode:string) {
    await sql`DELETE FROM episode WHERE id_episode = ${id_episode}`;
}