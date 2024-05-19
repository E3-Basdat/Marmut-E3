"use client"

import { FaTrash } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { getPodcastDetail } from '@/app/actions/getPodcastDetail';
import { getPodcastGenre } from '@/app/actions/getPodcastGenre';
import { getPodcastEpisode } from '@/app/actions/getPodcastEpisode';
import { useParams, useRouter } from 'next/navigation';
import { DeleteEpisode } from '@/app/actions/DeleteEpisode';
import toast from "react-hot-toast";
type PodcastDetailProps = {
    judul: string;
    nama: string;
    tanggal_rilis: Date;
    durasi: number;
    tahun: number;
}

type EpisodeProps = {
    id_episode:string;
    judul: string;
    deskripsi: string;
    durasi: number;
    tanggal_rilis: Date;
}

const DetailPodcastPageView: React.FC = () => {
    const params = useParams();
    const { podcastId } = params;
    const [podcastData, setPodcastData] = useState<PodcastDetailProps | null>(null);
    const [genreData, setGenreData] = useState<string[] | null>(null);
    const [episodeData, setEpisodeData] = useState<EpisodeProps[] | null>(null);

    const getPodcastData = async () => {
        try {
            const [podcastData, genreData, episodeData] = await Promise.all([
                getPodcastDetail(podcastId as string),
                getPodcastGenre(podcastId as string),
                getPodcastEpisode(podcastId as string)
            ]);
            setPodcastData(podcastData as PodcastDetailProps);
            setGenreData(genreData as string[]);
            setEpisodeData(episodeData as EpisodeProps[])

        }
        catch (error) {
            console.error("Failed to get podcast data");
        }
    }


    const handleDeleteEpisode = async (id_episode:string) =>{
        try{
            await DeleteEpisode(id_episode)
            await getPodcastData()
            toast.success("Episode deleted successfully")
        }
        catch(error){
            console.error("Failed to delete episode", error)
            toast.error("Failed to delete episode")
        }
    }
    


    useEffect(() => {
        getPodcastData()
    }, [podcastId])

    function formatDuration(durasi: number) {
        if (durasi) {
            const hours = Math.floor(durasi / 60);
            const minutes = durasi % 60;
            return hours > 0 ? `${hours} jam ${minutes} menit` : `${minutes} menit`;

        }
    }

    return (
        <div className="flex flex-col text-white-100 px-20 py-16 min-h-screen ">
            <div className="px-20 py-16">
                <h1 className="text-4xl font-bold mb-8">Daftar Episode {podcastData?.judul}</h1>
                <div className='flex flex-col gap-4 text-lg'>
                    <div className="px-20 py-2">
                        <table className="table w-full text-white-100">
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
                                {episodeData?.map((episode, index) => (
                                    <tr key={index}>
                                        <td>{episode.judul}</td>
                                        <td>{episode.deskripsi}</td>
                                        <td>{formatDuration(episode.durasi)}</td>
                                        <td>{episode.tanggal_rilis.toLocaleDateString()}</td>
                                        <td>
                                            <div className="flex flex-row gap-2 items-center justify-center">

                                                <button className="btn btn-error bg-white-100 text-md py-1 px-3" onClick={()=>handleDeleteEpisode(episode.id_episode)} ><FaTrash /> Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default DetailPodcastPageView;