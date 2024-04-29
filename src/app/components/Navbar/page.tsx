"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";



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
    const [userRole, setUserRole] = useState("normal");
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    // Function to update user role
    const updateUserRole = (role: string) => {
        setUserRole(role);
    };

    const pathname = usePathname();

    return (
        <nav className="fixed w-full text-[#1db954] bg-primary shadow-md">
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
                <div className="flex gap-16 text-center items-center">
                    {userRole === "normal" && (
                        <>
                            <NavLink href="/dashboard" isActive={pathname === "/dashboard"}>
                                Dashboard
                            </NavLink>
                            <NavLink href="/chart" isActive={pathname === "/chart"} >
                                Chart
                            </NavLink>
                            <NavLink href="/search" isActive={pathname === "/search"}>
                                Search Bar
                            </NavLink>
                            <NavLink href="/playlist" isActive={pathname === "/playlist"}>
                                Kelola Playlist
                            </NavLink>
                            <NavLink href="/subscription" isActive={pathname === "/subscription"}>
                                Langganan Paket
                            </NavLink>
                        </>
                    )}

                    {userRole === "premium" && (
                        <NavLink href="/downloaded-songs" isActive={pathname === "/downloaded-songs"}>
                            Kelola Downloaded Songs
                        </NavLink>
                    )}

                    {userRole === "podcaster" && (
                        <NavLink href="/podcast" isActive={pathname === "/podcast"}>
                            Kelola Podcast
                        </NavLink>
                    )}

                    {userRole === "artist" && (
                        <>
                            <NavLink href="/album-and-songs" isActive={pathname === "/album-and-songs"}>
                                Kelola Album & Songs
                            </NavLink>
                            <NavLink href="/royalty" isActive={pathname === "/royalty"}>
                                Cek Royalti
                            </NavLink>
                        </>
                    )}

                    {userRole === "label" && (
                        <NavLink href="/album" isActive={pathname === '/album'}>
                            Kelola Album
                        </NavLink>
                    )}

                    {!isLoggedIn && (
                        <div className="flex flex-row gap-4">
                            <Link href="/auth/login">
                                Login
                            </Link>
                            <Link href="/auth/register">
                                Register
                            </Link>
                        </div>
                    )}

                </div>



            </div>
        </nav>
    );
};

export default Navbar;
