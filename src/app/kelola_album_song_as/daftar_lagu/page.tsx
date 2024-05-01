"use client"
import { useRouter } from "next/navigation";

const daftar_lagu: React.FC = () => {
    const router = useRouter();
    return (
        <div className="flex min-h-screen bg-white text-white-100 flex-col items-center gap-16 font-bold p-48">
            <h1 className="text-3xl">Daftar Lagu Pada Speak Now</h1>
            <table className="table-fixed w-full">
                <thead>
                    <tr>
                        <th className="w-1/4 px-4 py-2">Judul</th>
                        <th className="w-1/4 px-4 py-2">Durasi</th>
                        <th className="w-1/4 px-4 py-2">Total Play</th>
                        <th className="w-1/4 px-4 py-2">Total Download</th>
                        <th className="w-1/4 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border px-4 py-2">Back To December</td>
                        <td className="border px-4 py-2">4:54</td>
                        <td className="border px-4 py-2">28</td>
                        <td className="border px-4 py-2">15</td>
                        <td className="border px-4 py-2">
                            <button onClick={() => router.push('/kelola_album_song_as/daftar_lagu/detail_lagu')} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">Lihat Detail</button>
                            <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded ml-2">Hapus</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Enchanted</td>
                        <td className="border px-4 py-2">5:53</td>
                        <td className="border px-4 py-2">57</td>
                        <td className="border px-4 py-2">30</td>
                        <td className="border px-4 py-2">
                            <button onClick={() => router.push('/kelola_album_song_as/daftar_lagu/detail_lagu')} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">Lihat Detail</button>
                            <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded ml-2">Hapus</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="flex flex-col gap-8 w-full justify-center items-center">
                <button onClick={() => router.push('/kelola_album_song_as')} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg py-4 w-1/4">
                    Kembali
                </button>
            </div>
        </div>
    );
}

export default daftar_lagu;