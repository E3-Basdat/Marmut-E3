"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { detailPlaylist, getSongsInPlaylist, hapusPlaylist } from "@/app/actions/kelolaPlaylist";
import toast from "react-hot-toast";
import { tambahPlayPlaylist } from "@/app/actions/playPlaylist";
import { useAuth } from "@/app/contexts/AuthContext";

const PlayPlaylist = ({ params }: { params: { detailPlaylistId: string } }) => {
    const router = useRouter();
    const { id } = useParams();
    const [playlistDetails, setPlaylistDetails] = useState<any>(null);
    const [playlistSongs, setPlaylistSongs] = useState<any[]>([]);
    const auth = useAuth();
    const email_user = auth.email;

    useEffect(() => {
        const fetchPlaylistData = async () => {
            try {
                const detailsResponse = await detailPlaylist(params.detailPlaylistId);
                setPlaylistDetails(detailsResponse);
                const songsResponse = await getSongsInPlaylist(params.detailPlaylistId);
                setPlaylistSongs(songsResponse);
            } catch (error) {
                console.error("Failed to fetch playlist data:", error);
            }
        };

        fetchPlaylistData();
    }, [params.detailPlaylistId]);

    const handleDelete = async (id: string) => {
        try {
            await hapusPlaylist(id);
            const updatedSongs = await getSongsInPlaylist(params.detailPlaylistId);
            setPlaylistSongs(updatedSongs);
            toast.success("Song deleted");
        } catch (error) {
            console.error("Failed to delete song:", error);
        }
    };

    const handleShufflePlay = async () => {
        try {
            await tambahPlayPlaylist(nama_pembuat, params.detailPlaylistId, email_user); // Ganti dengan parameter yang sesuai
            console.log("Berhasil menambahkan playlist untuk diputar.");
        } catch (error) {
            console.error("Gagal menambahkan playlist untuk diputar:", error);
        }
    };

    if (!playlistDetails) {
        return <div>Loading...</div>;
    }

    const { judul_playlist, nama_pembuat, deskripsi, jumlah_lagu, tanggal_dibuat, total_durasi } = playlistDetails[0] || {};

    return (
        <div className="flex min-h-screen bg-white text-white-100 flex-col items-center justify-center gap-16 font-bold p-48">
            <h1 className="text-3xl">User Playlist Detail</h1>
            
            <div className="flex flex-col justify-start w-full">
                <div className="mb-2 text-left"><span className="font-bold">Judul:</span> {judul_playlist}</div>
                <div className="mb-2 text-left"><span className="font-bold">Pembuat:</span> {nama_pembuat}</div>
                <div className="mb-2 text-left"><span className="font-bold">Jumlah Lagu:</span> {jumlah_lagu}</div>
                <div className="mb-2 text-left"><span className="font-bold">Total Durasi:</span> {total_durasi}</div>
                <div className="mb-2 text-left"><span className="font-bold">Tanggal Dibuat:</span> {new Date(tanggal_dibuat).toDateString()}</div>
                <div className="mb-2 text-left"><span className="font-bold">Deskripsi:</span> {deskripsi}</div>
                <button onClick={handleShufflePlay} className="bg-green-500 hover:bg-green-700 text-white font-semibold rounded-lg py-4 w-1/4">
                    Shuffle Play
                </button>
            </div>

            {playlistSongs.length > 0 ? (
                <table className="table-fixed w-full">
                    <thead>
                        <tr>
                            <th className="w-1/4 px-4 py-2">Judul</th>
                            <th className="w-1/4 px-4 py-2">Atur Lagu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playlistSongs.map((song: any, index: number) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{song.judul_lagu}</td>
                                <td className="border px-4 py-2">
                                    <button onClick={() => router.push(`/detail_lagu/${song.id_song}`)} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">Lihat</button>
                                    <button onClick={() => router.push(`/play_song/${song.id_song}`)} className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded ml-2">Play</button>
                                    <button onClick={() => handleDelete(song.id_song)} className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded ml-2">Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center mt-8">Belum ada lagu</div>
            )}

            <div className="flex flex-col gap-8 w-full justify-center items-center mt-8">
                <button 
                    onClick={() => router.push(`/kelola_playlist/detail_playlist/tambah_lagu/${params.detailPlaylistId}`)} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg py-4 w-1/4"
                >
                    Tambah Lagu
                </button>
                <button 
                    onClick={() => router.back()}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-semibold rounded-lg py-4 w-1/4"
                >
                    Kembali
                </button>
            </div>
        </div>
    );
}

export default PlayPlaylist;
