import React from 'react'
import Link from "next/link";
import { MdOutlineLogout } from 'react-icons/md';
const Header = () => {
  return (
    <div className = 'flex justify-between px-4 pt-4'>
        <h2 className='text-2xl text-bold'>DashBoard</h2>
        <h1 className='text-3xl text-bold'>Welcome back !! </h1>    
    
        <Link href="/login"> 
            <button className = 'align-middle flex font-bold bg-cyan-400 text-center hover:text-white-400 cursor-pointer text-xs py-3 border rounded-lg text-blue-gray-500 px-4 '>
                <MdOutlineLogout size={17} className='mr-1'/>
                Logout
            </button>
        </Link>
    </div>
  )
}

export default Header
