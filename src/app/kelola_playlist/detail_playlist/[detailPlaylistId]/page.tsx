"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { detailPlaylist } from "@/app/actions/kelolaPlaylist";
import { playPlaylist } from "@/app/actions/playPlaylist";

const PlayPlaylist = ({ params }: { params: { detailPlaylistId: string } }) => {
    const router = useRouter();
    const { id } = useParams();
    const [playlistData, setPlaylistData] = useState<any>(null);

    useEffect(() => {
        const fetchPlaylistData = async () => {
            try {
                const response = await detailPlaylist(params.detailPlaylistId);
                setPlaylistData(response);
                console.log(response);
            } catch (error) {
                console.error("Failed to fetch playlist:", error);
            }
        };

        fetchPlaylistData();
    });

    if (!playlistData) {
        return <div>Loading...</div>;
    }

    const { judul_playlist, nama_pembuat, deskripsi, jumlah_lagu, tanggal_dibuat, total_durasi } = playlistData[0];
    


    return (
        <div className="flex min-h-screen bg-white text-white-100 flex-col items-center justify-center gap-16 font-bold p-48">
            <h1 className="text-3xl">User Playlist Detail</h1>
            
            <div className="flex flex-col justify-start w-full">
                <div className="mb-2 text-left"><span className="font-bold">Judul:</span> {judul_playlist}</div>
                <div className="mb-2 text-left"><span className="font-bold">Pembuat:</span> {nama_pembuat}</div>
                <div className="mb-2 text-left"><span className="font-bold">Jumlah Lagu:</span> {jumlah_lagu}</div>
                <div className="mb-2 text-left"><span className="font-bold">Total Durasi:</span> {total_durasi}</div>
                <div className="mb-2 text-left"><span className="font-bold">Tanggal Dibuat:</span> {tanggal_dibuat.toString()}</div>
                <div className="mb-2 text-left"><span className="font-bold">Deskripsi:</span> {deskripsi}</div>
                <button className="bg-green-500 hover:bg-green-700 text-white font-semibold rounded-lg py-4 w-1/4">
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
                            <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">Lihat</button>
                            <button className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded ml-2">Play</button>
                            <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded ml-2">Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex flex-col gap-8 w-full justify-center items-center">
                <button onClick={() => router.push('/kelola_playlist/detail_playlist/tambah_lagu')} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg py-4 w-1/4">
                    Tambah Lagu
                </button>
                <button onClick={() => router.push('/kelola_playlist')} className="bg-gray-500 hover:bg-gray-700 text-white font-semibold rounded-lg py-4 w-1/4">
                    Kembali
                </button>
            </div>
        </div>
    );
}

export default PlayPlaylist;
