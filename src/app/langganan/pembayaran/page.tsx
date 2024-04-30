"use client"
import { useRouter } from "next/navigation";
import React from 'react'

const page = () => {
    const router = useRouter();
    const handleSubmit = () => {
        /* TODO: submit data user ke fungsi sql (ke form)*/
        router.push('/langganan');
    };
    
    return (
    <main className="flex min-h-screen text-white-100 flex-col items-center gap-8  p-48"> 
        <h1 className="text-4xl font-bold">Pembayaran Paket</h1> 
        <div className="flex flex-col gap-8 w-full max-w-4xl justify-center items-center">
            <label>Informasi Paket yang Ingin Dibeli:</label>
            <div className="overflow-x-auto w-full">
                <table className="w-full text-lg">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="py-3 px-5">Jenis</th>
                            <th className="py-3 px-5">Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2 px-4 text-center">1 Bulan</td>
                            <td className="py-2 px-4 text-center">Rp40.000</td>
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
            <button onClick={handleSubmit} className="bg-green-200 text-white font-bold py-2 px-4 rounded">
                Submit
            </button>
        </div>
    </main>
    )
}

export default page