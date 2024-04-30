"use client"
import React from 'react'
import Link from "next/link";
import { MdOutlineLogout } from 'react-icons/md';
import { auth } from '../config/firebase';
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import LogoutButton from './LogoutButton';
  const Header = () => {
    const router = useRouter(); 
  return (
    <div className = 'flex justify-between px-4 pt-4'>
        <h2 className='text-2xl text-bold'>DashBoard</h2>
        <h1 className='text-3xl text-bold'>Welcome back !! </h1>    
        <LogoutButton router={router}/>
    </div>
  )
}

export default Header
