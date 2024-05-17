"use client"
import React, { useState } from "react";
import { registerUser } from "@/app/actions/register";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const Pengguna: React.FC = () => {
    const[gender, setGender] = useState<string>("")
    const[tanggal_lahir, setTanggalLahir] = useState<string>("")
    const router = useRouter();
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

        try{
            await registerUser(formData);
            toast.success("User registered successfully");
            router.replace("/auth/login");
        }

        catch(err){
            toast.error("Failed to register")
        }
        
        
    };

    return (
        <div className='flex flex-col text-white-100 text-center items-center gap-16 px-8 py-32 bg-white font-bold min-h-screen '>
            <h1 className="text-3xl">Register Form Pengguna</h1>
            <form className='flex flex-col w-1/2 text-left' onSubmit={handleSubmit}>
                <div className='mb-4 '>
                    <label>Email</label>
                    <input type="email" placeholder="Email" name="email" className="bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4" />
                </div>

                <div className='mb-4'>
                    <label>Password</label>
                    <input type="password" placeholder="Password" name="password" className="bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4" />
                </div>
                <div className='mb-4'>
                    <label>Nama</label>
                    <input type="text" placeholder="Nama" name="nama" className="bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4" />
                </div>

                <div className='mb-4'>
                    <label>Jenis Kelamin</label>
                    <select name="gender" value={gender} onChange={(e) => setGender(e.target.value)} className={`font-bold ${gender ? 'text-white-100' : 'text-gray-400'} select-box bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-3`}>
                        <option value="">Jenis Kelamin</option>
                        <option value="laki-laki" className="text-white-100">Laki-laki</option>
                        <option value="perempuan" className="text-white-100">Perempuan</option>
                    </select>
                </div>

                <div className='mb-4'>
                <label>Tempat Lahir</label>
                    <input type="text" placeholder="Tempat Lahir" name="tempat_lahir" className="bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4" />
                </div>

                <div className='mb-4'>
                <label>Tanggal Lahir</label>
                    <input type="date" name="tanggal_lahir" placeholder="Tanggal Lahir" value={tanggal_lahir} onChange={(e) => setTanggalLahir(e.target.value)} className={`font-bold ${tanggal_lahir ? 'text-white-100' : 'text-gray-400'} bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4`} />
                </div>

                <div className='mb-4'>
                <label>Kota Asal</label>
                    <input type="text" placeholder="Kota Asal" name="kota_asal" className="bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4" />
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
                    <button type="submit" className="font-bold bg-green-100  text-white-100 rounded-lg w-1/4 py-4 mt-4">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Pengguna;
