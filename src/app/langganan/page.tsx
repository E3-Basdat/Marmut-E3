'use client'
import React from 'react';
import { useRouter } from "next/navigation";

const tabelLangganan = () => {
    const router = useRouter();
    const handleSubscribe = () => {
        /* TODO: push data email user dan push data paket yang diklik*/
        router.push('/langganan/pembayaran');  
    };
    const handleHistory = () => {
        /* TODO: push data email user untuk ngambil data transaksi*/
        router.push('/langganan/riwayat');
    };

    /* TODO: fetch data paket*/

    return (
        <main className="flex min-h-screen text-white-100 flex-col items-center gap-8  p-48"> 
            <h1 className="text-4xl font-bold">Langganan Paket</h1>
            <div className="flex flex-col gap-8 w-full max-w-4xl justify-center items-center">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-lg">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="py-3 px-5">Jenis</th>
                                <th className="py-3 px-5">Harga</th>
                                <th className="py-3 px-5"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 text-center">1 Bulan</td>
                                <td className="py-2 px-4 text-center">Rp40.000</td>
                                <td>
                                    <button onClick={handleSubscribe} className="w-full h-full text-red-800 hover:text-white bg-transparent">
                                        Berlangganan
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 text-center">3 Bulan</td>
                                <td className="py-2 px-4 text-center">Rp100.000</td>
                                <td>
                                    <button onClick={handleSubscribe} className="w-full h-full text-red-800 hover:text-white bg-transparent">
                                        Berlangganan
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 text-center">6 Bulan</td>
                                <td className="py-2 px-4 text-center">Rp550.000</td>
                                <td>
                                    <button onClick={handleSubscribe} className="w-full h-full text-red-800 hover:text-white bg-transparent">
                                        Berlangganan
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 text-center">1 Tahun</td>
                                <td className="py-2 px-4 text-center">Rp1.000.000</td>
                                <td>
                                    <button onClick={handleSubscribe} className="w-full h-full text-red-800 hover:text-white bg-transparent">
                                        Berlangganan
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button onClick={handleHistory} className="text-lg bg-green-200 hover:bg-green-700 text-white py-2 px-4 rounded">
                    Lihat Riwayat Langganan
                </button>
            </div>
        </main>
    );
};

export default tabelLangganan;
