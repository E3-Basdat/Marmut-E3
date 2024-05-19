"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { playPlaylist, tambahPlayPlaylist, getAllPlaylists } from "@/app/actions/playPlaylist";
import { useAuth } from "@/app/contexts/AuthContext";

const PlayPlaylist = ({ params }: { params: { playPlaylistId: string } }) => {
    const router = useRouter();
    const { id } = useParams();
    const [playlistData, setPlaylistData] = useState<any>(null);
    const auth = useAuth();
    const email_user = auth.email;

    useEffect(() => {
        const fetchPlaylistData = async () => {
            try {
                const response = await playPlaylist(params.playPlaylistId);
                setPlaylistData(response);
            } catch (error) {
                console.error("Failed to fetch playlist:", error);
            }
        };

        fetchPlaylistData();
    }, [params.playPlaylistId]); // Add dependency to avoid calling the function on every render

    if (!playlistData) {
        return <div>Loading...</div>;
    }

    // Safely access the first element of playlistData array
    const { judul_playlist, nama_pembuat, deskripsi, jumlah_lagu, tanggal_dibuat, total_durasi, judul_lagu, id_song } = playlistData[0] || {};

    const handleShufflePlay = async () => {
        try {
            await tambahPlayPlaylist(nama_pembuat, params.playPlaylistId, email_user); // Ganti dengan parameter yang sesuai
        } catch (error) {
            console.error("Gagal menambahkan playlist untuk diputar:", error);
        }
    };

    return (
        <div className="flex min-h-screen bg-white text-white-100 flex-col items-center justify-center gap-16 font-bold p-48">
            <h1 className="text-3xl">User Playlist Detail</h1>
            
            <div className="flex flex-col justify-start w-full">
                <div className="mb-2 text-left"><span className="font-bold">Judul:</span> {judul_playlist}</div>
                <div className="mb-2 text-left"><span className="font-bold">Pembuat:</span> {nama_pembuat}</div>
                <div className="mb-2 text-left"><span className="font-bold">Jumlah Lagu:</span> {jumlah_lagu}</div>
                <div className="mb-2 text-left"><span className="font-bold">Total Durasi:</span> {total_durasi}</div>
                <div className="mb-2 text-left"><span className="font-bold">Tanggal Dibuat:</span> {tanggal_dibuat ? new Date(tanggal_dibuat).toDateString() : ''}</div>
                <div className="mb-2 text-left"><span className="font-bold">Deskripsi:</span> {deskripsi}</div>
                <button onClick={handleShufflePlay} className="bg-green-500 hover:bg-green-700 text-white font-semibold rounded-lg py-4 w-1/4">
                    Shuffle Play
                </button>
            </div>

            <table className="table-fixed w-full">
                <thead>
                    <tr>
                        <th className="w-1/4 px-4 py-2">Judul</th>
                        <th className="w-1/4 px-4 py-2">Oleh</th>
                        <th className="w-1/4 px-4 py-2">Durasi</th>
                        <th className="w-1/4 px-4 py-2">Atur Lagu</th>
                    </tr>
                </thead>
                <tbody>
                    {playlistData.map((song: any, index: number) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{song.judul_lagu}</td>
                            <td className="border px-4 py-2">{song.nama_penyanyi}</td>
                            <td className="border px-4 py-2">{song.durasi}</td>
                            <td className="border px-4 py-2">
                                <button onClick={() => router.push(`/detail_lagu/${song.id_song}`)} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">Lihat</button>
                                <button onClick={() => router.push(`/play_song/${song.id_song}`)} className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded ml-2">Play</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PlayPlaylist;
