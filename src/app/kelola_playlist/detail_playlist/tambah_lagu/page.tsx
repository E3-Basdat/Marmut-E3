
"use client";
import React, { useState } from "react";

const TambahLagu: React.FC = () => {
    const [selectedSong, setSelectedSong] = useState<string>("");

    const songs = ["Sparks Now", "Dear John", "The Story of Us"];

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Lagu yang dipilih:", selectedSong);
        
    };

    return (
        <div className="flex min-h-screen bg-white text-white-100 flex-col items-center justify-center gap-16 font-bold p-48">
            <h1 className="text-3xl font-bold mb-8 text-white">Tambah Lagu</h1>
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="song" className="block text-white font-bold mb-2">Pilih Lagu</label>
                    <select
                        id="song"
                        name="song"
                        value={selectedSong}
                        onChange={(e) => setSelectedSong(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Pilih Lagu...</option>
                        {songs.map((song, index) => (
                            <option key={index} value={song}>{song}</option>
                        ))}
                    </select>
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

export default TambahLagu;
