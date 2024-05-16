'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

function DownloadedSongs() {
    const { isAuthenticated, email } = useAuth(); 
    const router = useRouter();
    const [notification, setNotification] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    const handleHapus = () => {
        
        setNotification('Berhasil menghapus lagu dari daftar unduhan!'); // Set the notification message
        setTimeout(() => setNotification(''), 3000); // Hide the notification after 3 seconds
    };

    const handleLihat = () => {
        // TODO: Routing to specific song page
        // router.push('/path/to/specific/song');
    };

    useEffect(() => {
        setIsLoaded(true);
      }, []);
    
    if (isLoaded) {
        if (!isAuthenticated) {
            router.push("/auth/login");
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
                                <th className="py-3 px-5">Tanggal Download</th>
                                <th className="rounded-tr-lg py-3 px-5">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 text-center">Song 1</td>
                                <td className="py-2 px-4 text-center">Artist 1</td>
                                <td className="py-2 px-4 text-center">20/02/24</td>
                                <td className="py-2 px-4 flex justify-around">
                                    <button onClick={handleLihat} className="btn btn-ghost btn-s text-lg h-full text-blue-500 hover:text-white bg-transparent">
                                        Lihat
                                    </button>
                                    <button onClick={handleHapus} className="btn btn-ghost btn-s text-lg h-full text-red-500 hover:text-white bg-transparent">
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                            {/* Additional rows as needed */}
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
