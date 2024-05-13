"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

function riwayatLangganan() {
    const router = useRouter();
    const handleKembali = () => {
        router.push('/langganan');
    };
    /* TODO: fetch data transaksi user*/

    return (
        <main className="flex min-h-screen text-white-100 flex-col items-center gap-20  py-48"> 
            <h1 className="text-4xl font-bold text-center">Riwayat Langganan</h1> 
            <div className="flex flex-col gap-8 w-full justify-center items-center px-20">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-lg">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="rounded-tl-lg py-3 px-5">Jenis</th>
                                <th className="py-3 px-5">Tanggal Dimulai</th>
                                <th className="py-3 px-5">Tanggal Berakhir</th>
                                <th className="py-3 px-5">Metode Pembayaran</th>
                                <th className="rounded-tr-lg py-3 px-5">Nominal</th>
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
                <button onClick={handleKembali} className="px-4 py-2  bg-green-200 rounded-lg text-white-100 font-bold">
                    Kembali
                </button>
            </div>
        </main>
    )
}

export default riwayatLangganan