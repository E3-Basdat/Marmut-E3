"use server"

import { sql } from "@vercel/postgres"
import { v4 } from "uuid";

export async function CreatePodcast(formData: FormData) {
    const judul = formData.get("judul") as string;
    const genre = formData.getAll("genre") as string[];
    const email = formData.get("email") as string;
  
    const id = v4();
    try{
        await sql`
        INSERT INTO KONTEN(id, judul, durasi, tahun, tanggal_rilis)
        VALUES (${id}, ${judul}, 0, ${new Date().getFullYear()}, ${new Date().toISOString()})
        `
    
        await sql`
        INSERT INTO PODCAST(email_podcaster, id_konten)
        VALUES (${email}, ${id})
        `
    
        for (const g of genre) {
            await sql`
            INSERT INTO GENRE(id_konten, genre)
            VALUES (${id}, ${g})
            `
        }

    }catch(err){
        console.error("Error creating podcast:", err);
        throw new Error("Error creating podcast");
    }
}