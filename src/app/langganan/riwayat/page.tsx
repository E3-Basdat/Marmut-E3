"use client"
import { getRiwayatLangganan } from '@/app/actions/langganan';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface subscriptionHistory{
    jenis : string;
    tanggalmulai : Date;
    tanggalberakhir : Date;
    metodepembayaran : string;
    nominal : string;
}

function riwayatLangganan() {
    const { isAuthenticated, email } = useAuth(); 
    const router = useRouter();
    const [riwayat, setRiwayat] = useState<subscriptionHistory[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleKembali = () => {
        router.push('/langganan');
    };

    async function getRiwayat() {
        const result = await getRiwayatLangganan(email);
        setRiwayat(result.rows as subscriptionHistory[]);
    }

    useEffect(() => {
        if (email) {
            getRiwayat();
        }
    }, [email]);

    useEffect(() => {
        setIsLoaded(true);
      }, []);


    
    if (isLoaded) {
        if (!isAuthenticated) {
            router.push("/auth/login");
        }
    }

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
                            {riwayat.map((item, index) =>(
                                <tr key={index}>
                                    <td className="py-2 px-4 text-center">{item.jenis}</td>
                                    <td className="py-2 px-4 text-center">{item.tanggalmulai.toLocaleDateString()}</td>
                                    <td className="py-2 px-4 text-center">{item.tanggalberakhir.toLocaleDateString()}</td>
                                    <td className="py-2 px-4 text-center">{item.metodepembayaran}</td>
                                    <td className="py-2 px-4 text-center">Rp{parseInt(item.nominal).toLocaleString('id-ID')}</td>
                             </tr>
                            ))}
                            {riwayat.length === 0 && (
                            <tr>
                                <td colSpan={5} className="py-2 px-4 text-center">Tidak ada riwayat transaksi</td>
                            </tr>
                            )}
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