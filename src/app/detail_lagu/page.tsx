"use client"
import { useRouter } from "next/navigation";

interface AlbumProps {
    album: string;
    artist: string;
    songwriter: string;
    genre: string;
    durasi: string;
}

const detail_lagu: React.FC<AlbumProps> = ({album, artist, songwriter, genre, durasi}) => {
    const router = useRouter();

    return (
        <div className="flex min-h-screen bg-white text-white-100 flex-col items-center gap-16 font-bold p-48">
            <h1 className="text-3xl">Enchanted</h1>
            <div className='flex flex-col w-1/2'>
                <div className='mb-4'>
                    <h2 className="text-xl font-semibold">Album:</h2>
                    <p className="bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4 text-white">{album}</p>
                </div>
                <div className='mb-4'>
                    <h2 className="text-xl font-semibold">Artist:</h2>
                    <p className={`font-bold bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4 text-white`}>
                        {artist}
                    </p>
                </div>
                <div className='mb-4'>
                    <h2 className="text-xl font-semibold">Songwriter:</h2>
                    <p className={`font-bold bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4 text-white`}>
                        {songwriter}
                    </p>
                </div>
                <div className='mb-4'>
                    <h2 className="text-xl font-semibold">Genre:</h2>
                    <p className={`font-bold bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4 text-white`}>
                        {genre}
                    </p>
                </div>
                <div className='mb-4'>
                    <h2 className="text-xl font-semibold">Durasi:</h2>
                    <p className={`font-bold bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4 text-white`}>
                        {durasi}
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