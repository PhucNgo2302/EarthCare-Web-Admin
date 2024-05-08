import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../config/firebase';
import { MdOutlineLogout } from 'react-icons/md';

const LogoutButton = ({ router }:{router : any}) => {
    const handerSignOut = async () => {
        await signOut(auth);
        router.push('/');
    };

    return (
        <button onClick={handerSignOut} className='align-middle flex font-bold bg-cyan-400 text-center hover:bg-cyan-500 cursor-pointer text-xs py-3 border rounded-lg text-blue-gray-500 px-4 '>
            <MdOutlineLogout size={17} className='mr-1'/>
            Logout
        </button>
    );
};

export default LogoutButton;