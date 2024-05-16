"use server"
import { sql } from "@vercel/postgres";


export async function getPodcastGenre(podcastId: string) {
    const { rows } = await sql`
    SELECT genre
    FROM genre
    LEFT JOIN podcast ON genre.id_konten = podcast.id_konten 
    WHERE podcast.id_konten = ${podcastId}
`;
    if(rows.length > 0){
        return rows.map((row) => row.genre)
    }
}