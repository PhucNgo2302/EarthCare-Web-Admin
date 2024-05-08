'use client'
import React, { useEffect, useState } from 'react';
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const TopCards = () => {
    const [userCount, setUserCount] = useState(0);
    const [activityCount, setActivityCount] = useState(0);
    const [locationCount, setLocationCount] = useState(0);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                // Lấy số lượng người dùng
                const usersQuerySnapshot = await getDocs(collection(db, 'users'));
                setUserCount(usersQuerySnapshot.size);

                // Lấy số lượng hoạt động
                const activitiesQuerySnapshot = await getDocs(collection(db, 'activities'));
                setActivityCount(activitiesQuerySnapshot.size);

                // Lấy số lượng địa điểm
                const locationsQuerySnapshot = await getDocs(collection(db, 'locations'));
                setLocationCount(locationsQuerySnapshot.size);
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        };

        fetchCounts();
    }, []);

    return (
        <div className='grid lg:grid-cols-5 gap-4 p-4'>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pd-4'>
                    <p className='text-xl font-bold'>Number of Users</p>
                    <p className='text-gray-600'>{userCount}</p>
                </div>
            </div>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pd-4'>
                    <p className='text-xl font-bold'>Number of Activities</p>
                    <p className='text-gray-600'>{activityCount}</p>
                </div>
            </div>
            <div className=' bg-white flex justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pd-4'>
                    <p className='text-xl font-bold'>Number of Locations</p>
                    <p className='text-gray-600'>{locationCount}</p>
                </div>
            </div>
        </div>
    );
};

export default TopCards;
