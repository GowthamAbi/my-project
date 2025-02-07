import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../pages/Login';

const ProfileMenu = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate=useNavigate();
  const login = () => {
    navigate('/login');
  };
  const register = () => {
    navigate('/register');
  };
  const logout = () => {
    
    document.cookie = 'yourCookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; 
    navigate('/home');
  };
  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false); 
  };

  return (
    <div
      className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg z-10"
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
    >
      {isVisible && (
        <ul>
          <li
            className="hover:bg-gray-200 cursor-pointer text-black px-4 py-2"
            onClick={login} 
          >
            Login
          </li>
          <li className="hover:bg-gray-200 cursor-pointer text-black px-4 py-2"  onClick={register} >
            Register
          </li>
          <li className="hover:bg-gray-200 cursor-pointer text-black px-4 py-2"onClick={logout} >
            Log Out
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileMenu;
