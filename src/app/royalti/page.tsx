"use client"
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { getRoyaltiArtist, getRoyaltiLabel, getRoyaltiSongwriter } from "../actions/cekRoyalti";
import toast from "react-hot-toast";

interface Royalti {
    judulLagu: string;
    judulAlbum: string;
    totalPlay: number;
    totalDownload: number;
    totalRoyalti: number;
}

const royalti: React.FC = () => {
    const router = useRouter();
    const { email, isAuthenticated, role} = useAuth();
    const [isLoaded, setIsLoaded] = useState(false);

    const [royalti, setRoyalti] = useState<Royalti[]>([]);
    
    useEffect(() => {
        const loadData = async () => {
            try {            
                if (role.includes('artist')) {
                    const fetchedRoyalti = await getRoyaltiArtist(email);
                    setRoyalti(fetchedRoyalti);
                } else if (role.includes('songwriter')) {
                    const fetchedRoyalti = await getRoyaltiSongwriter(email);
                    setRoyalti(fetchedRoyalti);
                } else if (role.includes('label')) {
                    const fetchedRoyalti = await getRoyaltiLabel(email);
                    setRoyalti(fetchedRoyalti);
                }
            } catch (err) {
                console.error("Failed to fetch data:", err);
                toast.error("Failed to load data");
            }
        };

        loadData();
    }, [email, role, isAuthenticated]);


    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded && !isAuthenticated) {
            router.push("auth/login");
        }
    }, [isAuthenticated, isLoaded]);

    if (!isAuthenticated || !role.includes('artist') || !role.includes('songwriter') || !role.includes('label')) {
        return <p>Access Denied</p>;
    }
    
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
                    {royalti.map((r, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{r.judulLagu}</td>
                            <td className="border px-4 py-2">{r.judulAlbum}</td>
                            <td className="border px-4 py-2">{r.totalPlay}</td>
                            <td className="border px-4 py-2">{r.totalDownload}</td>
                            <td className="border px-4 py-2">Rp {r.totalRoyalti}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default royalti;