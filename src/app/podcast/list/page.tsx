"use client"
import React, { useState, useEffect } from 'react';
import { FaList, FaPlus, FaTrash } from 'react-icons/fa';
import ModalInput from '@/app/components/ModalInput';
import { useAuth } from '@/app/contexts/AuthContext';
import { getAllPodcast } from '@/app/actions/getAllPodcast';
import { DeletePodcast } from '@/app/actions/DeletePodcast';
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

const ListPodcastPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPodcast, setSelectedPodcast] = useState('');
    const [selectedPodcastId, setSelectedPodcastId] = useState<string>('');
    const [podcasts, setPodcasts] = useState<any[]>([]);
    const { email } = useAuth();

    const router =  useRouter();

    const fetchData = async () => {
        try {
            const data = await getAllPodcast(email); 
            setPodcasts(data);
        } catch (error) {
            console.error("Failed to get podcast data", error);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, [email]); 

    const openModal = (podcastName: string,podcastId:string) => {
        setSelectedPodcast(podcastName);
        setSelectedPodcastId(podcastId);
        setIsModalOpen(true);
    };

    const closeModal = async () => {
        await fetchData(); 
        setIsModalOpen(false);
    };

    const handleDelete = (id: string) => async () => {
        try {
            await DeletePodcast(id)
            const updatedPodcasts = await getAllPodcast(email);
            setPodcasts(updatedPodcasts);
            toast.success("Podcast deleted")
        } catch (error) {
            console.error("Failed to delete podcast", error);
        }
    }

    function formatDuration(durasi: number) {
        if (durasi) {
            const hours = Math.floor(durasi / 60);
            const minutes = durasi % 60;
            return hours > 0 ? `${hours} jam ${minutes} menit` : `${minutes} menit`;

        }
    }

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
                            <tbody className="text-md">
                                {podcasts.map((podcast) => (
                                    <tr key={podcast.id}>
                                        <td>{podcast.judul}</td>
                                        <td>{podcast.jumlah_episode}</td>
                                        <td>{formatDuration(podcast.total_durasi)}</td>
                                        <td>
                                            <div className="flex flex-row gap-2 items-center justify-center">
                                                <button className="btn btn-info bg-white-100 text-md py-1 px-2" onClick={()=>router.push(`/podcast/${podcast.id}/podcast-episode`)}><FaList /> View All Episode</button>
                                                <button className="btn btn-success bg-white-100 text-md py-1 px-2" onClick={() => openModal(podcast.judul,podcast.id)}><FaPlus /> Add Episode</button>
                                                <button className="btn btn-error bg-white-100 text-md py-1 px-2" onClick={handleDelete(podcast.id)}><FaTrash /> Delete Podcast</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>
                    <ModalInput isOpen={isModalOpen} onClose={closeModal} podcast={selectedPodcast} podcastId={selectedPodcastId} />
                </div>
            )}
        </div>
    );
}

export default ListPodcastPage;
