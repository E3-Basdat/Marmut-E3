"use client"
import React from 'react';
import { FaTrash } from 'react-icons/fa';
const DetailPodcastPageView: React.FC = () => {
    return (
        <div className="flex flex-col text-white-100 px-20 py-16 min-h-screen ">
            <div className="px-20 py-16">
                <h1 className="text-4xl font-bold mb-8">Daftar Episode Podcast 1</h1>
                <div className='flex flex-col gap-4 text-lg'>
                    <div className="px-10 py-2">
                        <table className="table w-full text-white-100 text-center">
                            <thead className='text-white-100 text-lg'>
                                <tr>
                                    <th >Judul Episode</th>
                                    <th >Deskripsi</th>
                                    <th >Durasi</th>
                                    <th >Tanggal</th>
                                    <th >Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>SubJudul1</td>
                                    <td>Lorem Ipsum ...</td>
                                    <td>59 menit</td>
                                    <td>18/03/2024</td>

                                    <td>
                                        <div className="flex flex-row gap-2 items-center justify-center">

                                            <button className="btn btn-error bg-white-100 text-md py-1 px-3"><FaTrash /> Delete</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>SubJudul1</td>
                                    <td>Lorem Ipsum ...</td>
                                    <td>59 menit</td>
                                    <td>18/03/2024</td>

                                    <td>
                                        <div className="flex flex-row gap-2 items-center justify-center">

                                            <button className="btn btn-error bg-white-100 text-md py-1 px-3"><FaTrash /> Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default DetailPodcastPageView;