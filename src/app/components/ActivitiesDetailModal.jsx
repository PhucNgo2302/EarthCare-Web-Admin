'use client'
import React, { useState, useEffect } from 'react';
import { MdClose, MdLocationOn, MdDateRange, MdAccessTime, MdPerson, MdDescription } from 'react-icons/md'; // Import biểu tượng cho người dùng và mô tả
import { collection, getDocs, query, where, orderBy ,doc, updateDoc} from "firebase/firestore";
import { db } from "../config/firebase";

const ActivityDetailModal = ({ activity, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [userName, setUserName] = useState('');
  const [showFullDescriptionModal, setShowFullDescriptionModal] = useState(false);

  const handleClickImage = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        if (activity.userId) {
          const userDocRef = doc(db, "users", activity.userId);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserName(userData.name);
          } else {
            setUserName("Unknown User");
          }
        } else {
          setUserName("Unknown User");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserName("Unknown User");
      }
    };
  
    fetchUserName();
  }, [activity.userId]);

  const handleToggleDescriptionModal = () => {
    setShowFullDescriptionModal(!showFullDescriptionModal);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 max-h-screen">
      <div className="bg-white p-8 rounded-lg relative w-11/12 md:w-3/4 lg:w-2/3 overflow-y-auto"> {/* Thay đổi overflow-y-auto */}
        <button onClick={onClose} className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700">
          <MdClose className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-semibold mb-4">{activity.name}</h2>
        <p className="mb-2 flex items-center"><MdLocationOn size={24} className="mr-2" /> <strong>Address: </strong> {activity.address}</p>
        <p className="mb-2 flex items-center"><MdDateRange size={24} className="mr-2" /> <strong>Start Date: </strong> {activity.startDateTime}</p>
        <p className="mb-2 flex items-center"><MdDateRange size={24} className="mr-2" /> <strong>End Date: </strong> {activity.endDateTime}</p>
        <p className="mb-2 flex items-center"><MdAccessTime size={24} className="mr-2" /> <strong>Hours Start:</strong> {activity.hoursStart}</p>
        <p className="mb-2 flex items-center"><MdPerson size={24} className="mr-2" /> <strong>Organizer: </strong> {userName}</p>
        <button onClick={handleToggleDescriptionModal} className="mb-2 flex items-center text-blue-500 hover:underline">
          <MdDescription size={24} className="mr-2" />
          <strong>Description</strong>
        </button>
        <div className="flex flex-wrap mb-4">
          {activity.image.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className="w-1/2 md:w-1/3 p-1 cursor-pointer"
              onClick={() => handleClickImage(image)}
            />
          ))}
        </div>
        {selectedImage && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleCloseModal}></div>
            <div className="absolute p-4">
              <img src={selectedImage} alt="Selected Image" className="max-w-screen max-h-screen" />
            </div>
          </div>
        )}
        {showFullDescriptionModal && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="absolute h-full top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleToggleDescriptionModal}></div>
            <div className="bg-white p-8 rounded-lg relative w-11/12 md:w-4/5 lg:w-3/5 overflow-y-auto"> {/* Điều chỉnh kích thước modal */}
              <button onClick={handleToggleDescriptionModal} className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700">
                <MdClose className="h-6 w-6" />
              </button>
              <h2 className="text-xl font-semibold mb-4">{activity.name}</h2>
              <p className="mb-2 flex items-center"><MdDescription size={24} className="mr-2" /><strong>Description</strong></p>
              <article className="break-words">
                <p className="mb-2 text-gray-700 overscroll-auto whitespace-pre-line">{activity.description}</p>
              </article>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityDetailModal;
