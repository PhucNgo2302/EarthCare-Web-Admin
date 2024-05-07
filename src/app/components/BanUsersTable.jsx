'use client'
import React, { useEffect, useState } from 'react';
import { db } from "../config/firebase";
import { collection, getDocs, query, where, orderBy, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { FaUserCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import ReactPaginate from 'react-paginate';

const BanUsersTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false); // State to control confirmation dialog
  const [userToUnban, setUserToUnban] = useState(null); // State to store user to unban

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const usersCollectionRef = collection(db, "users");

  const getAvatarURL = async (avatarPath) => {
    const storage = getStorage();
    const avatarRef = ref(storage, avatarPath);
    try {
      const url = await getDownloadURL(avatarRef);
      return url;
    } catch (error) {
      console.error("Error getting avatar URL:", error);
      return null;
    }
  };

  const handleSearch = async () => {
    try {
      let q;
      if (searchTerm) {
        q = query(usersCollectionRef, where("name", "==", searchTerm), where("role", "==", 1), where("ban", "==", true), orderBy("name"));
      } else {
        q = query(usersCollectionRef, where("role", "==", 1), where("ban", "==", true), orderBy("name"));
      }
      const querySnapshot = await getDocs(q);
      const formattedUsers = await Promise.all(querySnapshot.docs.map(async (doc) => {
        const user = doc.data();
        const createdAt = user.created_at.toDate().toLocaleString();
        const avatarURL = user.avatar !== "none" ? await getAvatarURL(user.avatar) : null;
        return { ...user, created_at: createdAt, avatarURL, id: doc.id }; // Add id field to user object
      }));
      setUsers(formattedUsers);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleUnbanClick = (user) => {
    setUserToUnban(user);
    setShowConfirmation(true);
  };

  const handleConfirmUnban = async () => {
    try {
      // Perform unban action here by updating the user document in Firestore
      const userRef = doc(db, "users", userToUnban.id);
      await updateDoc(userRef, { ban: false });
      // Close confirmation dialog
      setShowConfirmation(false);
      // Refresh user list
      handleSearch();
    } catch (error) {
      console.error("Error unbanning user:", error);
    }
  };

  const handleCancelUnban = () => {
    // Close confirmation dialog
    setShowConfirmation(false);
  };

  return (
    <div className='w-full md:col-span-2 relative lg:h-auto m-auto p-4 border rounded-lg bg-white'>
      <div className="flex justify-between mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name"
            className="py-2 px-4 w-80 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button
            className="absolute right-0 top-0 h-full px-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-800">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Avatar</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">CreatedAt</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {users.slice(pagesVisited, pagesVisited + usersPerPage).map((user, index) => (
              <tr key={user.id} className="border border-gray-600">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <IconContext.Provider value={{ className: 'h-12 w-12 text-gray-400' }}>
                    {user.avatarURL ? (
                      <img src={user.avatarURL} alt="Avatar" className="h-12 w-12 rounded-full" />
                    ) : (
                      <FaUserCircle />
                    )}
                  </IconContext.Provider>
                </td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.created_at}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleUnbanClick(user)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Unban
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"pagination flex justify-center mt-4"}
          previousLinkClassName={"border rounded-l-md p-2 hover:bg-cyan-400"}
          nextLinkClassName={"border rounded-r-md p-2 hover:bg-cyan-400"}
          pageClassName={"m-1"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
          activeClassName={"bg-cyan-500 text-white"}
        />

        {/* Confirmation dialog */}
        {showConfirmation && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg">
              <p>Are you sure you want to unban {userToUnban && userToUnban.name}?</p>
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleConfirmUnban}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-4"
                >
                  Yes
                </button>
                <button
                  onClick={handleCancelUnban}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BanUsersTable;
