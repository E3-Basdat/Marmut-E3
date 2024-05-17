"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { getUserData } from '../actions/getUserData';
import { getAllPodcast } from '../actions/getAllPodcast';


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
                            <h1 className="text-7xl font-bold">Venedict Chen</h1>
                            <div className='flex flex-col gap-4'>
                                <p>{idLabel}</p>
                                <p>{email}</p>
                                {!(role.includes('label')) && (
                                    <div className='flex flex-row'>
                                        <ul className="list-disc pl-4">
                                            <li className="list-item">City: {userData?.kota_asal}</li>
                                            <li className="list-item">Gender: {userData?.gender === 1 ? "Laki-Laki" : "Perempuan"}</li>
                                            <li className="list-item">Place of Birth: {userData?.tempat_lahir}</li>
                                            <li className="list-item">Date of Birth: {userData?.tanggal_lahir.toLocaleDateString()}</li>
                                            <li className="list-item">Role: {role.map(capitalizeWords).join(", ")}</li>
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
                        <div className='flex px-20 justify-center text-center py-10'>
                            {/* {!role.includes('label') && <Playlist />} */}
                            {/* {role.includes('songwriter') || role.includes('artist') && <Songs />} */}
                            {role.includes('podcaster') && <Podcast />}
                            {/* {role.includes('label')  && <Album />} */}
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

// function Playlist() {
//     const isNotNone = false;
//     return (
//       isNotNone ? (<div className="flex w-full flex-col items-center">
//         <h1>Playlist Pengguna</h1>
//         <table className="table">
//           <thead>
//             <tr>
//               <td>Nama</td>
//               <td>Actions</td>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Playlist 1</td>
//               <td><Link href="#">[Lihat]</Link></td>
//             </tr>
//             <tr>
//               <td>Playlist 2</td>
//               <td><Link href="#">[Lihat]</Link></td>
//             </tr>
//             <tr>
//               <td>Playlist 2</td>
//               <td><Link href="#">[Lihat]</Link></td>
//             </tr>
//           </tbody>
//         </table>
//       </div>) : (
//         <p>Playlist: "Belum Memiliki Playlist".</p>
//       )
//     )
//   }

//   function Songs() {
//     const isNotNone = false;
//     return (isNotNone ? (<div className="flex w-full flex-col items-center">
//       <h1>Lagu Pengguna</h1>
//       <table className="table">
//         <thead>
//           <tr>
//             <td>Judul</td>
//             <td>Actions</td>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Lagu 1</td>
//             <td><Link href="#">[Lihat]</Link></td>
//           </tr>
//           <tr>
//             <td>Lagu 2</td>
//             <td><Link href="#">[Lihat]</Link></td>
//           </tr>
//           <tr>
//             <td>Lagu 2</td>
//             <td><Link href="#">[Lihat]</Link></td>
//           </tr>
//         </tbody>
//       </table>
//     </div>) : (
//       <p>Lagu: "Belum Memiliki Lagu".</p>
//     ))
//   }

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
//   async function Album() {
//     const user = await checkUser();
//     const result = await sql`
//       SELECT a.judul, a.id
//       FROM album a
//       JOIN label la ON a.id_label = la.id
//       WHERE la.email = ${user?.email}
//     `;

//     const albums = result.rows;
//     const isNotNone = albums.length > 0; //penanda ada isinya

//     return (
//       <div className="flex w-full flex-col items-center">
//         <h1>Album</h1>
//         {isNotNone ? (
//           <table className="table">
//             <thead>
//               <tr>
//                 <td>Judul</td>
//                 <td>Actions</td>
//               </tr>
//             </thead>
//             <tbody>
//               {albums.map((album, index) => (
//                 <tr key={index}>
//                   <td>{album.judul}</td>
//                   <td>
//                     <Link href={`/album-song/label/${album.id}`}>[Lihat]</Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p>Album: "Belum Memproduksi Album".</p>
//         )}
//       </div>
//     );
//   }

export default Dashboard;
