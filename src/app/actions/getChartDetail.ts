"use server"
import { sql } from "@vercel/postgres";


export async function getChartId(chartName: string) {
    const { rows } = await sql`
    SELECT id_playlist
    FROM chart
    WHERE tipe = ${chartName}
`;
    return rows[0].id_playlist;
}


export async function getDaftarLaguChart(chartId: string) {
    const { rows } = await sql`
    SELECT total_play
    FROM SONG
    WHERE id_konten= ${chartId}
`;
    console.log(rows[0])

//     const artist = await sql`
//     SELECT email_akun
//     FROM ARTIST
//     WHERE id_artist = ${rows[0].id_artist}
// `;

//     const artistName = await sql`
//     SELECT nama
//     FROM AKUN
//     WHERE email = ${artist.rows[0].email_akun}
// `;

//     return {
//         judul_lagu: rows[0].judul_lagu,
//         nama_artist: artistName.rows[0].nama,
//         total_play: rows[0].total_play
//     };

}