import React, { useState, useEffect, useRef } from 'react';
import NotificationBell from "../Navbar/NotificationBell";
import ProfileMenu from "../Navbar/ProfileMenu";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate=useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Track if profile menu is open
  const profileMenuRef = useRef(null); // Reference to profile menu container
  const profilePicRef = useRef(null); // Reference to profile picture

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen); // Toggle menu on click
  };

  const goHome = () => {
    navigate('/home'); // Redirect to home page
  }
  // Close the profile menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current && !profileMenuRef.current.contains(event.target) && 
        profilePicRef.current && !profilePicRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false); // Close menu if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-blue-600 p-4 text-white flex justify-between">
        <div>Logo</div>
        <div className="text-2xl font-bold cursor-pointer" onClick={goHome}>Finance Manager</div>
        <div className="flex items-center space-x-10">
          <NotificationBell />
          <div className="relative">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="Profile"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={handleProfileClick}
              ref={profilePicRef} // Reference for profile picture
            />
            {isProfileOpen && (
              <div ref={profileMenuRef}>
                <ProfileMenu />
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
