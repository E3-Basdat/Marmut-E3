'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { getDownloadedSongs, removeDownloadedSong } from '../actions/downloadedsongs';
import toast from 'react-hot-toast';


interface downloadedsongs{
    title : string; 
    by : string;
    id : string;
}

function DownloadedSongs() {
    const { isAuthenticated, email, role } = useAuth(); 
    const router = useRouter();
    const [notification, setNotification] = useState('');
    const [song, setSong] = useState<downloadedsongs[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleHapus = async (selectedSong : downloadedsongs) => {
        await removeDownloadedSong(email, selectedSong.id);
        getSongs();
        setNotification('Berhasil menghapus lagu dari daftar unduhan!'); 
        setTimeout(() => setNotification(''), 3000); 
    };

    const handleLihat = async (selectedSong : downloadedsongs) => {
        router.push(`/detail_lagu/${selectedSong.id}`);
    };

    async function getSongs(){
        const result = await getDownloadedSongs(email);
        setSong(result.rows as downloadedsongs[]);
    }

    useEffect(() => {
        if (email) {
            getSongs();
        }
    }, [email]);

    useEffect(() => {
        setIsLoaded(true);
      }, []);
    
    if (isLoaded) {
        if (!isAuthenticated) {
            router.push("/auth/login");
        } else if (!role.includes("premium")){
            router.push("/langganan")
            toast.error("Kamu tidak memiliki langganan Premium!");
        }
    }

    return (
        <main className="flex min-h-screen text-white flex-col items-center gap-20 p-48">
            <h1 className="text-4xl font-bold">Daftar Lagu</h1>
            <div className="flex flex-col gap-8 w-full justify-center items-center px-10">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-lg">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="rounded-tl-lg py-3 px-5">Judul Lagu</th>
                                <th className="py-3 px-5">Oleh</th>
                                <th className="rounded-tr-lg py-3 px-5">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {song.map((item, index) => (
                                <tr key={index}>
                                <td className="py-2 px-4 text-center">{item.title}</td>
                                <td className="py-2 px-4 text-center">{item.by}</td>
                                <td className="py-2 px-4 flex justify-around">
                                    <button onClick={() => handleLihat(item)} className="btn btn-ghost btn-s text-lg h-full text-blue-500 hover:text-white bg-transparent">
                                        Lihat
                                    </button>
                                    <button onClick={() => handleHapus(item)}  className="btn btn-ghost btn-s text-lg h-full text-red-500 hover:text-white bg-transparent">
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                            ))}
                            {song.length === 0 && (
                            <tr>
                                <td colSpan={4} className="py-2 px-4 text-center">Kamu belum menggunggah lagu apapun</td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                    {notification && (
                        <div className="mt-4 p-3 bg-green-600 text-center rounded">
                            {notification}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default DownloadedSongs;
