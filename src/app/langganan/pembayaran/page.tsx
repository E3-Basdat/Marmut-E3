'use client'
import { useRouter } from "next/navigation";
import React from 'react';
import { useSearchParams } from 'next/navigation';

const PembayaranPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const jenis = searchParams.get('jenis');
    const harga = searchParams.get('harga');

    const handleSubmit = () => {
        // TODO: submit data user ke fungsi sql (ke form)
        router.push('/langganan');
    };

    return (
        <main className="flex min-h-screen text-white-100 flex-col items-center gap-8 p-48"> 
            <h1 className="text-4xl font-bold text-center">Pembayaran Paket</h1> 
            <div className="flex flex-col gap-8 w-full max-w-4xl justify-center items-center">
                <label>Informasi Paket yang Ingin Dibeli:</label>
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-lg">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="rounded-tl-lg py-3 px-5">Jenis</th>
                                <th className="rounded-tr-lg py-3 px-5">Harga</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 text-center">{jenis}</td>
                                <td className="py-2 px-4 text-center">Rp{parseInt(harga || '0').toLocaleString('id-ID')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <label className="mb-4">Informasi Paket yang Ingin Dibeli:
                    <div className="dropdown mb-4 flex-end">
                        <div tabIndex={0} role="button" className="btn m-1">Pilih Metode Pembayaran</div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>GoPay</a></li>
                            <li><a>Ovo</a></li>
                            <li><a>MBanking</a></li>
                            <li><a>Kartu Kredit</a></li>
                        </ul>
                    </div>
                </label>
                <button onClick={handleSubmit} className="px-4 py-2 bg-green-200 rounded-lg text-white-100 font-bold">
                    Submit
                </button>
            </div>
        </main>
    );
};

export default PembayaranPage;
