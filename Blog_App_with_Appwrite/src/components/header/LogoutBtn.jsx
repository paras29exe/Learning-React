import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import authService from "../../appwrite/Auth";
import { logout } from '../../store/AuthSlice';

function LogoutBtn() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
    } catch (error) {
      console.error("Logoutbtn error :: error", error);
    }
  };

  return (
    <div>
      <button
        className='px-4 py-1 duration-200 hover:bg-red-700 rounded-md bg-red-500 text-white text-center custom-shadow transition-colors flex items-center gap-2'
        onClick={handleLogout}
      >
        <FontAwesomeIcon icon={faSignOutAlt} />
        Logout
      </button>
      <style>{`
        .custom-shadow {
          transition: box-shadow 0.2s ease-in-out, background-color 0.3s ease-in-out;
        }
        .custom-shadow:hover {
          box-shadow: 0 4px 15px rgba(255, 0, 0, 0.6); /* Adjust the RGBA values for a more visible shadow */
        }
      `}</style>
    </div>
  );
}

export default LogoutBtn;