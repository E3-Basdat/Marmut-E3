"use server"
import { sql } from "@vercel/postgres";

export async function getAllPaket() {
    try {
        const result = await sql`SELECT * FROM paket`;
        return result;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}

export async function premiumSubscription(formData:FormData){
    const email = formData.get('email') as string;
    
    try{ 
        const result = await sql`INSERT INTO PREMIUM VALUES(${email})`;
        return result;
    }
    catch(err){
        throw new Error(`Error: ${err}`);
    }
}

export async function registerTransaction(formData:FormData) {
    /* MENYUSUUL */
}