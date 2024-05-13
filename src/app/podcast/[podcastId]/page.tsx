"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
const PodcastDetail: React.FC = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col text-white-100 px-20 py-16 min-h-screen ">
            <div className="px-20 py-16">
                <h1 className="text-4xl font-bold mb-8">Podcast Detail</h1>
                <div className='flex flex-col gap-4 text-lg'>
                    <p>Judul: <span>Podcast1</span></p>
                    <p>Genre(s):</p>
                    <ul className="list-disc pl-6">
                        <li>Genre1</li>
                        <li>Genre2</li>
                    </ul>
                    <p>Podcaster: Artist1</p>
                    <p>Total Durasi: 8 jam 20 menit</p>
                    <p>Tanggal Rilis: 18/03/24</p>
                    <p>Tahun: 2024</p>
                    <div>
                    <button className="px-8 py-2 bg-green-200 rounded-lg text-white-100" onClick={() => router.push("/")}>
                        Back
                    </button>

                    </div>

                </div>
            </div>
            <div className="px-20 py-2">
                <h2 className="text-2xl font-bold mb-4">Daftar Episode</h2>
                <table className="table w-full text-white-100">
                    <thead className='text-white-100 text-lg'>
                        <tr>
                            <th >Judul Episode</th>
                            <th >Deskripsi</th>
                            <th >Durasi</th>
                            <th >Tanggal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>SubJudul1</td>
                            <td>Lorem Ipsum ...</td>
                            <td>59 menit</td>
                            <td>18/03/2024</td>
                        </tr>
                        <tr>
                            <td>SubJudul2</td>
                            <td>Lorem Ipsum ...</td>
                            <td>1 jam 2 menit</td>
                            <td>25/03/2024</td>
                        </tr>
                        {/* Add more episodes here */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PodcastDetail;
