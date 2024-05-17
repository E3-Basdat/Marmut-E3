"use client"
import { deleteSong, fetchAlbumName, fetchSongs } from "@/app/actions/daftarLagu";
import { useAuth } from "@/app/contexts/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Song {
    idKonten: string;
    judulKonten: string;
    durasiKonten: number;
    totalPlaySong: number;
    totalDownloadSong: number;
}

const daftar_lagu: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const [isLoaded, setIsLoaded] = useState(false);

    const params = useParams();
    const idAlbum = params.idAlbum as string;

    const [albumName, setAlbumName] = useState<string[]>([]);
    const [songs, setSongs] = useState<Song[]>([]);

    useEffect(() => {
        if (idAlbum) {
            const loadData = async () => {
                try {
                    const fetchedSongs = await fetchSongs(idAlbum);
                    setSongs(fetchedSongs);
                } catch (err) {
                    console.error("Failed to fetch data:", err);
                    toast.error("Failed to load data");
                }
            };
        
            loadData();
        }
    }, [idAlbum]);
    
    useEffect(() => {
        if (idAlbum) {
            const fetchAlbumDetails = async () => {
                try {
                    const fetchedAlbumName = await fetchAlbumName(idAlbum);
                    setAlbumName(fetchedAlbumName);
                } catch (err) {
                    console.error("Failed to fetch data:", err);
                    toast.error("Failed to load data");
                }
            };
    
            fetchAlbumDetails();
        }

    }, [idAlbum]);

    const handleDelete = async (idKonten: string) => {
        try {
            await deleteSong(idKonten);
            toast.success("Album deleted");
            setSongs(songs.filter(song => song.idKonten !== idKonten));
        } catch (error) {
            console.error("Failed to delete song:", error);
            toast.error("Failed to delete song");
        }
    }

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded && !isAuthenticated) {
            router.push("auth/login");
        }
    }, [isAuthenticated, isLoaded]);

    return (
        <div className="flex min-h-screen bg-white text-white-100 flex-col items-center gap-16 font-bold p-48">
            <h1 className="text-3xl">Daftar Lagu Pada {albumName}</h1>
            <table className="table-fixed w-full">
                <thead>
                    <tr>
                        <th className="w-1/4 px-4 py-2">Judul</th>
                        <th className="w-1/4 px-4 py-2">Durasi</th>
                        <th className="w-1/4 px-4 py-2">Total Play</th>
                        <th className="w-1/4 px-4 py-2">Total Download</th>
                        <th className="w-1/4 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((song, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{song.judulKonten}</td>
                            <td className="border px-4 py-2">{song.durasiKonten}</td>
                            <td className="border px-4 py-2">{song.totalPlaySong}</td>
                            <td className="border px-4 py-2">{song.totalDownloadSong}</td>
                            <td className="border px-4 py-2">
                                <button onClick={() => router.push('/detail_lagu')} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">Lihat Detail</button>
                                <button onClick={() => handleDelete(song.idKonten)} className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded ml-2">Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default daftar_lagu;