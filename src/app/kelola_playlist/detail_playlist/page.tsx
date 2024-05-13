// File: detail_playlist.tsx

"use client"
import { useRouter } from "next/navigation";

const DetailPlaylist: React.FC = () => {
    const router = useRouter();

    return (
        <div className="flex min-h-screen bg-white text-white-100 flex-col items-center justify-center gap-16 font-bold p-48">
            <h1 className="text-3xl">User Playlist Detail</h1>
            
            <div className="flex flex-col justify-start w-full">
                <div className="mb-2 text-left"><span className="font-bold">Judul:</span> Speak Now</div>
                <div className="mb-2 text-left"><span className="font-bold">Pembuat:</span> Taylor Swift</div>
                <div className="mb-2 text-left"><span className="font-bold">Jumlah Lagu:</span> 2</div>
                <div className="mb-2 text-left"><span className="font-bold">Total Durasi:</span> 8 Menit</div>
                <div className="mb-2 text-left"><span className="font-bold">Tanggal Dibuat:</span> 18/03/24</div>
                <div className="mb-2 text-left"><span className="font-bold">Deskripsi:</span> Lorem Ipsum ...</div>
                <button className="bg-green-500 hover:bg-green-700 text-white font-semibold rounded-lg py-4 w-1/4">
                    Shuffle Play
                </button>
            </div>

            <table className="table-fixed w-full">
                <thead>
                    <tr>
                        <th className="w-1/4 px-4 py-2">Judul</th>
                        <th className="w-1/4 px-4 py-2">Oleh</th>
                        <th className="w-1/4 px-4 py-2">Durasi</th>
                        <th className="w-1/4 px-4 py-2">Atur Lagu</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border px-4 py-2">Mine</td>
                        <td className="border px-4 py-2">Taylor Swift</td>
                        <td className="border px-4 py-2">4</td>
                        <td className="border px-4 py-2">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">Lihat</button>
                            <button className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded ml-2">Play</button>
                            <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded ml-2">Hapus</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Back to December</td>
                        <td className="border px-4 py-2">Taylor Swift</td>
                        <td className="border px-4 py-2">4</td>
                        <td className="border px-4 py-2">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">Lihat</button>
                            <button className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded ml-2">Play</button>
                            <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded ml-2">Hapus</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="flex flex-col gap-8 w-full justify-center items-center">
                <button onClick={() => router.push('/kelola_playlist/detail_playlist/tambah_lagu')} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg py-4 w-1/4">
                    Tambah Lagu
                </button>
                <button onClick={() => router.push('/kelola_playlist')} className="bg-gray-500 hover:bg-gray-700 text-white font-semibold rounded-lg py-4 w-1/4">
                    Kembali
                </button>
            </div>
        </div>
    );
}

export default DetailPlaylist;
