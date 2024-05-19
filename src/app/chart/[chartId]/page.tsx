"use client"
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getDaftarLaguChart, getChartName } from '@/app/actions/getChartDetail';

const DetailChartPlaylist: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const { chartId } = params;
    const [daftarLagu, setDaftarLagu] = useState<any[]>([]);
    const [namaChart, setNamaChart] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true); // State for loading indicator

    const handleDaftarLaguChart = async () => {
        setLoading(true); // Set loading state to true before fetching data
        try {
            const daftarLagu = await getDaftarLaguChart(params.chartId as string);
            const nama = await getChartName(params.chartId as string);
            setNamaChart(nama);
            setDaftarLagu(daftarLagu);
        } catch (error) {
            console.error("Failed to get chart data", error);
        } finally {
            setLoading(false); // Set loading state to false after data fetching completes (success or failure)
        }
    }

    useEffect(() => {
        if (chartId) {
            handleDaftarLaguChart();
        }
    }, [chartId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col text-white-100 px-20 py-16 min-h-screen">
            <div className="px-20 py-16">
                <h1 className="text-4xl font-bold mb-8">{namaChart}</h1>
                <div className='flex flex-col gap-4 text-lg'>
                    <div>
                        <button className="px-8 py-2 bg-green-200 rounded-lg text-white" onClick={() => router.back()}>
                            Kembali
                        </button>
                    </div>
                </div>
            </div>
            <div className="px-20 py-2">
                <h2 className="text-2xl font-bold mb-4">Daftar Lagu</h2>
                <table className="w-full text-white">
                    <thead className='text-lg text-left'>
                        <tr>
                            <th>Judul Lagu</th>
                            <th>Oleh</th>
                            <th>Tanggal Rilis</th>
                            <th>Total Plays</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-md text-white-100 py-4'>
                        {daftarLagu.map((lagu, index) => (
                            <tr key={index} className='text-white-100'>
                                <td>{lagu.judul_lagu}</td>
                                <td>{lagu.artist}</td>
                                <td>{lagu.tanggal_rilis.toLocaleDateString()}</td>
                                <td>{lagu.play_count}</td>
                                <td>
                                    <div className="flex py-4">
                                        <button className="btn btn-success bg-white px-8" onClick={()=>router.push(`/detail_lagu/${lagu.id_song}`)}>Lihat</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DetailChartPlaylist;
