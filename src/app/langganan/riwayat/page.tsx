"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

function riwayatLangganan() {
    const router = useRouter();
    const handleKembali = () => {
        router.push('/langganan');
    };
    /* TODO: fetch data transaksi user*/

    return (
        <main className="flex min-h-screen text-white-100 flex-col items-center gap-8  p-48"> 
            <h1 className="text-4xl font-bold">Riwayat Langganan</h1> 
            <div className="flex flex-col gap-8 w-full max-w-4xl justify-center items-center">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-lg">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="py-3 px-5">Jenis</th>
                                <th className="py-3 px-5">Tanggal Dimulai</th>
                                <th className="py-3 px-5">Tanggal Berakhir</th>
                                <th className="py-3 px-5">Metode Pembayaran</th>
                                <th className="py-3 px-5">Nominal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 text-center">1 Bulan</td>
                                <td className="py-2 px-4 text-center">8 April 2024, 23:00</td>
                                <td className="py-2 px-4 text-center">8 Mei 2024, 23:00</td>
                                <td className="py-2 px-4 text-center">GoPay</td>
                                <td className="py-2 px-4 text-center">Rp40.000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button onClick={handleKembali} className="bg-green-200 text-white font-bold py-2 px-4 rounded">
                    Kembali
                </button>
            </div>
        </main>
    )
}

export default riwayatLangganan