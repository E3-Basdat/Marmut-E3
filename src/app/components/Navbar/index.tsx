"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import React from "react";

interface NavLinkProps {
    href: string; // Specify href as a string type
    isActive: boolean;
    children: React.ReactNode;
}

function NavLink({ href, isActive, children }: NavLinkProps) {
    return (
        <a className={`transition-opacity px-3 py-1 rounded-full ${isActive ? "active underline font-bold bg-red-primary hover:opacity-70" : "hover:text-red-primary"} `} href={href}>
            {children}
        </a>
    );
}


const Navbar = () => {
    const { isAuthenticated, role, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        setIsLoaded(true);
    }, []);
    return (
        <nav className="fixed z-40 w-full text-[#1db954] bg-primary shadow-md">
            <div className="flex justify-between px-12 py-4 font-bold ">
                <div className="flex flex-ro items-center">
                    <NavLink href="/" isActive={pathname === "/"}>
                        <Image
                            src={'/landing.svg'}
                            alt="marmut logo"
                            className="cursor-pointer"
                            width={50}
                            height={60}
                        />
                    </NavLink>

                    <h1 className="pl-2 text-center text-2xl font-bold text-[#1db954]">Marmut</h1>
                </div>
                <div className="flex gap-14 text-center items-center">
                    {isLoaded &&
                        <>
                            {isAuthenticated ? (
                                <>
                                    {role.includes("pengguna") && (
                                        <>
                                            <NavLink href="/dashboard" isActive={pathname === "/dashboard"}>
                                                Dashboard
                                            </NavLink>
                                            <NavLink href="/chart" isActive={pathname === "/chart"}>
                                                Chart
                                            </NavLink>
                                            <NavLink href="/searchbar" isActive={pathname === "/searchbar"}>
                                                Search Bar
                                            </NavLink>
                                            <NavLink href="/kelola_playlist" isActive={pathname === "/kelola_playlist"}>
                                                Kelola Playlist
                                            </NavLink>
                                            <NavLink href="/langganan" isActive={pathname === "/langganan"}>
                                                Langganan Paket
                                            </NavLink>
                                        </>
                                    )}
                                    {role.includes("premium") && (
                                        <NavLink href="/downloadedsongs" isActive={pathname === "/downloadedsongs"}>
                                            Kelola Downloaded Songs
                                        </NavLink>
                                    )}
                                    {role.includes("podcaster") && (
                                        <NavLink href="/podcast/create" isActive={pathname === "/podcast/create"}>
                                            Kelola Podcast
                                        </NavLink>
                                    )}
                                    {(role.includes("artist") || role.includes("songwriter")) && (
                                        <NavLink href="/kelola_album_song_as" isActive={pathname === "/kelola_album_song_as"}>
                                            Kelola Album & Songs
                                        </NavLink>
                                    )}
                                    {role.includes("label") && (
                                        <NavLink href="/kelola_album_song_l" isActive={pathname === '/kelola_album_song_l'}>
                                            Kelola Album
                                        </NavLink>
                                    )}
                                    {(role.includes("artist") || role.includes("songwriter") || role.includes("label")) && (
                                        <NavLink href="/royalti" isActive={pathname === "/royalti"}>
                                            Cek Royalti
                                        </NavLink>
                                    )}
                                    <button className="px-4 py-2 bg-green-200 rounded-lg text-white-100" onClick={logout}>
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-row gap-4">
                                    <button className="px-4 py-2 bg-green-200 rounded-lg text-white-100" onClick={() => router.push("/auth/login")}>
                                        Login
                                    </button>
                                    <button className="px-4 py-2 bg-green-200 rounded-lg text-white-100" onClick={() => router.push("/auth/register")}>
                                        Register
                                    </button>
                                </div>
                            )}
                        </>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;