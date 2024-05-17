"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { playSong } from "@/app/actions/playSong"; // Adjust the import path as necessary

const PlaySong = ({ params }: { params: { playSongId: string } }) => {
    const router = useRouter();
    const [play, setPlay] = useState(50);
    const [showAddToPlaylistPopup, setShowAddToPlaylistPopup] = useState(false);
    const [showDownloadPopup, setShowDownloadPopup] = useState(false);
    const [messageConfirmPlaylist, setMessage] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState("");
    const [songData, setSongData] = useState<any>(null);

    useEffect(() => {
        const fetchSongData = async () => {
            try {
                if (params.playSongId) {
                    const song = await playSong(params.playSongId); 
                    console.log(song);
                    setSongData(song); 
                } else {
                    console.error("Invalid song ID");
                }
            } catch (error) {
                console.error("Failed to fetch song:", error);
            }
        };
    
        fetchSongData();
    }, [params.playSongId]); // Add playSongId as dependency to re-fetch when it changes
    
    const handleChangeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlay(Number(event.target.value));
    };

    const handleAddToPlaylistClick = () => {
        setShowAddToPlaylistPopup(true);
    };

    const handleDownloadClick = () => {
        setShowDownloadPopup(true);
    };

    const handlePlaylistChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPlaylist(event.target.value);
    };

    const messageNotification = () => {
        setMessage(true);
    };

    const handlePlayClick = () => {
        const audioPlayer = document.getElementById("audioPlayer") as HTMLAudioElement;
        if (audioPlayer) {
            audioPlayer.volume = play / 100; // Set volume before playing
            audioPlayer.play();
        }
    };

    return (
        <div className="flex min-h-screen bg-white text-white-100 flex-col items-center gap-16 font-bold p-48">
            <h1 className="text-3xl">Song Detail</h1>
            {songData ? (
                <div className="flex flex-col justify-start w-full">
                    <div className="mb-2 text-left"><span className="font-bold">Judul:</span> {songData.judul}</div>
                    <div className="mb-2 text-left"><span className="font-bold">Tanggal Rilis:</span> {songData.tanggal_rilis.toString()}</div>
                    <div className="mb-2 text-left"><span className="font-bold">Tahun:</span> {songData.tahun}</div>
                    <div className="mb-2 text-left"><span className="font-bold">Durasi:</span> {songData.durasi}</div>
                    <div className="mb-2 text-left"><span className="font-bold">Total Play:</span> {songData.total_play}</div>
                    <div className="mb-2 text-left"><span className="font-bold">Album:</span> {songData.judul_album}</div>
                    <div className="mb-2 text-left"><span className="font-bold">Penulis:</span> {songData.nama_penulis}</div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
            <div className="flex flex-col gap-8 w-full justify-center items-center">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={play}
                    onChange={handleChangeVolume}
                    className="w-1/4"
                />
                <button onClick={handlePlayClick} className="bg-green-500 hover:bg-green-700 text-white font-semibold rounded-lg py-4 w-1/4">
                    Play
                </button>
                <div className="flex w-1/4 justify-between">
                    <button onClick={handleAddToPlaylistClick} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg py-4 w-1/2">
                        Add To Playlist
                    </button>
                    <button onClick={handleDownloadClick} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg py-4 w-1/2 ml-2">
                        Download
                    </button>
                </div>
                <button onClick={() => router.back()} className="bg-gray-500 hover:bg-gray-700 text-white font-semibold rounded-lg py-4 w-1/4">
                    Kembali
                </button>
            </div>

            {/* Add To Playlist Popup */}
            {showAddToPlaylistPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="text-2xl mb-4">Add To Playlist Popup</h2>
                        <div className="flex items-center">
                            <select 
                                onChange={handlePlaylistChange} 
                                className="mr-4 text-black appearance-none w-48" // Adjust width here
                            >
                                <option value="" className="text-gray-400">Pilih Playlist</option>
                                <option value="playlist1">Playlist 1</option>
                                <option value="playlist2">Playlist 2</option>
                                <option value="playlist3">Playlist 3</option>
                            </select>
                            <button onClick={messageNotification} className="bg-green-500 hover:bg-green-700 text-white font-semibold rounded-lg py-2 px-4" disabled={!selectedPlaylist}>
                                Tambah
                            </button>
                        </div>
                        <button onClick={() => setShowAddToPlaylistPopup(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-semibold rounded-lg py-2 px-4 mt-4">
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Download Popup */}
            {showDownloadPopup && songData && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="text-2xl mb-4">Berhasil mengunduh Lagu dengan judul {songData.judul}!</h2>
                        <div className="flex flex-col gap-4">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-semibold rounded-lg py-2 px-4">
                                Lihat Daftar Download
                            </button>
                            <button onClick={() => setShowDownloadPopup(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-semibold rounded-lg py-2 px-4">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {messageConfirmPlaylist && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="text-2xl mb-4">Lagu telah ditambahkan ke playlist yang Anda pilih</h2>
                        <button onClick={() => setMessage(false)} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 px-4 mr-4">
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PlaySong;