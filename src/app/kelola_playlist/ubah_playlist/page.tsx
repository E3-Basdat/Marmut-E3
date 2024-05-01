"use client";
import React, { useState } from "react";

const UbahPlaylist : React.FC = () => {
    const [judulPlaylist, setJudulPlaylist] = useState<string>("");
    const [deskripsiPlaylist, setDeskripsiPlaylist] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);

        console.log("Judul:", judulPlaylist);
        console.log("Deskripsi:", deskripsiPlaylist);
        setJudulPlaylist("");
        setDeskripsiPlaylist("");

        try {
            // Lakukan apa yang diperlukan dengan formData, seperti mengirimnya ke server
            console.log("FormData:", formData);
        } catch (err) {
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
