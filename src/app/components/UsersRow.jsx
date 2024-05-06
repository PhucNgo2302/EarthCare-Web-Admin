import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const UsersRow = ({ user, index, handleBanClick }) => {
  return (
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
          onClick={() => handleBanClick(user)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Ban
        </button>
      </td>
    </tr>
  );
};

export default UsersRow;
