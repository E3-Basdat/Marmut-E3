"use server"
import { sql } from "@vercel/postgres";


export async function getPodcastEpisode(podcastId: string) {
    const { rows } = await sql`
    SELECT id_episode,judul,deskripsi,durasi,tanggal_rilis
    FROM episode
    LEFT JOIN podcast ON episode.id_konten_podcast = podcast.id_konten 
    WHERE podcast.id_konten = ${podcastId}
`;
console.log(rows)
    return rows;
}