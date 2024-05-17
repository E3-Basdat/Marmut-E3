"use server"

import { sql } from "@vercel/postgres"

export async function CheckEmailAkun(email: string) {
    const { rows } = await sql`
    SELECT COUNT(*)
    FROM akun
    WHERE email = ${email}
`;
    return rows[0].count > 0;
}