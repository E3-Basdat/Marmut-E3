"use client"
import React, { useState } from "react";
import { registerUser } from "@/app/actions/register";
const Pengguna: React.FC = () => {
    const[gender, setGender] = useState<string>("")
    const[tanggal_lahir, setTanggalLahir] = useState<string>("")


    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let genderValue: number;
        if (gender === "laki-laki") {
            genderValue = 0;
        }
        else {
            genderValue = 1;
        }
        const formData = new FormData(event.target as HTMLFormElement);

        console.log(formData.get('tanggal_lahir'))
        console.log(formData.get('gender'))
        console.log(formData.get('is_podcaster'))   
        console.log(formData.get('is_artist'))
        console.log(formData.get('is_songwriter'))

        try{
            await registerUser(formData);
        }

        catch(err){
            throw new Error(`Error: ${err}`);
        }
        
        
    };

   

    return (
        <div className='flex flex-col text-white-100 text-center items-center gap-16 px-8 py-32 bg-white font-bold min-h-screen '>
            <h1 className="text-3xl">Register Form Pengguna</h1>
            <form className='flex flex-col w-1/2' onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <input type="email" placeholder="Email" name="email" className="text-black border-2 border-gray-200 rounded-lg w-full py-4 px-4" />
                </div>

                <div className='mb-4'>
                    <input type="password" placeholder="Password" name="password" className="text-black border-2 border-gray-200 rounded-lg w-full py-4 px-4" />
                </div>
                <div className='mb-4'>
                    <input type="text" placeholder="Nama" name="nama" className="text-black border-2 border-gray-200 rounded-lg w-full py-4 px-4" />
                </div>

                <div className='mb-4'>
                    <select name="gender" value={gender} onChange={(e) => setGender(e.target.value)} className={`font-bold ${gender ? 'text-black' : 'text-gray-400'} border-2 border-gray-200 rounded-lg w-full py-4 px-3`}>
                        <option value="">Jenis Kelamin</option>
                        <option value="laki-laki" className="text-black">Laki-laki</option>
                        <option value="perempuan" className="text-black">Perempuan</option>
                    </select>
                </div>

                <div className='mb-4'>
                    <input type="text" placeholder="Tempat Lahir" name="tempat_lahir" className="text-black border-2 border-gray-200 rounded-lg w-full py-4 px-4" />
                </div>

                <div className='mb-4'>
                    <input type="date" name="tanggal_lahir" placeholder="Tanggal Lahir" value={tanggal_lahir} onChange={(e) => setTanggalLahir(e.target.value)} className={`font-bold ${tanggal_lahir ? 'text-black' : 'text-gray-400'} border-2 border-gray-200 rounded-lg w-full py-4 px-4`} />
                </div>

                <div className='mb-4'>
                    <input type="text" placeholder="Kota Asal" name="kota_asal" className="text-black border-2 border-gray-200 rounded-lg w-full py-4 px-4" />
                </div>

                <p className="text-left text-lg mt-8 mb-4">Role:</p>
                <div className="flex flex-col gap-4 mb-4">
                    <div className="flex flex-row gap-4">
                        <input type="checkbox" name="is_podcaster" />
                        <label>Podcaster</label>
                    </div>
                    <div className="flex flex-row gap-4">
                        <input type="checkbox" name="is_artist"  />
                        <label>Artist</label>
                    </div>
                    <div className="flex flex-row gap-4">
                        <input type="checkbox" name="is_songwriter"/>
                        <label>Songwriter</label>
                    </div>
                </div>

                <div className='flex flex-row gap-4 justify-center'>
                    <button type="submit" className="bg-green-100  text-white-100 font-semibold rounded-lg w-1/4 py-4 mt-4">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Pengguna;
