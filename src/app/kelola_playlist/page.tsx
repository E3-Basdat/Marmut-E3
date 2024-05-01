"use client"
import { useRouter } from "next/navigation";


const kelola_playlist: React.FC = () => {
    const router = useRouter();
    return (
        <div className="flex min-h-screen bg-white text-white-100 flex-col items-center gap-16 font-bold p-48">
            <h1 className="text-3xl">User Playlist</h1>
            <table className="table-fixed w-full">
                <thead>
                    <tr>
                        <th className="w-1/4 px-4 py-2">Judul</th>
                        <th className="w-1/4 px-4 py-2">Jumlah Lagu</th>
                        <th className="w-1/4 px-4 py-2">Total Durasi</th>
                        <th className="w-1/4 px-4 py-2">Edit Playlist</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border px-4 py-2">Speak Now</td>
                        <td className="border px-4 py-2">7</td>
                        <td className="border px-4 py-2">31</td>
                        <td className="border px-4 py-2">
                            <button onClick={() => router.push('/kelola_playlist/detail_playlist')} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">Detail</button>
                            <button onClick={() => router.push('/kelola_playlist/ubah_playlist')} className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded ml-2">Ubah</button>
                            <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded ml-2">Hapus</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">City of Evil</td>
                        <td className="border px-4 py-2">6</td>
                        <td className="border px-4 py-2">30</td>
                        <td className="border px-4 py-2">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">Detail</button>
                            <button className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded ml-2">Ubah</button>
                            <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded ml-2">Hapus</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="flex flex-col gap-8 w-full justify-center items-center">
                <button onClick={() => router.push('/kelola_playlist/tambah_playlist')} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg py-4 w-1/4">
                    Tambah Playlist
                </button>
            </div>
        </div>
    );
}

export default kelola_playlist;