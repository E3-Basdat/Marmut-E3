"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { getUserData } from '../actions/getUserData';
import { getAllPodcast } from '../actions/getAllPodcast';
import { detailPlaylist, showPlaylist, showPlaylistDashboard } from '../actions/kelolaPlaylist';
import { fetchAlbums } from '../actions/kelolaAlbumL';
import { getLaguArtist } from '../actions/getLaguArtist';
import { getWriterArtist } from '../actions/getLaguWriter';


type UserProps = {
    email: string;
    password: string;
    nama: string;
    gender: number;
    tempat_lahir: string;
    tanggal_lahir: Date;
    is_verified: boolean;
    kota_asal: string;
    kontak: string;
}

const Dashboard: React.FC = () => {
    const [userData, setUserData] = useState<UserProps | null>(null);
    const router = useRouter();

    const { isAuthenticated, email, idLabel, role } = useAuth();
    const [isLoaded, setIsLoaded] = useState(false);


    const handleUserData = async () => {
        try {
            const userData = await getUserData(role, email);
            setUserData(userData as UserProps);
        }
        catch (error) {
            console.error("Failed to fetch user data", error);
        }
    }

    const capitalizeWords = (str: string) => {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    }

    const filteredRoles = role.filter((r: string) => r !== 'pengguna' && r !== 'premium');
    const isPremium = role.includes('premium');
    const isLabel = role.includes('label');


    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded && !isAuthenticated) {
            router.push("/auth/login");
        } else if (isLoaded && isAuthenticated) {
            handleUserData();
        }
    }, [isAuthenticated, isLoaded]);

    return (
        <>
            {isAuthenticated && (
                <div>
                    <div className="flex flex-col text-white-100 py-24 min-h-screen gap-4">
                        <div className="black-gradient px-20 py-24">
                            <p>Profile</p>
                            <h1 className="text-7xl font-bold mb-8">{userData?.nama}</h1>
                            <div className='flex flex-col gap-4'>
                                {!isLabel &&
                                    <p>Status langganan: {isPremium ? "Premium" : "Non Premium"}</p>}
                                {!(role.includes('label')) && (
                                    <div className='flex flex-row'>
                                        <ul className="list-disc pl-4">
                                            <li className="list-item">City: {userData?.kota_asal}</li>
                                            <li className="list-item">Gender: {userData?.gender === 1 ? "Laki-Laki" : "Perempuan"}</li>
                                            <li className="list-item">Place of Birth: {userData?.tempat_lahir}</li>
                                            <li className="list-item">Date of Birth: {userData?.tanggal_lahir.toLocaleDateString()}</li>
                                            <li className="list-item">Role: {filteredRoles.map(capitalizeWords).join(", ")}</li>
                                        </ul>
                                    </div>
                                )}

                                {role.includes('label') && (
                                    <div className='flex flex-row'>
                                        <ul className="list-disc pl-4">
                                            <li className="list-item">Contact: 08112374874</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col gap-16 px-20 justify-center text-center py-20'>
                            {!role.includes('label') && <Playlist />}
                            {(role.includes('songwriter') || role.includes('artist')) && (
                                <>
                                    <Songs />
                                    <WriteSongs />
                                </>
                            )}

                            {role.includes('podcaster') && <Podcast />}
                            {role.includes('label') && <Album />}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function formatDuration(durasi: number) {
    if (durasi) {
        const hours = Math.floor(durasi / 60);
        const minutes = durasi % 60;
        return hours > 0 ? `${hours} jam ${minutes} menit` : `${minutes} menit`;

    }
}

function Playlist() {
    const [playlistData, setPlaylistData] = useState<any[]>([]);
    const { email } = useAuth();
    const fetchData = async () => {
        try {
            const response1 = await showPlaylistDashboard(email);
            setPlaylistData(response1);
        } catch (error) {
            console.error("Failed to get podcast data", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [email]);
    const None = playlistData.length <= 0;
    return (
        <div className="flex w-full flex-col items-center">
            {None ? (
                <p className='text-5xl font-bold'>Belum Memiliki Playlist</p>
            ) : (
                <div className="flex w-full flex-col items-center">
                    <div className='w-full'>
                        <h2 className="text-left text-3xl font-semibold mb-10 ml-2">Playlist Pengguna</h2>
                        <div className="px-4 w-full">
                            <table className="w-full text-white text-center border-collapse border border-gray-200">
                                <thead>
                                    <tr className="text-lg text-white">
                                        <th className="border border-gray-300 px-4 py-2">Judul</th>
                                        <th className="border border-gray-300 px-4 py-2">Jumlah Episode</th>
                                        <th className="border border-gray-300 px-4 py-2">Total Durasi</th>
                                    </tr>
                                </thead>
                                <tbody className="text-md">
                                    {playlistData.map((song: any, index: number) => (
                                        <tr key={index}>
                                            <td className="border px-4 py-2">{song.judul_playlist}</td>
                                            <td className="border px-4 py-2">{song.jumlah_lagu}</td>
                                            <td className="border px-4 py-2">{song.total_durasi}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Songs() {
    const [laguData, setLaguData] = useState<any[]>([]);
    const { email } = useAuth();
    const fetchData = async () => {
        try {
            const response = await getLaguArtist(email);
            setLaguData(response);
        } catch (error) {
            console.error("Failed to get podcast data", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [email]);
    const None = laguData.length <= 0;
    return (<div className="flex w-full flex-col items-center">
        {None ? (
            <p className='text-5xl font-bold'>Belum Memiliki Lagu</p>
        ) : (
            <div className="flex w-full flex-col items-center">
                <div className='w-full'>
                    <h2 className="text-left text-3xl font-semibold mb-10 ml-2">Lagu Artist</h2>
                    <div className="px-4 w-full">
                        <table className="w-full text-white text-center border-collapse border border-gray-200">
                            <thead>
                                <tr className="text-lg text-white">
                                    <th className="border border-gray-300 px-4 py-2">Judul</th>
                                    <th className="border border-gray-300 px-4 py-2">Tanggal Rilis</th>
                                    <th className="border border-gray-300 px-4 py-2">Tahun</th>
                                    <th className="border border-gray-300 px-4 py-2">Durasi</th>
                                </tr>
                            </thead>
                            <tbody className="text-md">
                                {laguData.map((song: any, index: number) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2">{song.judul_lagu}</td>
                                        <td className="border px-4 py-2">{song.tanggal_rilis.toLocaleDateString()}</td>
                                        <td className="border px-4 py-2">{song.tahun}</td>
                                        <td className="border px-4 py-2">{song.durasi}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )}
    </div>
    );
}


function WriteSongs() {
    const [laguData, setLaguData] = useState<any[]>([]);
    const { email } = useAuth();
    const fetchData = async () => {
        try {
            const response = await getWriterArtist(email);
            setLaguData(response);
        } catch (error) {
            console.error("Failed to get podcast data", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [email]);
    const None = laguData.length <= 0;
    return (<div className="flex w-full flex-col items-center">
        {None ? (
            <p className='text-5xl font-bold'>Belum Menulis Lagu</p>
        ) : (
            <div className="flex w-full flex-col items-center">
                <div className='w-full'>
                    <h2 className="text-left text-3xl font-semibold mb-10 ml-2">Lagu Songwriter</h2>
                    <div className="px-4 w-full">
                        <table className="w-full text-white text-center border-collapse border border-gray-200">
                            <thead>
                                <tr className="text-lg text-white">
                                    <th className="border border-gray-300 px-4 py-2">Judul</th>
                                    <th className="border border-gray-300 px-4 py-2">Tanggal Rilis</th>
                                    <th className="border border-gray-300 px-4 py-2">Tahun</th>
                                    <th className="border border-gray-300 px-4 py-2">Durasi</th>
                                </tr>
                            </thead>
                            <tbody className="text-md">
                                {laguData.map((song: any, index: number) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2">{song.judul_lagu}</td>
                                        <td className="border px-4 py-2">{song.tanggal_rilis.toLocaleDateString()}</td>
                                        <td className="border px-4 py-2">{song.tahun}</td>
                                        <td className="border px-4 py-2">{formatDuration(song.durasi)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )}
    </div>
    );
}

function Podcast() {
    const [podcasts, setPodcasts] = useState<any[]>([]);
    const { email } = useAuth();
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
    const None = podcasts.length <= 0;

    return (
        <div className="flex w-full flex-col items-center">
            {None ? (
                <p className='text-5xl font-bold'>Belum Memiliki Podcast</p>
            ) : (

                <div className='w-full'>
                    <h2 className="text-left text-3xl font-semibold mb-10 ml-2">Podcast Pengguna</h2>
                    <div className="px-4 w-full">
                        <table className="w-full text-white-100 text-center border-collapse border border-gray-200">
                            <thead>
                                <tr className="text-lg text-white-100">
                                    <th className="border border-gray-300 px-4 py-2">Judul</th>
                                    <th className="border border-gray-300 px-4 py-2">Jumlah Episode</th>
                                    <th className="border border-gray-300 px-4 py-2">Total Durasi</th>
                                </tr>
                            </thead>
                            <tbody className="text-md">
                                {podcasts.map((podcast, index) => (
                                    <tr key={podcast.id} >
                                        <td className="border border-gray-300 px-4 py-2">{podcast.judul}</td>
                                        <td className="border border-gray-300 px-4 py-2">{podcast.jumlah_episode}</td>
                                        <td className="border border-gray-300 px-4 py-2">{formatDuration(podcast.total_durasi)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

function Album() {
    interface AlbumData {
        judul: string;
        jumlahLagu: number;
        totalDurasi: number;
    }

    const { idLabel } = useAuth();
    const [albums, setAlbums] = useState<AlbumData[]>([]);

    useEffect(() => {
        if (idLabel) {
            const loadData = async () => {
                try {
                    const fetchedAlbums = await fetchAlbums(idLabel);
                    setAlbums(fetchedAlbums);
                } catch (err) {
                    console.error("Failed to fetch data:", err);
                }
            };

            loadData();
        }

    }, [idLabel]);

    const None = albums.length <= 0;

    return (
        <div className="flex w-full flex-col items-center">
            {None ? (
                <p className='text-5xl font-bold'>Belum Memiliki Album</p>
            ) : (
                <div className='w-full'>
                    <h2 className="text-left text-3xl font-semibold mb-10 ml-2">Label Album</h2>
                    <div className="px-4 w-full">
                        <table className="w-full text-white-100 text-center border-collapse border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="w-1/4 px-4 py-2">Judul</th>
                                    <th className="w-1/4 px-4 py-2">Jumlah Lagu</th>
                                    <th className="w-1/4 px-4 py-2">Total Durasi</th>
                                </tr>
                            </thead>
                            <tbody className="text-md">
                                {albums.map((album, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2">{album.judul}</td>
                                        <td className="border px-4 py-2">{album.jumlahLagu}</td>
                                        <td className="border px-4 py-2">{formatDuration(album.totalDurasi)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
