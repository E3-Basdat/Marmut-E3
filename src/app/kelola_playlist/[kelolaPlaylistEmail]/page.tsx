"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { showPlaylist,hapusPlaylist } from "@/app/actions/kelolaPlaylist";



const kelola_playlist = ({ params }: { params: { kelolaPlaylistEmail: string } }) => {
    const router = useRouter();
    const [playlistData, setPlaylistData] = useState<any>(null);
    
        useEffect(() => {
            const fetchPlaylistData = async () => {
                try {
                    console.log("tes");
                    const response = await showPlaylist(params.kelolaPlaylistEmail);
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
    
        const { judul_playlist,jumlah_lagu, durasi } = playlistData[0];
        
        const handleDelete = async (id: string) => {
            try {
                await hapusPlaylist(id);
                const updatedPlaylist = await showPlaylist(params.kelolaPlaylistEmail);
                setPlaylistData(updatedPlaylist);
            } catch (error) {
                console.error("Failed to delete playlist:", error);
            }
        };
    
        if (!playlistData) {
            return <div>Loading...</div>;
        }

    
    return (
        <div className="flex min-h-screen bg-white text-white-100 flex-col items-center gap-16 font-bold p-48">
            <h1 className="text-3xl">User Playlist</h1>
            <table className="table-fixed w-full">
                <thead>
                    <tr>
                        <th className="w-1/4 px-4 py-2">Judul</th>
                        <th className="w-1/4 px-4 py-2">Jumlah Lagu</th>
                        <th className="w-1/4 px-4 py-2">Total Durasi</th>
                        <th className="w-1/4 px-4 py-2">Edit Playlist</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {playlistData.map((song: any, index: number) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{song.judul_playlist}</td>
                            <td className="border px-4 py-2">{song.jumlah_lagu}</td>
                            <td className="border px-4 py-2">{song.total_durasi}</td>
                            <td className="border px-4 py-2">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">Detail</button>
                            <button className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded ml-2">Ubah</button>
                            <button  onClick={() =>handleDelete(song.id)} className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded ml-2">Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex flex-col gap-8 w-full justify-center items-center">
                <button onClick={() => router.push('/kelola_playlist/tambah_playlist')} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg py-4 w-1/4">
                    Tambah Playlist
                </button>
            </div>
        </div>
    );
}

export default kelola_playlist;