import React from 'react';

const ConfirmationModal = ({ show, onHide, onConfirm }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 ${show ? '' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg font-semibold mb-4">Confirm Approval</p>
        <p className="mb-4">Are you sure you want to approve this activity?</p>
        <div className="flex justify-end">
          <button 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => onConfirm(true)}
          >
            Confirm
          </button>
          <button 
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              onConfirm(false);
              onHide();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
