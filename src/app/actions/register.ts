"use server"
import { sql } from "@vercel/postgres";

export async function registerUser(formData:FormData) {
    const email = formData.get('email') as string;    
    const password = formData.get('password') as string;
    const nama = formData.get('nama') as string;
    const gender = formData.get('gender') as string;
    const tempat_lahir = formData.get('tempat_lahir') as string;
    const tanggal_lahir = formData.get('tanggal_lahir') as string;
    const kota_asal = formData.get('kota_asal') as string;
    const isPodcaster = formData.get('isPodcaster') === 'on';
    const isArtist = formData.get('isArtist') === 'on';
    const isSongwriter = formData.get('isSongwriter') === 'on';
    const is_verified = false;

    const genderValue = gender === 'laki-laki' ? 0 : 1;
    
    try{
        const result = await sql`INSERT INTO akun (email, password, nama, gender, tempat_lahir, tanggal_lahir,is_verified, kota_asal) 
        VALUES (${email}, ${password}, ${nama}, ${genderValue}, ${tempat_lahir}, ${tanggal_lahir},${is_verified},${kota_asal})`;
        return result;
    }
    catch(err){
        throw new Error(`Error: ${err}`);
    }
}


