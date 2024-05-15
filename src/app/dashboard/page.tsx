"use client"

import React from 'react';
import { useState } from "react";
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
    const [user, setUser] = useState("podcaster");
    const [userData, setUserData] = useState({
        city: "Your City",
        gender: "Male",
        placeOfBirth: "Your Place of Birth",
        dateOfBirth: "Your Date of Birth",
        role: "Artist, Songwriter"
    });
    const {email,idLabel} = useAuth();
    console.log("ini")
    console.log(email);
    return (
        <div>
            <div className="flex flex-col text-white-100 py-24 min-h-screen gap-4">
                <div className="black-gradient px-20 py-24">
                    <p>Profile</p>
                    <h1 className="text-7xl font-bold">Venedict Chen</h1>
                    <div className='flex flex-col gap-4'>
                        <p>{idLabel}</p>
                        <p>{email}</p>
                        {!(user==="label") && (
                            <div className='flex flex-row'>
                                <ul className="list-disc pl-4">
                                    <li className="list-item">City: {userData.city}</li>
                                    <li className="list-item">Gender: {userData.gender}</li>
                                    <li className="list-item">Place of Birth: {userData.placeOfBirth}</li>
                                    <li className="list-item">Date of Birth: {userData.dateOfBirth}</li>
                                    <li className="list-item">Role: {userData.role}</li>
                                </ul>
                            </div>
                        )}

                        {user === "label" && (
                            <div className='flex flex-row'>
                                <ul className="list-disc pl-4">
                                    <li className="list-item">Contact: 08112374874</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex justify-center text-center py-24'>
                    {user === "normal" && (
                        <p className='text-5xl font-bold'>Belum Memiliki Playlist</p>
                    )}

                    {(user === "artist" || user === "songwriter") && (
                        <p className='text-5xl font-bold'>Belum Memiliki Lagu</p>
                    )}

                    {user === "podcaster" && (
                        <p className='text-5xl font-bold'>Belum Memiliki Podcast</p>
                    )}

                    {user === "label" && (
                        <p className='text-5xl font-bold'>Belum Memproduksi Album</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
