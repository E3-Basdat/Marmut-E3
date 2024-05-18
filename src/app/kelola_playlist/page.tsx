"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState, } from "react";
import { showPlaylist,hapusPlaylist,getAllPlaylists } from "@/app/actions/kelolaPlaylist";
import { useAuth } from "@/app/contexts/AuthContext";
import toast from "react-hot-toast";

const kelola_playlist : React.FC = () => {
    const router = useRouter();
    const [playlistData, setPlaylistData] = useState<any>(null);
    const auth = useAuth();
    const email = auth.email;
    const isAuthenticated = auth.isAuthenticated;
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded && !isAuthenticated) {
            router.push("/auth/login");
        }
    }, [isAuthenticated,isLoaded]);
    
        useEffect(() => {
            const fetchPlaylistData = async () => {
                try {
                    // const response = await showPlaylist(params.kelolaPlaylistEmail, email);
                    const response1 = await getAllPlaylists();
                    console.log(response1);
                    setPlaylistData(response1);
                    console.log(response1);
                } catch (error) {
                    console.error("Failed to fetch playlist:", error);
                }
            };
    
            fetchPlaylistData();
        },[email]);
    
        if (!playlistData) {
            return <div>Loading...</div>;
        }
    
        const { judul_playlist,jumlah_lagu, durasi, id_user_playlist } = playlistData[0];
        
        const handleDelete = async (id: string) => {
            try {
                await hapusPlaylist(id);
                const updatedPlaylist = await getAllPlaylists();
                setPlaylistData(updatedPlaylist);
                toast.success("Playlsit deleted");
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
                            <button onClick={() => router.push(`/kelola_playlist/detail_playlist/${song.id_user_playlist}`)} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">Detail</button>
                            <button onClick={() => router.push(`/kelola_playlist/ubah_playlist/${song.id_user_playlist}`)}className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded ml-2">Ubah</button>
                            <button  onClick={() =>handleDelete(song.id_user_playlist)} className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded ml-2">Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex flex-col gap-8 w-full justify-center items-center">
                <button onClick={() => router.push('/kelola_playlist/tambah_playlist/${id}')} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg py-4 w-1/4">
                    Tambah Playlist
                </button>
            </div>
        </div>
    );
}

export default kelola_playlist;