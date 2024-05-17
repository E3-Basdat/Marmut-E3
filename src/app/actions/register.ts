"use server"
import { sql } from "@vercel/postgres";


export async function registerUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const nama = formData.get('nama') as string;
  const gender = formData.get('gender') as string;
  const tempat_lahir = formData.get('tempat_lahir') as string;
  const tanggal_lahir = formData.get('tanggal_lahir') as string;
  const kota_asal = formData.get('kota_asal') as string;
  const isPodcaster = formData.get('is_podcaster') === 'on';
  const isArtist = formData.get('is_artist') === 'on';
  const isSongwriter = formData.get('is_songwriter') === 'on';

  const genderValue = gender === 'laki-laki' ? 1 : 0;

  try {
    
    if (isArtist || isSongwriter || isPodcaster) {
      await sql`
      INSERT INTO AKUN (email, password, nama, gender, tempat_lahir, tanggal_lahir, is_verified, kota_asal)
      VALUES (${email}, ${password}, ${nama}, ${genderValue}, ${tempat_lahir}, ${tanggal_lahir}, true, ${kota_asal})
      `;
    } else {
      await sql`
      INSERT INTO AKUN (email, password, nama, gender, tempat_lahir, tanggal_lahir, is_verified, kota_asal)
      VALUES (${email}, ${password}, ${nama}, ${genderValue}, ${tempat_lahir}, ${tanggal_lahir}, false, ${kota_asal})
      `;
    }
    
    if (isPodcaster) {
      await sql`
      INSERT INTO PODCASTER (email)
      VALUES (${email})
      `;
    }
    
    if (isArtist || isSongwriter) {
      const { rows } = await sql`
      INSERT INTO PEMILIK_HAK_CIPTA (id, rate_royalti)
      VALUES (gen_random_uuid(), 0)
      RETURNING id
      `;
      
      if (isArtist) {
        await sql`
        INSERT INTO ARTIST (id, email_akun, id_pemilik_hak_cipta)
        VALUES (gen_random_uuid(), ${email}, ${rows[0].id})
        `;
      }
      
      if (isSongwriter) {
        await sql`
        INSERT INTO SONGWRITER (id, email_akun, id_pemilik_hak_cipta)
        VALUES (gen_random_uuid(), ${email}, ${rows[0].id})
        `;
      }
      await sql`
        INSERT INTO NONPREMIUM VALUES (${email}),
      `;
    }
    
  } catch (err: any) {
    console.error("Failed to register user:", err);
  }
}


export async function registerLabel(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const nama = formData.get("nama") as string;
    const kontak = formData.get("kontak") as string;

    const { rows } = await sql`
        INSERT INTO PEMILIK_HAK_CIPTA (id, rate_royalti)
        VALUES (gen_random_uuid(), 0)
        RETURNING id
        `;

    await sql`
        INSERT INTO LABEL (id, id_pemilik_hak_cipta, email, password, nama, kontak)
        VALUES (gen_random_uuid(), ${rows[0].id}, ${email}, ${password}, ${nama}, ${kontak})
        `;

  } catch (error: any) {
    console.error("Failed to register label:", error.message || error);
  }
}