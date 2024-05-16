"use client"
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPodcastDetail } from '@/app/actions/getPodcastDetail';
import { getPodcastGenre } from '@/app/actions/getPodcastGenre';
import { getPodcastEpisode } from '@/app/actions/getPodcastEpisode';

type PodcastDetailProps = {
    judul: string;
    nama: string;
    tanggal_rilis: Date;
    durasi: number;
    tahun: number;
}

type EpisodeProps = {
    judul: string;
    deskripsi: string;
    durasi: number;
    tanggal_rilis: Date;
}


const PodcastDetail: React.FC = () => {
    const router = useRouter();
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


    useEffect(() => {
        getPodcastData()
    }
        , [podcastId])


    function formatDuration(durasi: number) {
        if (durasi) {
            const hours = Math.floor(durasi / 60);
            const minutes = durasi % 60;
            return hours > 0 ? `${hours} jam ${minutes} menit` : `${minutes} menit`;

        }
    }
    console.log(episodeData)
    return (
        <div className="flex flex-col text-white-100 px-20 py-16 min-h-screen ">
            <div className="px-20 py-16">
                <h1 className="text-4xl font-bold mb-8">Podcast Detail</h1>
                <div className='flex flex-col gap-4 text-lg'>
                    <p>Judul: <span>{podcastData?.judul}</span></p>
                    <p>Genre(s):</p>

                    <ul className="list-disc pl-6">
                        {genreData?.map((genre, index) => (
                            <li key={index}>{genre}</li>
                        ))}
                    </ul>

                    <p>Podcaster: {podcastData?.nama}</p>
                    <p>Total Durasi: {formatDuration(podcastData?.durasi as number)}</p>
                    <p>Tanggal Rilis: {podcastData?.tanggal_rilis.toLocaleDateString()}</p>
                    <p>Tahun: {podcastData?.tahun}</p>
                    <div>
                        <button className="px-8 py-2 bg-green-200 rounded-lg text-white-100" onClick={() => router.back()}>
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
                        {episodeData?.map((episode, index) => (
                            <tr key={index}>
                                <td>{episode.judul}</td>
                                <td>{episode.deskripsi}</td>
                                <td>{formatDuration(episode.durasi)}</td>
                                <td>{episode.tanggal_rilis.toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PodcastDetail;
