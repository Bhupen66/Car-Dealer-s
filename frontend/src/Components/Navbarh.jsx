import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Navbarh = () => {
  const { logout, setIsLogin, setUser } = useContext(AppContext);
  const [setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));

    if (token && userData) {
      setIsLogin(true);
      setUser(userData);
    } else {
      setIsLogin(false);
    }
  }, [setIsLogin, setUser]);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      logout();
      setLoading(false);
      toast.success("Logged out successfully!");
      navigate("/");
    }, 2000);
  };

  return (
    <>
      <nav className="bg-gray-800 w-full h-20 justify-center shadow-md fixed top-0 left-0 z-50">
        <div className="container mx-auto mt-50% flex justify-between items-center">
          {/* Left side: Logo */}
          <div className="text-white text-2xl font-bold">
            Car Dealer
          </div>

          {/* Center: Navigation Links */}
          <ul className="flex space-x-4">
            <li><a href="/home" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Home</a></li>
            <li><a href="/Car" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Cars</a></li>
            <li><a href="/Part" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Parts</a></li>
            <li><a href="/Contact" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Contact</a></li>
          </ul>

          {/* Right side: Logout Button */}
          <div className="flex space-x-4">
            <a href="/Cart" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
              Cart
            </a>
            <a onClick={handleLogout} className="text-white hover:bg-red-600 px-3 py-2 rounded">
              Logout
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbarh;
