"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { loginUser } from "@/app/actions/loginUser";
import { useAuth } from "@/app/contexts/AuthContext";
import toast from "react-hot-toast";

const Login: React.FC = () => {
    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        try {
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            toast.success(`Hello ${email}`)
            router.push('/dashboard')


        } catch (error){
            console.error("Failed to login");
        }
    }
    return (
        <div className="flex min-h-screen bg-white text-white-100 flex-col items-center gap-16 font-bold p-48">
            <p className='text-3xl'>Login Form</p>

            <form className='flex flex-col w-1/2 ' onSubmit={handleSubmit}>
                <div className='mb-4 '>
                    <label>Email</label>
                    <input type="text" placeholder="marmut@gmail.com" name="email" className="bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4" />
                </div>

                <div className='mb-4 '>
                    <label>Password</label>
                    <input type="password" placeholder="marmut123" name="password" className="bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4" />
                </div>
                <div className='mb-4 '>
                </div>

                <div className='flex flex-row gap-4'>
                    <button type="button" onClick={() => router.back()} className="bg-primary text-white-100 border-2 font-bold
                    border-green-100 rounded-lg w-full py-4 mt-4">
                        Back
                    </button>

                    <button type="submit" className="text-white-100 bg-green-100 font-semibold
                    rounded-lg w-full py-4 mt-4">
                        Login
                    </button>
                </div>


            </form>
        </div>
    )
}

export default Login;