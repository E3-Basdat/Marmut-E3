"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { createAlbumAS, fetchLabelNames, fetchArtist, fetchSongwriter, fetchGenre, fetchSelectedSongwriters } from "@/app/actions/createAlbumAS";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

const create_album: React.FC = () => {
    const { email , isAuthenticated, role } = useAuth();
    const [label, setLabel] = useState<string>("");
    const [labels, setLabels] = useState<string[]>([]);
    const [artist, setArtist] = useState<string[]>([]);
    const [songwriters, setSongwriters] = useState<string[]>([]);
    const [selectedSongwriters, setSelectedSongwriters] = useState<string[]>([]);
    const [genres, setGenres] = useState<string[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (email) {
            const loadData = async () => {
                try {
                    const [fetchedLabels, fetchedArtists, fetchedSongwriters, fetchedGenres, fetchedSelectedSongwriters] = await Promise.all([
                        fetchLabelNames(),
                        fetchArtist(),
                        fetchSongwriter(),
                        fetchGenre(),
                        fetchSelectedSongwriters(email),
                    ]);
                    setLabels(fetchedLabels);
                    setArtist(fetchedArtists);
                    setSongwriters(fetchedSongwriters);
                    setGenres(fetchedGenres);
                    if (role.includes('songwriter')) {
                        setSelectedSongwriters([email]);
                    }

                } catch (err) {
                    console.error("Failed to fetch data:", err);
                    toast.error("Failed to load data");
                }
            };
        
            loadData();
        }
    }, [email, role]);

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

        try {
            await createAlbumAS(formData);
            toast.success("Album and song created successfully");
            router.replace("/kelola_album_song_as");
        } catch (err) {
            console.error(`Error: ${err}`);
            toast.error("Failed to create album");
        }
    };

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

    return (
        <div className='flex flex-col items-center gap-16 px-8 py-32 bg-black text-white font-bold min-h-screen'>
            <h1 className="text-3xl">Create Album</h1>
            <form className='flex flex-col w-1/2' onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label>Judul Album</label>
                    <input type="text" placeholder="Judul Album" name="judulAlbum" className="border-2 border-gray-200 rounded-lg w-full py-4 px-4 text-white bg-black" />
                </div>
                <div className='mb-4'>
                    <label>Label</label>
                    <select name="label" value={label} onChange={(e) => setLabel(e.target.value)} className="border-2 border-gray-200 rounded-lg w-full py-4 px-3 text-white bg-black">
                        <option value="">Select a Label</option>
                        {labels.map((labelName, index) => (
                            <option key={index} value={labelName}>{labelName}</option>
                        ))}
                    </select>
                </div>
                    <h2 className="flex flex-col text-3xl items-center gap-16 px-8 py-10 bg-black text-white font-bold">Lagu Pertama</h2>
                <div className='mb-4'>
                    <label>Judul Lagu</label>
                    <input type="text" placeholder="Judul Lagu" name="judulLagu" className="border-2 border-gray-200 rounded-lg w-full py-4 px-3 text-white bg-black" />
                </div>
                <div className='mb-4'>
                    <label>Artist</label>
                    {role.includes('artist') ? (
                        <input type="text" value={email} readOnly className="border-2 border-gray-200 rounded-lg w-full py-4 px-3 text-white bg-black" />
                    ) : (
                        <select name="artist" className="border-2 border-gray-200 rounded-lg w-full py-4 px-3 text-white bg-black">
                            <option value="">Select Artist</option>
                            {artist.map((name, index) => (
                                <option key={index} value={name}>{name}</option>
                            ))}
                        </select>
                    )}
                </div>
                <p className="text-left text-lg mt-8 mb-4">Songwriter:</p>
                <div className='mb-4'>
                    {songwriters.map((name, index) => (
                        <div key={index}>
                            <label>
                                <input type="checkbox" value={name} checked={selectedSongwriters.includes(name)} onChange={handleCheckboxChange(setSelectedSongwriters, selectedSongwriters)} disabled={role.includes('songwriter') && name === email} />
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

export default create_album;
