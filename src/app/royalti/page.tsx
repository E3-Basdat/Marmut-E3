"use client"
import { useRouter } from "next/navigation";

const royalti: React.FC = () => {
    const router = useRouter();
    return (
        <div className="flex min-h-screen bg-white text-white-100 flex-col items-center gap-16 font-bold p-48">
            <h1 className="text-3xl">List Royalti</h1>
            <table className="table-fixed w-full">
                <thead>
                    <tr>
                        <th className="w-1/4 px-4 py-2">Judul Lagu</th>
                        <th className="w-1/4 px-4 py-2">Judul Album</th>
                        <th className="w-1/4 px-4 py-2">Total Play</th>
                        <th className="w-1/4 px-4 py-2">Total Download</th>
                        <th className="w-1/4 px-4 py-2">Total Royalti Didapat</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border px-4 py-2">Back To December</td>
                        <td className="border px-4 py-2">Speak Now</td>
                        <td className="border px-4 py-2">65</td>
                        <td className="border px-4 py-2">31</td>
                        <td className="border px-4 py-2">Rp 450000</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Burn It Down</td>
                        <td className="border px-4 py-2">City of Evil</td>
                        <td className="border px-4 py-2">76</td>
                        <td className="border px-4 py-2">30</td>
                        <td className="border px-4 py-2">Rp 500000</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default royalti;