'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { RxDashboard } from 'react-icons/rx';
import { FaRegUser } from 'react-icons/fa';
import { LuUserX } from "react-icons/lu";
import { MdEvent } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

const SideBar = ({ children }) => {
    const [activeButton, setActiveButton] = useState(null);

    useEffect(() => {
        // Load trạng thái active từ Local Storage nếu có
        const activeButtonFromLocalStorage = localStorage.getItem('activeButton');
        if (activeButtonFromLocalStorage) {
            setActiveButton(activeButtonFromLocalStorage);
        }
    }, []);

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        // Lưu trạng thái active vào Local Storage
        localStorage.setItem('activeButton', buttonName);
    };

    return (
        <div className="flex">
            <div className="fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
                <div className="flex flex-col items-center">
                    <Link href="/">
                        <div
                            className={`text-cyan-400 bg-white inline-block rounded-lg p-3 ${activeButton === 'dashboard' ? 'bg-gray-100 text-cyan-400 ' : ''}`}
                            onClick={() => handleButtonClick('dashboard')}
                        >
                            <RxDashboard size={24} />
                        </div>
                    </Link>
                    <span className="border-b-[1px] border-gray-300 w-full p-2"></span>
                    <Link href="/dashboard">
                        <div
                            className={`bg-gray-100 text-white-400 hover:text-cyan-400 cursor-pointer my-4 p-3 rounded-lg inline-block ${activeButton === 'user' ? 'bg-gray-100 text-cyan-400                       ' : ''}`}
                            onClick={() => handleButtonClick('user')}
                        >
                            <FaRegUser size={24} />
                        </div>
                    </Link>
                    <Link href="/dashboard/ban_users">
                        <div
                            className={`bg-gray-100 text-white-400 hover:text-cyan-400 cursor-pointer my-4 p-3 rounded-lg inline-block ${activeButton === 'banUsers' ? 'bg-gray-100 text-cyan-400' : ''}`}
                            onClick={() => handleButtonClick('banUsers')}
                        >
                            <LuUserX size={24} />
                        </div>
                    </Link>
                    <Link href="/dashboard/activites">
                        <div
                            className={`bg-gray-100 text-white-400 hover:text-cyan-400 cursor-pointer my-4 p-3 rounded-lg inline-block ${activeButton === 'activities' ? 'bg-gray-100 text-cyan-400' : ''}`}
                            onClick={() => handleButtonClick('activities')}
                        >
                            <MdEvent size={24} />
                        </div>
                    </Link>
                    <Link href="/dashboard/map">
                        <div
                            className={`bg-gray-100 text-white-400 hover:text-cyan-400 cursor-pointer my-4 p-3 rounded-lg inline-block ${activeButton === 'another' ? 'bg-gray-100 text-cyan-400' : ''}`}
                            onClick={() => handleButtonClick('another')}
                        >
                            <IoLocationOutline size={24} />
                        </div>
                    </Link>
                </div>
            </div>
            <main className="ml-20 w-full">{children}</main>
        </div>
    );
};

export default SideBar;
