'use client'
import React, { useEffect, useState } from 'react';
import { db } from "../config/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { formatDistanceToNow } from 'date-fns';
import ActivityDetailModal from './ActivitiesDetailModal'; 

const RecentCard = () => {
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null); // Trạng thái lưu trữ hoạt động được chọn

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const q = query(collection(db, 'activities'), orderBy('createdAt'));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const activityList = [];
                    querySnapshot.forEach((doc) => {
                        activityList.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });
                    setActivities(activityList);
                } else {
                    console.log('No activities found.');
                }
            } catch (error) {
                console.error("Error fetching activities: ", error);
            }
        };

        fetchActivities();
    }, []);

    const handleActivityClick = (activity) => {
        setSelectedActivity(activity); // Thiết lập hoạt động được chọn khi người dùng click
    };

    const handleCloseModal = () => {
        setSelectedActivity(null); // Đóng modal khi người dùng click vào nút đóng
    };

    return (
        <div        className="w-full col-span-1 lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll">
            <strong className='text-bold'>Recent Added Activity</strong>
            <ul>
                {activities.map((activity) => {     
                    const createdAt = new Date(activity.createdAt.seconds * 1000);
                    const distanceToNow = formatDistanceToNow(createdAt, { addSuffix: true });
                    return (
                        <li key={activity.id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer' onClick={() => handleActivityClick(activity)}>
                            <div className='bg-cyan-100 rounded-lg p-3'>
                                <MdOutlineEmojiEvents className='text-cyan-500' />      
                            </div>
                            <div className='pl-4'>
                                <p className='text-gray-800 font-bold'>{activity.name}</p>
                                <p className='text-gray-400 text-sm'>{activity.startDateTime}</p>

                            </div>
                            <div>
                                <p className='lg:flex md:hidden right-3 text-gray-600 text-sm p-3 ml-28'>{distanceToNow}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
            {/* Hiển thị modal chi tiết nếu hoạt động được chọn */}
            {selectedActivity && <ActivityDetailModal activity={selectedActivity} onClose={handleCloseModal} />}
        </div>
    );
};

export default RecentCard;
