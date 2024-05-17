"use client"
import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getDaftarLaguChart } from '@/app/actions/getChartDetail';




const DetailChartPlaylist: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const chartId = params;

    const handleDaftarLaguChart = async () => {
        try {
            const daftarLagu  = getDaftarLaguChart(params.chartId as string);

        }
        catch (error) {
            console.error("Failed to get chart data");
        }
    }

    useEffect(() => {
        handleDaftarLaguChart()
    },[chartId])
    return (
        <div className="flex flex-col text-white-100 px-20 py-16 min-h-screen ">
            <div className="px-20 py-16">
                <h1 className="text-4xl font-bold mb-8">Top Placeholder</h1>
                <div className='flex flex-col gap-4 text-lg'>

                    <div>
                        <button className="px-8 py-2 bg-green-200 rounded-lg text-white-100" onClick={() => router.back()}>
                            Kembali
                        </button>

                    </div>

                </div>
            </div>
            <div className="px-20 py-2">
                <h2 className="text-2xl font-bold mb-4">Daftar Lagu</h2>
                <table className="table w-full text-white-100">
                    <thead className='text-white-100 text-lg'>
                        <tr>
                            <th >Judul Lagu</th>
                            <th >Oleh</th>
                            <th >Tanggal Rilis</th>
                            <th >Total Plays</th>
                            <th >Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Song1</td>
                            <td>Artist1</td>
                            <td>09/03/2024</td>
                            <td>21000</td>
                            <td><button className="btn btn-success bg-white-100">Lihat</button></td>
                        </tr>
                        <tr>
                            <td>Song2</td>
                            <td>Artist2</td>
                            <td>02/03/2024</td>
                            <td>19000 </td>
                            <td><button className="btn btn-success bg-white-100">Lihat</button></td>
                        </tr>
                        {/* Add more episodes here */}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default DetailChartPlaylist;