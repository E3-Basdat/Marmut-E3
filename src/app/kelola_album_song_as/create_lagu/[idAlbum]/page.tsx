"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { createLagu, fetchArtist, fetchSongwriter, fetchGenre, fetchAlbumName } from "@/app/actions/createLagu";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

const create_lagu: React.FC = () => {
    const { email , isAuthenticated, role } = useAuth();
    const [albumName, setAlbumName] = useState<string[]>([]);
    const [artist, setArtist] = useState<string[]>([]);
    const [songwriters, setSongwriters] = useState<string[]>([]);
    const [selectedSongwriters, setSelectedSongwriters] = useState<string[]>([]);
    const [genres, setGenres] = useState<string[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const router = useRouter();
    const params = useParams();
    const idAlbum = params.idAlbum as string;
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [fetchedArtists, fetchedSongwriters, fetchedGenres] = await Promise.all([
                    fetchArtist(),
                    fetchSongwriter(),
                    fetchGenre(),
                ]);
                setArtist(fetchedArtists);
                setSongwriters(fetchedSongwriters);
                setGenres(fetchedGenres);

            } catch (err) {
                console.error("Failed to fetch data:", err);
                toast.error("Failed to load data");
            }
        };
    
        loadData();
    }, []);

    useEffect(() => {
        if (idAlbum) {
            const fetchAlbumDetails = async () => {
                try {
                    const fetchedAlbumName = await fetchAlbumName(idAlbum);
                    setAlbumName(fetchedAlbumName);
                } catch (err) {
                    console.error("Failed to fetch data:", err);
                    toast.error("Failed to load data");
                }
            };
    
            fetchAlbumDetails();
        }

    }, [idAlbum]);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded && !isAuthenticated) {
            router.push("auth/login");
        }
    }, [isAuthenticated, isLoaded]);

    if (!isAuthenticated || !role.includes('artist') && !role.includes('songwriter')) {
        return <p>Access Denied</p>;
    }

    const handleCheckboxChange = (setter: React.Dispatch<React.SetStateAction<string[]>>, selectedItems: string[]) => (event: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        if (checked) {
            setter([...selectedItems, value]);
        } else {
            setter(selectedItems.filter(item => item !== value));
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        formData.append("songwriters", JSON.stringify(selectedSongwriters));
        formData.append("genres", JSON.stringify(selectedGenres));
        formData.append("idAlbum", idAlbum);

        try {
            await createLagu(formData);
            toast.success("Song created successfully");
            router.replace("/kelola_album_song_as");
        } catch (err) {
            console.error(`Error: ${err}`);
            toast.error("Failed to create song");
        }
    };

    return (
        <div className='flex flex-col items-center gap-16 px-8 py-32 bg-black text-white font-bold min-h-screen'>
            <h1 className="text-3xl">Create Lagu</h1>
            <form className='flex flex-col w-1/2' onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <h3>Album: {albumName}</h3>
                </div>
                <div className='mb-4'>
                    <label>Judul Lagu</label>
                    <input type="text" placeholder="Judul Lagu" name="judulLagu" className="border-2 border-gray-200 rounded-lg w-full py-4 px-3 text-white bg-black" />
                </div>
                <div className='mb-4'>
                    <label>Artist</label>
                    <select name="artist" className="border-2 border-gray-200 rounded-lg w-full py-4 px-3 text-white bg-black">
                        <option value="">Select Artist</option>
                        {artist.map((name, index) => (
                            <option key={index} value={name}>{name}</option>
                        ))}
                    </select>
                </div>
                <p className="text-left text-lg mt-8 mb-4">Songwriter:</p>
                <div className='mb-4'>
                    {songwriters.map((name, index) => (
                        <div key={index}>
                            <label>
                                <input type="checkbox" value={name} checked={selectedSongwriters.includes(name)} onChange={handleCheckboxChange(setSelectedSongwriters, selectedSongwriters)} />
                                {name}
                            </label>
                        </div>
                    ))}
                </div>
                <p className="text-left text-lg mt-8 mb-4">Genre:</p>
                <div className='mb-4'>
                    {genres.map((genre, index) => (
                        <div key={index}>
                            <label>
                                <input type="checkbox" value={genre} checked={selectedGenres.includes(genre)} onChange={handleCheckboxChange(setSelectedGenres, selectedGenres)} />
                                {genre}
                            </label>
                        </div>
                    ))}
                </div>
                <div className='mb-4'>
                    <label>Durasi</label>
                    <input type="durasi" placeholder="Durasi" name="durasi" className="border-2 border-gray-200 rounded-lg w-full py-4 px-3 text-white bg-black" />
                </div>
                <div className='flex justify-center'>
                    <button type="submit" className="bg-green-500 text-white rounded-lg w-1/4 py-4 mt-4">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default create_lagu;
