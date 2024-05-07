import React from 'react'
import Link from 'next/link';
import { Image } from "next/image";
import { RxDashboard } from 'react-icons/rx';
import { FaRegUser } from 'react-icons/fa';
import { CiMap } from 'react-icons/ci';

import { LuUserX } from "react-icons/lu";
import { MdEvent } from "react-icons/md";


const SideBar = ({children}) => {
  return (
    <div className="flex">
        <div className="fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
            <div className="flex flex-col items-center">
                <Link href="/">
                    <div className="text-cyan-400 bg-white inline-block rounded-lg p-3">
                        <RxDashboard size = {24} />
                    </div>  
                </Link>
                <span className="border-b-[1px] border-gray-300 w-full p-2"></span>
                <Link href="/dashboard">
                    <div className="bg-gray-100 text-white-400 hover:text-cyan-400 cursor-pointer my-4 p-3 rounded-lg inline-block">
                        <FaRegUser size={24}/>
                    </div>
                </Link>
                <Link href="/dashboard/ban_users">
                    <div className="bg-gray-100 text-white-400 hover:text-cyan-400 cursor-pointer my-4 p-3 rounded-lg inline-block">
                        <LuUserX size={24}/>
                    </div>
                </Link>
                <Link href="/dashboard/activites">
                    <div className="bg-gray-100 text-white-400 hover:text-cyan-400 cursor-pointer my-4 p-3 rounded-lg inline-block">
                        <MdEvent size={24}/>
                    </div>
                </Link>
                <Link href="/">
                    <div className="bg-gray-100 text-white-400 hover:text-cyan-400 cursor-pointer my-4 p-3 rounded-lg inline-block">
                        <FaRegUser size={24}/>
                    </div>
                </Link>
            </div>
        </div>    
        <main className="ml-20 w-full">{children}</main>    
    </div>
  )
}

export default SideBar
