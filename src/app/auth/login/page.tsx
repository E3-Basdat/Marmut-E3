"use client";

import { useRouter } from "next/navigation";

const login: React.FC = () => {
    const router  = useRouter();
    return (
        <div className="flex min-h-screen bg-white text-white-100 flex-col items-center gap-16 font-bold p-48">
            <p className='text-3xl'>Login Form</p>

            <form className='flex flex-col w-1/2 ' >
                <div className='mb-4 '>
                    <label>Email</label>
                    <input type="text" placeholder="marmut@gmail.com" className="bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4" />
                </div>

                <div className='mb-4 '>
                    <label>Password</label>
                    <input type="password" placeholder="marmut123" className="bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4" />
                </div>
                <div className='mb-4 '>
                </div>

                <div className='flex flex-row gap-4'>
                    <button type="button" onClick={()=>router.back()} className="bg-primary text-white-100 border-2 font-bold
                    border-green-100 rounded-lg w-full py-4 mt-4">
                        Back
                    </button>

                    <button type="submit" className="text-white-100 bg-green-100 font-semibold
                    rounded-lg w-full py-4 mt-4">
                        Next
                    </button>
                </div>


            </form>
        </div>
    )
}

export default login;