'use client'
import React, { useEffect, useState } from 'react';
import { db } from "../config/firebase";
import { collection, getDocs, query, where, orderBy ,doc, updateDoc} from "firebase/firestore";
import ReactPaginate from 'react-paginate';
import ActivitiesDetailModal from "./ActivitiesDetailModal";
import { BsCheckCircle, BsClock, BsSlashCircle } from 'react-icons/bs';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false); // Thêm state cho modal detail

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const activitiesCollectionRef = collection(db, "activities");

  const handleSearch = async () => {
    try {
      let q;
      if (searchTerm) {
        q = query(activitiesCollectionRef, where("name", "==", searchTerm), orderBy("createdAt"));
      } else {
        q = query(activitiesCollectionRef, orderBy("createdAt"));
      }
      const querySnapshot = await getDocs(q);
      const formattedActivities = querySnapshot.docs.map((doc) => {
        const activity = doc.data();
        const createdAt = activity.createdAt.toDate().toLocaleString();
        
        // Extract day, month, and year from startDateTime
        const [, day, month, year] = activity.startDateTime.split(/, |\//);
        
        // Convert month to zero-based index
        const startDate = new Date(year, parseInt(month, 10) - 1, parseInt(day, 10));
        const currentDate = new Date();
        const state = startDate >  currentDate ? 'inprogress' : 'end';
        
        return { ...activity, createdAt, id: doc.id, state };
      });
      setActivities(formattedActivities);
    } catch (error) {
      console.error("Error searching activities:", error);
    }
  };
  
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const pageCount = Math.ceil(activities.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleViewDetail = (activity) => {
    setSelectedActivity(activity);
    setShowDetailModal(true); // Hiển thị modal detail khi click
  };

  const handleCloseModal = () => {
    setSelectedActivity(null);
    setShowDetailModal(false); // Ẩn modal detail
  };

  const handleApproveActivity = (activity) => {
    if (activity.state === 'inprogress') {
      setShowApproveModal(true);
      setSelectedActivity(activity);
      console.log("Activity approved:", activity.name);
    }
  };

  const confirmApproval = async () => {
    try {
      const activitiesDocRef = doc(db, "activities", selectedActivity.id);
      await updateDoc(activitiesDocRef, {
        approve: true
      });
      console.log("Activity approved:", selectedActivity.name);
      setShowApproveModal(false);
      handleSearch();
    } catch (error) {
      console.error("Error approving activity:", error);
    }
  };
  
  const handleCloseApproveModal = () => {
    setShowApproveModal(false);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
  };
  

  return (
    <div className='w-full md:col-span-2 relative lg:h-auto m-auto p-4 border rounded-lg bg-white'>
      <div className="flex justify-between mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by activities"
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
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">CreatedAt</th>
              <th className="px-4 py-2">State</th>
              <th className="px-4 py-2">Action</th>
              <th className="px-4 py-2">Approve</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {activities.slice(pagesVisited, pagesVisited + usersPerPage).map((activity, index) => (
              <tr key={activity.id} className="border border-gray-600">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{activity.name}</td>
                <td className="px-4 py-2">{activity.address}</td>
                <td className="px-4 py-2">{activity.createdAt}</td>
                <td className="px-4 py-2">
                  {activity.state === 'inprogress' ? (
                    <BsClock className="text-yellow-500" title="In Progress" />
                  ) : (
                    <BsCheckCircle className="text-green-500" title="End" />
                  )}
                </td>
                <td className="px-4 py-2">
                  <button 
                    onClick={() => handleViewDetail(activity)} 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    View Detail
                  </button>
                </td>
                <td>
                  {activity.state === 'inprogress' && !activity.approve ? (
                    <button 
                      onClick={() => handleApproveActivity(activity)} 
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mr-4   rounded"
                    >
                      Approve
                    </button>
                  ) : (
                    <button 
                      className="bg-gray-300 text-gray-500 font-bold py-2 px-4 mr-4  rounded  cursor-not-allowed"
                      disabled
                    >
                      Approve
                    </button>
                  )}
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
      </div>
      {showDetailModal && (
        <ActivitiesDetailModal activity={selectedActivity} onClose={handleCloseDetailModal} />
      )}
      {showApproveModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
          <div className="bg-white w-96 p-6 rounded-lg">
            <p className="text-lg font-semibold mb-4">Confirm Approval</p>
            <p className="mb-4">Are you sure you want to approve {selectedActivity && selectedActivity.name}?</p>
            <div className="flex justify-end">
              <button 
                onClick={confirmApproval}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Yes
              </button>
              <button 
                onClick={handleCloseApproveModal}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;
