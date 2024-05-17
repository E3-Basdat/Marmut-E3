"use client";
import React, { useState } from "react";
import { ubahPlaylist } from "@/app/actions/kelolaPlaylist";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const UbahPlaylist= ({ params }: { params: { ubahPlaylistId: string } }) => {
    const [judulPlaylist, setJudulPlaylist] = useState<string>("");
    const [deskripsiPlaylist, setDeskripsiPlaylist] = useState<string>("");
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);


        try {
            await ubahPlaylist(formData,params.ubahPlaylistId);
            console.log("FormData:", formData);
            console.log("Judul:", judulPlaylist);
            console.log("Deskripsi:", deskripsiPlaylist);
            toast.success("Playlist updated successfully");
            setJudulPlaylist("");
            setDeskripsiPlaylist("");
            router.back();

        } catch (err) {
            toast.error("Failed to update playlist");
            throw new Error(`Error: ${err}`);
            
        }
    };

    return (
        <div className='flex flex-col text-white-100 text-center items-center gap-16 px-8 py-32 bg-white font-bold min-h-screen '>
            <h1 className="text-3xl font-bold mb-8">Ubah Playlist</h1>
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="judul" className="block text-white-100 font-bold mb-2">Judul</label>
                    <input
                        type="text"
                        id="judul"
                        name="judul"
                        value={judulPlaylist}
                        onChange={(e) => setJudulPlaylist(e.target.value)}
                        placeholder="Masukkan judul..."
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="deskripsi" className="block text-white-100 font-bold mb-2">Deskripsi</label>
                    <textarea
                        id="deskripsi"
                        name="deskripsi"
                        value={deskripsiPlaylist}
                        onChange={(e) => setDeskripsiPlaylist(e.target.value)}
                        placeholder="Masukkan deskripsi..."
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                    ></textarea>
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                    
                </div>
            </form>
        </div>
    );
};

export default UbahPlaylist;
