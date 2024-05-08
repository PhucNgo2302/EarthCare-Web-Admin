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
        <strong className='text-2xl text-bold'>DashBoard</strong>
          
        <LogoutButton router={router}/>
    </div>
  )
}

export default Header
