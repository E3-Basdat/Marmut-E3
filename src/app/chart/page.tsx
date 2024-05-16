"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { getChartId } from '../actions/getChartDetail';
const DetailChartPage = () => {
    const router = useRouter();

    const handleChart = async (chartName: string) => {
        try {
            const id = await getChartId(chartName);
            router.push(`/chart/${id}`);

        }
        catch (error) {
            console.error("Failed to get podcast data");
        }

    }

    return (
        <div className="flex flex-col text-white-100 px-8  xl:px-20 py-16 min-h-screen ">
            <div className="w-full lg:px-20 py-24 ">
                <h1 className="text-5xl font-bold text-center">Top Chart in Marmut</h1>
                <div className="flex justify-center items-center mt-12">

                    <button className="px-8 py-2 bg-green-200 rounded-lg text-white-100" onClick={() => router.back()}>
                        Kembali
                    </button>

                </div>
                <div className="w-full mt-16">
                    <div className="flex flex-col xl:flex-row gap-16 justify-between w-full items-center">
                        <div className="card w-96 glass" style={{ width: '300px', minHeight: '400px' }}>
                            <figure><img src="/images.png" alt="car!" /></figure>
                            <div className="card-body" style={{ flex: '1', overflow: 'auto' }}>
                                <h2 className="card-title">Daily Top 20</h2>
                                <p>Experience today's most popular picks!</p>
                                <div className="card-actions justify-end">
                                    <button className="btn bg-green-200 text-white-100" onClick={() => handleChart("Daily Top 20")}>Lihat Daftar Lagu</button>
                                </div>
                            </div>
                        </div>
                        <div className="card w-96 glass" style={{ width: '300px', minHeight: '400px' }}>
                            <figure><img src="/images2.jpg" alt="car!" /></figure>
                            <div className="card-body" style={{ flex: '1', overflow: 'auto' }}>
                                <h2 className="card-title">Weekly Top 20</h2>
                                <p>Discover what's trending this week!</p>
                                <div className="card-actions justify-end">
                                    <button className="btn bg-green-200 text-white-100 " onClick={() => handleChart("Weekly Top 20")}>Lihat Daftar Lagu</button>
                                </div>
                            </div>
                        </div>
                        <div className="card w-96 glass" style={{ width: '300px', minHeight: '400px' }}>
                            <figure><img src="/images3.jpg" alt="car!" /></figure>
                            <div className="card-body" style={{ flex: '1', overflow: 'auto' }}>
                                <h2 className="card-title">Monthly Top 20</h2>
                                <p>Unveil the hottest picks of the month!</p>
                                <div className="card-actions justify-end">
                                    <button className="btn bg-green-200 text-white-100 " onClick={() => handleChart("Monthly Top 20")}>Lihat Daftar Lagu</button>
                                </div>
                            </div>
                        </div>
                        <div className="card w-96 glass" style={{ width: '300px', minHeight: '400px' }}>
                            <figure><img src="/images4.jpg" alt="car!" /></figure>
                            <div className="card-body" style={{ flex: '1', overflow: 'auto' }}>
                                <h2 className="card-title">Yearly Top 20</h2>
                                <p>Get a glimpse of the year's top tunes!</p>
                                <div className="card-actions justify-end">
                                    <button className="btn bg-green-200 text-white-100 " onClick={() => handleChart("Yearly Top 20")}>Lihat Daftar Lagu</button>
                                </div>
                            </div>
                        </div>



                    </div>

                </div>

            </div>
        </div>
    );
}


export default DetailChartPage;