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

export async function getSpecifiedPaket(jenis : string){
    try{
        let jenis_paket = "0 Bulan"
        switch (jenis) {
            case '1':
                jenis_paket = "1 Bulan";
                break;
            case '3':
                jenis_paket = "3 Bulan";
                break;
            case '6 ':
                jenis_paket = "6 Bulan";
                break;
            case '12':
                jenis_paket = "1 Tahun";
                break;
        }
 
        const result = await sql`
        SELECT * FROM paket WHERE jenis = ${jenis_paket};
        `;
        return result
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

export async function registerTransaction(email: string, jenis: string, nominal: number, metode: string) {
    const mulai = new Date(); 
    let akhir = new Date(mulai); 

    switch (jenis) {
        case '1 Bulan':
            akhir.setMonth(akhir.getMonth() + 1);
            break;
        case '3 Bulan':
            akhir.setMonth(akhir.getMonth() + 3);
            break;
        case '6 Bulan':
            akhir.setMonth(akhir.getMonth() + 6);
            break;
        case '1 Tahun':
            akhir.setMonth(akhir.getMonth() + 12);
            break;
        default:
            throw new Error('Jenis paket tidak valid');
    }

    try {
        await sql`
        INSERT INTO TRANSACTION(id, jenis_paket, email, timestamp_dimulai, timestamp_berakhir, metode_bayar, nominal)
        VALUES(gen_random_uuid(), ${jenis}, ${email}, ${mulai.toISOString()}, ${akhir.toISOString()}, ${metode}, ${nominal})
        RETURNING id
        `;

        await sql`
        INSERT INTO PREMIUM VALUES(${email});
        `;

        await sql`
        DELETE FROM NONPREMIUM WHERE email = ${email};
        `;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}