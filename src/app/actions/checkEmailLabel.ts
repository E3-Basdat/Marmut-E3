"use server"

import { sql } from "@vercel/postgres"

export async function CheckEmailLabel(email: string) {
    const { rows } = await sql`
    SELECT COUNT(*)
    FROM label
    WHERE email = ${email}
`;
    return rows[0].count > 0;
}