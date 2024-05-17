"use client"; 
import React, { useState, useEffect } from "react";
import { listLagu, tambahLagu, cariIdLagu, cariIdPlaylist } from "@/app/actions/kelolaPlaylist";

const TambahLagu = ({ params }: { params: { tambahLaguId: string } }) => {
    const [selectedSong, setSelectedSong] = useState<string>("");
    const [songs, setSongs] = useState<string[]>([]);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const data = await listLagu();
                if (data) {
                    const songList = data.map((song: any) => `${song.judul_lagu} - ${song.nama_penyanyi}`);
                    setSongs(songList);
                }
            } catch (error) {
                console.error("Failed to fetch songs:", error);
            }
        };

        fetchSongs();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Lagu yang dipilih:", selectedSong);

        const [judulLagu] = selectedSong.split(" - ");

        try {
            const id_konten = await cariIdLagu(judulLagu);
            const id_playlist = await cariIdPlaylist(params.tambahLaguId);
            await tambahLagu(id_playlist, id_konten);
            console.log("Lagu berhasil ditambahkan.");
        } catch (error) {
            console.error("Gagal menambahkan lagu:", error);
        }
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
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
                        style={{ color: 'white' }}
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
