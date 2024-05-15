"use server"
import { sql } from "@vercel/postgres";

export async function loginUser(email: string, password: string) {
    try {
        const { rows } = await sql`
        SELECT COUNT(*) FROM AKUN
        WHERE email=${email} AND password=${password}
        `;

        console.log(rows[0]);
     
        if (rows[0].count == 1) {
            const roles: ('' | 'pengguna' | 'podcaster' | 'songwriter' | 'artist' | 'premium')[] = [];

            const [artist, premium, songwriter, podcaster] = await Promise.all([
                sql`SELECT COUNT(*) FROM ARTIST WHERE email_akun=${email}`,
                sql`SELECT COUNT(*) FROM PREMIUM WHERE email=${email}`,
                sql`SELECT COUNT(*) FROM SONGWRITER WHERE email_akun=${email}`,
                sql`SELECT COUNT(*) FROM PODCASTER WHERE email=${email}`,
            ]);

            if (artist.rows[0].count > 0) {
                roles.push('artist');
            }
            if (songwriter.rows[0].count > 0) {
                roles.push('songwriter');
            }
            if (podcaster.rows[0].count > 0) {
                roles.push('podcaster');
            }
            if (premium.rows[0].count > 0) {
                roles.push('premium');
            }

            if (roles.length > 0) {
                roles.push('pengguna');
            }

            return { roles, idLabel: '' };
        }

        const labelResult = await sql`
          SELECT id FROM LABEL
          WHERE email=${email} AND password=${password}
        `;

        if (labelResult.rows.length > 0) {
            return { roles: ['label'], idLabel: labelResult.rows[0].id };
        }
        return null;

    } catch (error: any) {
        console.error("Failed todawdwadwa login:", error);
        throw error;
    }
}
