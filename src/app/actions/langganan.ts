"use server"
import { sql } from "@vercel/postgres";

export async function getAllPaket() {
    try {
        const result = await sql`SELECT * FROM paket;`;
        return result;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}

export async function getRiwayatLangganan(query:string) {
    try {
        const result = await sql`
        SELECT
            t.jenis_paket AS jenis,
            t.timestamp_dimulai AS tanggalMulai,
            t.timestamp_berakhir AS tanggalBerakhir,
            t.metode_bayar AS metodePembayaran,
            t.nominal AS nominal
        FROM
            TRANSACTION t
        WHERE
            t.email = ${query};
        `;
        return result;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}

export async function registerTransaction(formData:FormData) {
    /* MENYUSUUL */
}