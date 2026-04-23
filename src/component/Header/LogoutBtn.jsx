import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AuthService from '../../appWrite/auth';
import { logout } from '../../store/authSlice';
import { FiLogOut } from 'react-icons/fi';
import Button from '../Button';

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
      <button 
        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
          icon ? 'text-zinc-400 hover:text-red-400 hover:bg-red-400/10' : 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'
        }`}
        onClick={openModal}
      >
        {icon ? <FiLogOut size={20} /> : 'Logout'}
      </button>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-2xl w-[400px] transform transition-all animate-in fade-in zoom-in duration-300">
            <h2 className="text-2xl font-bold mb-2 text-white">Confirm Logout</h2>
            <p className="text-zinc-400 mb-8">Are you sure you want to log out? You'll need to sign in again to access your posts.</p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 py-3"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 shadow-red-600/20"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutBtn;
