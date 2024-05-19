"use client"
import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

const create_album: React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const [label, setLabel] = useState<string>("");

    const { isAuthenticated, role } = useAuth();
    const [isLoaded, setIsLoaded] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        try {
            
        } catch (err) {
            throw new Error(`Error: ${err}`);
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
        <div className='flex flex-col text-white-100 text-center items-center gap-16 px-8 py-32 bg-white font-bold min-h-screen '>
        <h1 className="text-3xl">Create Lagu</h1>
        <form className='flex flex-col w-1/2' onSubmit={handleSubmit}>
            <div className='mb-4'>
                <input type="text" placeholder="Judul" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4" />
            </div>
        <></>
            <div className='mb-4'>
            <select name="label" value={label} onChange={(e) => setLabel(e.target.value)} className={`font-bold ${label ? 'text-white' : 'text-gray-400'} select-box bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-3`}>
                    <option value="">Label</option>
                    <option value="label1" className="text-white-100">Label1</option>
                    <option value="label2" className="text-white-100">Label2</option>
                    <option value="label3" className="text-white-100">Label3</option>
                </select>
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

export default create_album;