"use server"
import { sql } from "@vercel/postgres";


export async function getSongWriterName(email: string) {
    console.log(email);
    const { rows } = await sql`
    SELECT nama
    FROM akun
    WHERE email= ${email}
`;
console.log(rows);
    return rows[0].nama;
}


export async function getSonglabelName(email: string) {
    console.log(email);
    const { rows } = await sql`
    SELECT nama
    FROM akun
    WHERE email= ${email}
`;
    return rows[0].nama;
}