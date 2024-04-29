"use client"
import { useRouter } from "next/navigation";

const register: React.FC = () => {
    const router = useRouter();
    return (
        <div className="flex min-h-screen bg-white text-white-100 flex-col items-center gap-16 font-bold p-48">
              <h1 className="text-3xl font-bold">Register Here</h1>
            <div className="flex flex-col gap-8 w-full justify-center items-center">
                <button type="submit" onClick={() => router.push('/auth/register/pengguna')} className="text-white bg-white-100 text-black font-semibold rounded-lg w-1/4 py-4 ">
                    Pengguna
                </button>
                <button type="submit" onClick={() => router.push('/auth/register/label')} className="text-white bg-white-100 text-black font-semibold rounded-lg w-1/4 py-4 ">
                    Label
                </button>
            </div>
        </div>
    )
}

export default register;