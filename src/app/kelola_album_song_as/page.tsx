"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchAlbums , deleteAlbum } from "../actions/kelolaAlbumAS";
import { useAuth } from "../contexts/AuthContext";

interface Album {
    judul: string;
    namaLabel: string;
    jumlahLagu: number;
    totalDurasi: number;
}

const kelola_album_song_as: React.FC = () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const router = useRouter();
    const { email , isAuthenticated, role } = useAuth();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const fetchedAlbums = await fetchAlbums();
                setAlbums(fetchedAlbums);
            } catch (err) {
                console.error("Failed to fetch data:", err);
                toast.error("Failed to load data");
            }
        };
    
        loadData();
    }, []);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded && !isAuthenticated) {
            router.push("auth/login");
        }
    }, [isAuthenticated, isLoaded]);

    const handleDelete = async (judul: string) => {
        try {
            await deleteAlbum(judul);
            toast.success("Album deleted");
            setAlbums(albums.filter(album => album.judul !== judul));
        } catch (error) {
            console.error("Failed to delete album:", error);
            toast.error("Failed to delete album");
        }
    }

    if (!isAuthenticated || !role.includes('artist') && !role.includes('songwriter')) {
        return <p>Access Denied</p>;
    }

    return (
        <div className="flex min-h-screen bg-white flex-col items-center gap-16 font-bold p-48">
            <h1 className="text-3xl">List Album</h1>
            <table className="table-fixed w-full">
                <thead>
                    <tr>
                        <th className="w-1/5 px-4 py-2">Judul</th>
                        <th className="w-1/5 px-4 py-2">Label</th>
                        <th className="w-1/5 px-4 py-2">Jumlah Lagu</th>
                        <th className="w-1/5 px-4 py-2">Total Durasi</th>
                        <th className="w-1/5 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {albums.map((album, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{album.judul}</td>
                            <td className="border px-4 py-2">{album.namaLabel}</td>
                            <td className="border px-4 py-2">{album.jumlahLagu}</td>
                            <td className="border px-4 py-2">{album.totalDurasi}</td>
                            <td className="border px-4 py-2">
                                <button onClick={() => router.push(`/kelola_album_song_as/daftar_lagu/`)} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">Lihat Daftar Lagu</button>
                                <button onClick={() => router.push(`/kelola_album_song_as/create_lagu$`)} className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded ml-2">Tambah Lagu</button>
                                <button onClick={() => handleDelete(album.judul)} className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded ml-2">Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex flex-col gap-8 w-full justify-center items-center">
                <button onClick={() => router.push('/kelola_album_song_as/create_album')} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg py-4 w-1/4">
                    Tambah Album
                </button>
            </div>
        </div>
    );
}

export default kelola_album_song_as;
