"use client"
import { CreatePodcast } from '@/app/actions/CreatePodcast';
import { getGenre } from '@/app/actions/getGenre';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';

type OptionType = { label: string; value: string };

const CreatePodcastPage: React.FC = () => {
    const [selectedGenres, setSelectedGenres] = useState<OptionType[]>([]);
    const [genreOptions, setGenreOptions] = useState<OptionType[]>([]);
    const id = Date.now().toString();
    const [isMounted, setIsMounted] = useState(false);
    const {email} = useAuth()
    const router = useRouter()

    useEffect(() => {
        setIsMounted(true);

        const fetchGenres = async () => {
            try {
                const genres = await getGenre();
                const options = genres.map((item) => ({
                    value: item.genre,
                    label: item.genre,
                }));
                setGenreOptions(options);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, []);
    const customStyles = {
        control: (styles: any) => ({
            ...styles,
            backgroundColor: '#191414',
            color: 'white',
            border: 0,
            padding: '10px',
            boxShadow: 'none'
        }),
        option: (styles: any) => ({
            ...styles,
            backgroundColor: '#191414',
            color: 'white',
        }),
        multiValue: (styles: any) => ({
            ...styles,
            backgroundColor: '#FFFFFF',
            color: 'black',
        }),
    };

    const handleGenreChange = (selectedOptions: any) => {
        setSelectedGenres(selectedOptions);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const genreValues = selectedGenres.map((genre) => genre.value);
        genreValues.forEach((genre) => {
            formData.append('genre', genre);
        });
        if(email){
            formData.append('email', email);
        }
        try{
            await CreatePodcast(formData);
            toast.success('Podcast created successfully');
            router.push('/podcast/list');
        }
        catch(err){
            console.error(err);
            toast.error("Failed to create podcast");
        }
    };

    return isMounted ? (
        <div className='flex flex-col text-white-100 text-center items-center gap-16 px-8 py-32 bg-white font-bold min-h-screen'>
            <h1 className="text-3xl">Create Podcast</h1>
            <form className='flex flex-col w-1/2 text-left' onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label>Judul</label>
                    <input type="text" placeholder="Judul" name="judul" className="bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4" />
                </div>
                <p className="text-left text-lg mb-4">Genre:</p>
                <div className="border-2 border-gray-200 rounded-lg mb-4">
                    <Select
                        id={id}
                        options={genreOptions}
                        isMulti
                        value={selectedGenres}
                        onChange={handleGenreChange}
                        className="basic-multi-select text-black"
                        classNamePrefix="select"
                        styles={customStyles}
                    />
                </div>
                <div className='flex flex-row gap-4 justify-center'>
                    <button type="submit" className="font-bold bg-green-100 text-white-100 rounded-lg w-1/4 py-4 mt-4">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    ) : null;
}

export default CreatePodcastPage;
