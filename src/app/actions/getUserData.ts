"use server"
import { sql } from "@vercel/postgres";


export async function getUserData(roles:string[],email:string) {

    const userInfo = !roles.includes("label") ? 
    (await sql`
    SELECT * FROM akun WHERE email = ${email}
    `).rows[0] : 
    (await sql`
    SELECT * FROM label WHERE email = ${email}
    `).rows[0];
    return userInfo;
}