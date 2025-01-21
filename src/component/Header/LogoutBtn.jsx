import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AuthService from '../../appWrite/auth';
import { logout } from '../../store/authSlice';
import { FiLogOut } from 'react-icons/fi';

const LogoutBtn = ({icon}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const dispatch = useDispatch();

  const logoutHandler = () => {
    AuthService.logout().then(() => {
      dispatch(logout());
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Logout Button */}
      <button className="p-2" onClick={openModal}>
        {icon ? <FiLogOut size={30} /> : 'Logout'}
      </button>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-700 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutBtn;
