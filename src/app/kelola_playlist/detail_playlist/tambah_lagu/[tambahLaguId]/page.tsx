"use client"; 
import React, { useState, useEffect } from "react";
import { listLagu, tambahLagu, cariIdLagu, cariIdPlaylist, cekPlaylist } from "@/app/actions/kelolaPlaylist";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


const TambahLagu = ({ params }: { params: { tambahLaguId: string } }) => {
    const [selectedSong, setSelectedSong] = useState<string>("");
    const [songs, setSongs] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const router = useRouter();

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

        const [judulLagu] = selectedSong.split(" - ");

        try {
            const fetch_id = await cariIdLagu(judulLagu);
            const id_playlist = await cariIdPlaylist(params.tambahLaguId);

            const { id_konten } = fetch_id;

            const isExist = await cekPlaylist(id_konten, params.tambahLaguId);
            

            if (isExist) {
                toast.error("Lagu sudah ada di dalam playlist.");
                return;
            }

            
            await tambahLagu(id_playlist, id_konten);
            toast.success("Lagu berhasil ditambahkan.");

            router.back()
        } catch (error) {
            console.error("Failed to add song:", error);
        }
    };

    return (
        <div className="flex min-h-screen bg-white text-white-100 flex-col items-center justify-center gap-16 font-bold p-48">
            <h1 className="text-3xl font-bold mb-8 text-white">Tambah Lagu</h1>
            {errorMessage && (
                <div className="bg-red-500 text-white font-bold py-2 px-4 mb-4 rounded">
                    {errorMessage}
                </div>
            )}
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
