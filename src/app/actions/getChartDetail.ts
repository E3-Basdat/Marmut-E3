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

export async function getChartName(chartId: string) {
    const { rows } = await sql`
    SELECT tipe
    FROM chart
    WHERE id_playlist = ${chartId}
    `;

    return rows[0].tipe;
}

export async function getDaftarLaguChart(chartId: string) {
    const tipe = await getChartName(chartId);
    let dateTruncUnit = 'day';

    switch (tipe) {
        case 'Daily Top 20':
            dateTruncUnit = 'day';
            break;
        case 'Weekly Top 20':
            dateTruncUnit = 'week';
            break;
        case 'Monthly Top 20':
            dateTruncUnit = 'month';
            break;
        case 'Yearly Top 20':
            dateTruncUnit = 'year';
            break;
        default:
            throw new Error(`Invalid chart type.`);
    }
    const { rows } = await sql`
    SELECT
    s.id_konten AS id_song,
    k.judul AS "judul_lagu",
    ak.nama AS "artist",
    k.tanggal_rilis AS "tanggal_rilis",
    COUNT(*) AS play_count
    FROM
    akun_play_song aps
    JOIN SONG s ON aps.id_song = s.id_konten
    JOIN KONTEN k ON s.id_konten = k.id
    JOIN ARTIST a ON s.id_artist = a.id
    JOIN AKUN ak ON a.email_akun = ak.email
    WHERE
    DATE_TRUNC(${dateTruncUnit}, aps.waktu) = DATE_TRUNC(${dateTruncUnit}, CURRENT_DATE)
    GROUP BY
    s.id_konten, k.judul, ak.nama, k.tanggal_rilis
    HAVING
    COUNT(*) > 0 
    ORDER BY
    COUNT(*) DESC
    LIMIT
    20;

    `;
    return rows;
}