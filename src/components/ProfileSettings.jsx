import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ProfileSettings = () => {
  const { user, logout } = useAuth(); // Get user data from AuthContext
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(user?.profilePic || null);
  const [message, setMessage] = useState("");

  // Handle Profile Picture Upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  // Handle Profile Picture Delete
  const handleDeletePic = () => {
    setProfilePic(null);
  };

  
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ name, profilePic }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setMessage("Profile updated successfully! ✅");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Something went wrong! ❌");
    }
  };
  
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/profile/update-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setMessage("Password updated successfully! ✅");
        setPassword("");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Something went wrong! ❌");
    }
  };
  



  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Profile Settings</h2>

      {/* Profile Picture Section */}
      <div className="flex items-center space-x-4">
        {profilePic ? (
          <img src={profilePic} alt="Profile" className="w-20 h-20 rounded-full border" />
        ) : (
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
        <input type="file" onChange={handleFileChange} className="hidden" id="fileUpload" />
        <label htmlFor="fileUpload" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
          Upload New
        </label>
        {profilePic && (
          <button onClick={handleDeletePic} className="bg-red-500 text-white px-4 py-2 rounded">
            Delete
          </button>
        )}
      </div>

      {/* Basic Settings Form */}
      <form onSubmit={handleProfileUpdate} className="mt-4">
        <label className="block text-gray-600">Full Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded mt-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block text-gray-600 mt-2">Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded mt-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled
        />

        <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>

      {/* Change Password Section */}
      <form onSubmit={handlePasswordChange} className="mt-6">
        <label className="block text-gray-600">Change Password</label>
        <input
          type="password"
          className="w-full p-2 border rounded mt-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Update Password
        </button>
      </form>

      {/* Success/Error Message */}
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}

      {/* Logout Button */}
      <button onClick={logout} className="mt-6 bg-red-500 text-white px-4 py-2 rounded w-full">
        Logout
      </button>
    </div>
  );
};

export default ProfileSettings;
