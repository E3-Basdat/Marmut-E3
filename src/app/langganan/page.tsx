'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { getAllPaket } from '../actions/langganan';

interface Paket {
    jenis: string;
    harga: number;
}

const tabelLangganan = () => {
    const router = useRouter();
    const [paket, setPaket] = useState<Paket[]>([]);

    const handleSubscribe = () => {
        /* TODO: push data email user dan push data paket yang diklik*/
        router.push('/langganan/pembayaran');  
    };
    const handleHistory = () => {
        /* TODO: push data email user untuk ngambil data transaksi*/
        router.push('/langganan/riwayat');
    };

    /* TODO: fetch data paket*/
    // async function getPaket() {
    //     const result = await getAllPaket();
    //     console.log(result);
    //     setPaket(result.rows as Paket[]);
    // }

    // useEffect(() => {
    //     getPaket();
    // }, []);

    return (
        <main className="flex min-h-screen text-white-100 flex-col items-center gap-20  p-48"> 
            <h1 className="text-4xl font-bold text-center">Langganan Paket</h1>
            <div className="flex flex-col gap-8 w-full max-w-4xl justify-center items-center">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-lg">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="rounded-tl-lg py-3 px-5">Jenis</th>
                                <th className="py-3 px-5">Harga</th>
                                <th className="rounded-tr-lg whitespace-nowrap">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 text-center">1 Bulan</td>
                                <td className="py-2 px-4 text-center">Rp40.000</td>
                                <td className="text-center">
                                    <button onClick={handleSubscribe} className="btn btn-ghost btn-s text-base w-full h-full text-green-100 hover:text-white bg-transparent">
                                        Berlangganan
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button onClick={handleHistory} className="px-4 py-2  bg-green-200 rounded-lg text-white-100 font-bold">
                        Lihat Riwayat Langganan
                    </button>
            </div>
        </main>
    );
};

export default tabelLangganan;
