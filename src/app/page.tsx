'use client';

import { useRouter } from "next/navigation";
import { useAuth } from "./contexts/AuthContext";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated,role} = useAuth(); 
  return (
    <main className="flex min-h-screen text-white-100 flex-col items-center gap-16 p-48">
      {!isAuthenticated && (
        <>
          <h1 className="text-3xl font-bold">Marmut-E3</h1>
          <div className="flex flex-col gap-8 w-full justify-center items-center">
            <button type="submit" onClick={() => router.push('/auth/login')} className="text-white bg-white-100 text-black font-semibold rounded-lg w-1/4 py-4">
              Login
            </button>
            <button type="submit" onClick={() => router.push('/auth/register')} className="text-white bg-white-100 text-black font-semibold rounded-lg w-1/4 py-4">
              Register
            </button>
          </div>
        </>
      )}
    </main>
  );
}
