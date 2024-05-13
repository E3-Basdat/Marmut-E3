"use client"
import React, { useState } from 'react';
import { FaList, FaPlus, FaTrash } from 'react-icons/fa';
import ModalInput from '@/app/components/ModalInput';

const ListPodcastPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPodcast, setSelectedPodcast] = useState('');

    const openModal = (podcastName: string) => {
        setSelectedPodcast(podcastName);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    return (
        <div className="flex flex-col text-white-100 px-20 py-16 min-h-screen">
            <div className="px-20 py-16">
                <h1 className="text-4xl font-bold mb-8">All Podcasts</h1>
                <div className='flex flex-col gap-4 text-lg'>
                    <div className="px-10 py-2">
                        <table className="table w-full text-white-100 text-center">
                            <thead className='text-white-100 text-lg'>
                                <tr>
                                    <th>Judul</th>
                                    <th>Jumlah Episode</th>
                                    <th>Total Durasi</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Podcast1</td>
                                    <td>0</td>
                                    <td>0 menit</td>
                                    <td>
                                        <div className="flex flex-row gap-2 items-center justify-center">
                                            <button className="btn btn-info bg-white-100 text-md py-1 px-3"><FaList /> View</button>
                                            <button className="btn btn-success bg-white-100 text-md py-1 px-3" onClick={() => openModal('Podcast1')}><FaPlus /> Add</button>
                                            <button className="btn btn-error bg-white-100 text-md py-1 px-3"><FaTrash /> Delete</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Podcast2</td>
                                    <td>2</td>
                                    <td>4 menit</td>
                                    <td>
                                        <div className="flex flex-row gap-2 items-center justify-center">
                                            <button className="btn btn-info bg-white-100 text-md py-1 px-3"><FaList /> View</button>
                                            <button className="btn btn-success bg-white-100 text-md py-1 px-3" onClick={() => openModal('Podcast2')}><FaPlus /> Add</button>
                                            <button className="btn btn-error bg-white-100 text-md py-1 px-3"><FaTrash /> Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>
                    <ModalInput isOpen={isModalOpen} onClose={closeModal} podcast={selectedPodcast} />
                </div>
            )}
        </div>
    );
}

export default ListPodcastPage;
