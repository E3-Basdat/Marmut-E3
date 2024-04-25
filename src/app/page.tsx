'use client';

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen bg-white text-black flex-col items-center gap-16 justify-center p-24">
      <h1 className="text-3xl font-bold">Marmut-E3</h1>
      <div className="flex flex-col gap-8 w-full justify-center items-center">
      <button type="submit" onClick={()=>router.push('/auth/login')} className="text-white bg-[#355c7d] font-semibold rounded-lg w-1/4 py-4 ">
        Login
      </button>
      <button type="submit" className="text-white bg-[#355c7d] font-semibold rounded-lg w-1/4 py-4 ">
        Register
      </button>

      </div>
    </main>
  );
}
