'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { getAllPaket } from '../actions/langganan';
import { useAuth } from '../contexts/AuthContext';

interface Paket {
    jenis: string;
    harga: number;
}

const TabelLangganan = () => {
    const { isAuthenticated } = useAuth(); 
    const router = useRouter();
    const [paket, setPaket] = useState<Paket[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleSubscribe = (selectedPaket: Paket) => {
        // const query = `?jenis=${encodeURIComponent(selectedPaket.jenis)}&harga=${encodeURIComponent(selectedPaket.harga.toString())}`;
        switch (selectedPaket.jenis) {
            case '1 Bulan':
                router.push(`/langganan/pembayaran/1`);
                break;
            case '3 Bulan':
                router.push(`/langganan/pembayaran/3`);
                break;
            case '6 Bulan':
                router.push(`/langganan/pembayaran/6`);
                break;
            case '1 Tahun':
                router.push(`/langganan/pembayaran/12`);
                break;
        }
    };

    const handleHistory = () => {
        router.push('/langganan/riwayat');
    };

    async function getPaket() {
        const result = await getAllPaket();
        setPaket(result.rows as Paket[]);
    }

    useEffect(() => {
        setIsLoaded(true);
        getPaket();
    }, []);

    if (isLoaded) {
        if (!isAuthenticated) {
            router.push("/auth/login");
        }
    }

    return (
        <main className="flex min-h-screen text-white-100 flex-col items-center gap-20 p-48"> 
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
                            {paket.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 text-center">{item.jenis}</td>
                                    <td className="py-2 px-4 text-center">Rp{item.harga.toLocaleString('id-ID')}</td>
                                    <td className="text-center">
                                        <button 
                                            onClick={() => handleSubscribe(item)} 
                                            className="btn btn-ghost btn-s text-base w-full h-full text-green-100 hover:text-white bg-transparent">
                                            Berlangganan
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button onClick={handleHistory} className="px-4 py-2 bg-green-200 rounded-lg text-white-100 font-bold">
                    Lihat Riwayat Langganan
                </button>
            </div>
        </main>
    );
};

export default TabelLangganan;
