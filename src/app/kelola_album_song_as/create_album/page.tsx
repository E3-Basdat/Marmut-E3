"use client"
import React, { useState, useEffect } from "react";
import { createAlbumAS, fetchLabelNames } from "@/app/actions/createAlbumAS";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const create_album: React.FC = () => {
    const [label, setLabel] = useState<string>("");
    const [labels, setLabels] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        const loadLabels = async () => {
            try {
                const fetchedLabels = await fetchLabelNames();
                setLabels(fetchedLabels);
            } catch (err) {
                console.error("Failed to fetch labels:", err);
                toast.error("Failed to load labels");
            }
        };
    
        loadLabels();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);

        try {
            await createAlbumAS(formData);
            toast.success("Album created successfully");
            router.replace("/kelola_album_song_as");
        } catch (err) {
            console.error(`Error: ${err}`);
            toast.error("Failed to create album");
        }
    };

    return (
        <div className='flex flex-col items-center gap-16 px-8 py-32 bg-black text-white font-bold min-h-screen'>
            <h1 className="text-3xl">Create Album</h1>
            <form className='flex flex-col w-1/2' onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <input type="judul" placeholder="Judul" name="judul" className="border-2 border-gray-200 rounded-lg w-full py-4 px-4 text-white bg-black" />
                </div>
                <div className='mb-4'>
                    <select name="label" value={label} onChange={(e) => setLabel(e.target.value)} className="border-2 border-gray-200 rounded-lg w-full py-4 px-3 text-white bg-black">
                        <option value="">Select a Label</option>
                        {labels.map((labelName, index) => (
                            <option key={index} value={labelName}>{labelName}</option>
                        ))}
                    </select>
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