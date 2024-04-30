"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

function downloadedSongs() {
    const router = useRouter();
    const handlehapus = () => {
        /* TODO: routing, ngehapus, ngasih notif, dan update data*/
        // router.push('/langganan/pembayaran');  
    };
    const handleLihat = () => {
        /* TODO: routing ke spesifik songnya*/
        // router.push('/langganan/pembayaran');  
    };


    return (
        <main className="flex min-h-screen text-white-100 flex-col items-center gap-8  p-48"> 
                <h1 className="text-4xl font-bold">Daftar Lagu</h1>
                <div className="flex flex-col gap-8 w-full max-w-4xl justify-center items-center">
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-lg">
                            <thead>
                                <tr className="bg-gray-800 text-white">
                                    <th className="py-3 px-5">Judul Lagu</th>
                                    <th className="py-3 px-5">Oleh</th>
                                    <th className="py-3 px-5">Tanggal Download</th>
                                    <th className="py-3 px-5"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 px-4 text-center">Song 1</td>
                                    <td className="py-2 px-4 text-center">Artist 1</td>
                                    <td className="py-2 px-4 text-center">20/02/24</td>
                                    <td>
                                        {/* <button onClick={handleSubscribe} className="w-full h-full text-red-800 hover:text-white bg-transparent">
                                            Berlangganan
                                        </button> */}
                                        <button onClick={handleLihat}className="w-full h-full text-blue-800 hover:text-white bg-transparent">
                                            Lihat
                                        </button>
                                        <button onClick={handlehapus} className="w-full h-full text-red-800 hover:text-white bg-transparent">
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 text-center">Song 2</td>
                                    <td className="py-2 px-4 text-center">Artis 2</td>
                                    <td className="py-2 px-4 text-center">21/03/24</td>
                                    <td>
                                        {/* <button onClick={handleSubscribe} className="w-full h-full text-red-800 hover:text-white bg-transparent">
                                            Berlangganan
                                        </button> */}
                                        <button onClick={handleLihat} className="w-full h-full text-blue-800 hover:text-white bg-transparent">
                                            Lihat
                                        </button>
                                        <button onClick={handlehapus} className="w-full h-full text-red-800 hover:text-white bg-transparent">
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* <button onClick={handleHistory} className="text-lg bg-green-200 hover:bg-green-700 text-white py-2 px-4 rounded">
                        Lihat Riwayat Langganan
                    </button> */}
                </div>
            </main>
    )
}

export default downloadedSongs