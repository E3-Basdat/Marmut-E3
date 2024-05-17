"use client"
import { getDetailLagu } from "@/app/actions/detailLagu";
import { useAuth } from "@/app/contexts/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface DetailLagu {
    judulLagu: string;
    albumLagu: string;
    artistLagu: string;
    songwriterLagu: string;
    genreLagu: string;
    durasiLagu: string;
}

const detail_lagu: React.FC = () => {
    const router = useRouter();
    const [detailLagu, setDetailLagu] = useState<DetailLagu[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { idLabel , isAuthenticated , role } = useAuth();
    const params = useParams();
    const idLagu = params.idLagu as string;

    useEffect(() => {
        if (idLagu) {
            const loadData = async () => {
                try {
                    const fetchedDetailLagu = await getDetailLagu(idLagu);
                    setDetailLagu(fetchedDetailLagu);
                } catch (err) {
                    console.error("Failed to fetch data:", err);
                    toast.error("Failed to load data");
                }
            };
    
            loadData();
        }

    }, [idLagu]);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded && !isAuthenticated) {
            router.push("auth/login");
        }
    }, [isAuthenticated, isLoaded]);

    return (
        <div className="flex min-h-screen bg-white text-white-100 flex-col items-center gap-16 font-bold p-48">
            <h1 className="text-3xl">{detailLagu[0]?.judulLagu}</h1>
            <div className='flex flex-col w-1/2'>
                <div className='mb-4'>
                    <h2 className="text-xl font-semibold">Album:</h2>
                    <p className="bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4 text-white">
                        {detailLagu[0]?.albumLagu}
                    </p>
                </div>
                <div className='mb-4'>
                    <h2 className="text-xl font-semibold">Artist:</h2>
                    <p className={`font-bold bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4 text-white`}>
                        {detailLagu[0]?.artistLagu}
                    </p>
                </div>
                <div className='mb-4'>
                    <h2 className="text-xl font-semibold">Songwriter:</h2>
                    <p className={`font-bold bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4 text-white`}>
                        {detailLagu[0]?.songwriterLagu}
                    </p>
                </div>
                <div className='mb-4'>
                    <h2 className="text-xl font-semibold">Genre:</h2>
                    <p className={`font-bold bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4 text-white`}>
                        {detailLagu[0]?.genreLagu}
                    </p>
                </div>
                <div className='mb-4'>
                    <h2 className="text-xl font-semibold">Durasi:</h2>
                    <p className={`font-bold bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4 text-white`}>
                        {detailLagu[0]?.durasiLagu}
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-8 w-full justify-center items-center">
                <button onClick={() => router.push('/kelola_album_song_as/daftar_lagu')} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg py-4 w-1/4">
                    Kembali
                </button>
            </div>
        </div>
    );
}

export default detail_lagu;