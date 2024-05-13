"use client"
import React, { useRef, useState, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";

interface ModalInputProps {
    isOpen: boolean;
    onClose: () => void;
    podcast: string;
}

const ModalInput: React.FC<ModalInputProps> = ({ isOpen, onClose, podcast }) => {
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(isOpen);
    }, [isOpen]);

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const durationRef = useRef<HTMLInputElement>(null);

    const handleCancel = () => {
        onClose();
    };

    const handleSubmit = () => {
        const title = titleRef.current?.value;
        const description = descriptionRef.current?.value;
        const duration = durationRef.current?.value;

        if (!title || !description || !duration) {
            alert("Please fill in all fields.");
            return;
        }

        onClose();
    };

    return (
        <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md transition-opacity ${modalVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="bg-primary text-white-100 p-4 md:p-8 rounded-lg shadow-md">
                <h2 className="text-lg md:text-2xl font-semibold my-4">Create New Episode</h2>
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    <MdOutlineCancel size={24} />
                </button>

                <label className="block mb-2">Podcast: {podcast}</label>

                <label className="block mb-2">Judul:</label>
                <input
                    type="text"
                    ref={titleRef}
                    className="w-full bg-primary md:w-full border border-gray-300 p-2 rounded mb-4"
                    placeholder="Enter title"
                />

                <label className="block mb-2">Deskripsi:</label>
                <input
                    type="text"
                    ref={descriptionRef}
                    className="w-full bg-primary border border-gray-300 p-2 rounded mb-4"
                    placeholder="Enter description"
                />

                <label className="block mb-2">Durasi:</label>
                <input
                    type="text"
                    ref={durationRef}
                    className="w-full bg-primary border border-gray-300 p-2 rounded mb-4"
                    placeholder="Enter duration"
                />

                <div className="flex justify-end">

                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-primary text-white-100 border-2 font-bold
                        border-green-100 rounded-lg py-2 px-4  mr-2 hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-green-200 rounded-lg px-8 py-2rounded-lg text-white-100 hover:bg-green-100"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalInput;
