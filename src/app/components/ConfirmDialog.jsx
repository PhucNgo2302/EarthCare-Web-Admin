import React from 'react';

const ConfirmationDialog = ({ userToBan, handleConfirmBan, handleCancelBan }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <p>Are you sure you want to ban {userToBan && userToBan.name}?</p>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleConfirmBan}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Yes
          </button>
          <button
            onClick={handleCancelBan}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
