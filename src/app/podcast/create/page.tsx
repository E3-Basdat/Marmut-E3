"use client"
import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
type OptionType = { label: string; value: string };

const CreatePodcastPage: React.FC = () => {
    const [selectedGenres, setSelectedGenres] = useState<OptionType[]>([]);

    const genreOptions = [
        { value: 'Education', label: 'Education' },
        { value: 'Lifestyle', label: 'Lifestyle' },
        { value: 'Culture', label: 'Culture' },
        { value: 'Storytelling', label: 'Storytelling' },
        { value: 'Comedy', label: 'Comedy' },
        { value: 'Literature', label: 'Literature' },
        { value: 'Mystery', label: 'Mystery' },
        { value: 'Current Affairs', label: 'Current Affairs' }
    ];

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
        formData.append('genre', JSON.stringify(genreValues));
        console.log(formData.get('genre'));
    };

    const animatedComponents = makeAnimated();

    return (
        <div className='flex flex-col text-white-100 text-center items-center gap-16 px-8 py-32 bg-white font-bold min-h-screen '>
            <h1 className="text-3xl">Create Podcast</h1>
            <form className='flex flex-col w-1/2 text-left' onSubmit={handleSubmit}>
                <div className='mb-4 '>
                    <label>Judul</label>
                    <input type="text" placeholder="Judul" name="judul" className="bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4" />
                </div>
                <p className="text-left text-lg mb-4">Genre:</p>
                <div className="border-2 border-gray-200 rounded-lg mb-4">
                    <Select
                        options={genreOptions}
                        isMulti
                        value={selectedGenres}
                        onChange={handleGenreChange}
                        className="basic-multi-select text-black"
                        classNamePrefix="select"
                        styles={customStyles}
                    />
                </div>
                <div className='mb-4 '>
                    <label>Durasi (in minute)</label>
                    <input type="text" placeholder="Durasi" name="durasi" className="bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4" />
                </div>
                <div className='flex flex-row gap-4 justify-center'>
                    <button type="submit" className="font-bold bg-green-100  text-white-100 rounded-lg w-1/4 py-4 mt-4">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatePodcastPage;
