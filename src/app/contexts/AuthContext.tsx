"use client"
import { loginUser } from "../actions/loginUser";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
    role: ('' | 'pengguna' | 'podcaster' | 'songwriter' | 'artist' | 'label' | 'premium')[];
    email: string;
    idLabel: string;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<('' | 'pengguna' | 'podcaster' | 'songwriter' | 'artist' | 'label' | 'premium')[]>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    role: [''],
    email: '',
    idLabel: '',
    isAuthenticated: false,
    login: (email: string, password: string) => Promise.resolve([]),
    logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const router = useRouter();

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [role, setRole] = useState<('' | 'pengguna' | 'podcaster' | 'songwriter' | 'artist' | 'label' | 'premium')[]>(['']);
    const [email, setEmail] = useState<string>('');
    const [idLabel, setIdLabel] = useState<string>('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedIsAuthenticated = !!storedEmail; 
        setIsAuthenticated(storedIsAuthenticated);
        setRole(localStorage.getItem("role") ? localStorage.getItem("role")?.split(",") as any : ['']);
        setIdLabel(localStorage.getItem("idLabel") || '');
        setEmail(storedEmail || '')
    }, []);

    const login = async (email: string, password: string): Promise<('' | 'pengguna' | 'podcaster' | 'songwriter' | 'artist' | 'label' | 'premium')[]> => {
        try {
            const result = await loginUser(email, password);

            if (result !== null && result.roles[0] !== '') {
                setIsAuthenticated(true);
                setRole(result.roles as ("" | "pengguna" | "podcaster" | "songwriter" | "artist" | 'label' | 'premium')[]);
                setEmail(email);
                setIdLabel(result.idLabel);
                localStorage.setItem('email', email);
                localStorage.setItem("role", result.roles.join());
                localStorage.setItem("idLabel", result.idLabel);
                router.push('/');
                return role;
            } else {
                throw new Error('Failed to login');
            }
    
        } catch (error) {
            console.error("Failed to login:", error);
            throw error;
        }
    };
    
    const logout = () => {
        setIsAuthenticated(false);
        setRole(['']);
        setEmail('');
        setIdLabel('');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        localStorage.removeItem('idLabel');
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, role, email, idLabel }}>
            {children}
        </AuthContext.Provider>
    );
};
