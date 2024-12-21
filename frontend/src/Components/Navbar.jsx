import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const login = () => {
    navigate('/login')
  }

  const Signup = () => {
   navigate('/Signup')
 }
 
 const Art = () => {
  navigate('/Art')
}

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/dashboard#${sectionId}`);
    }
    
  };

  return (
    <nav className="bg-opacity-80 fixes w-full">
      <div className=" w-full px-20 py-5 bg-slate-500 flex justify-between items-center transition duration-200">
        <div className="logo">
          <button onClick={() => navigate("/dashboard")}>
            <img className="w-18 h-12" src="https://static.thenounproject.com/png/789273-200.png" alt="logo" />
          </button>
        </div>
        <div className="flex gap-10 justify-center text-white">
          <button onClick={() => scrollToSection('about')} className="hover:text-orange-200 rounded-md transition duration-200">About</button>
          <button onClick={() => scrollToSection('cars')} className="hover:text-orange-200 rounded-md transition duration-200">Cars</button>
          <button onClick={() => scrollToSection('parts')} className="hover:text-orange-200 rounded-md transition duration-200">Spare Parts</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-orange-200 rounded-md transition duration-200">Contact</button>
          <button onClick={Art} className="hover:text-orange-200 rounded-md transition duration-200">Art & Culture</button>
        </div>
        <div className="flex gap-8 h-10">
          <button
            onClick={Signup}
            className="flex text-2xl rounded-md transition duration-200 hover:text-white"
          >
            Register
          </button>
          <button
            onClick={login}
            className="flex text-2xl hover:text-white rounded-md transition duration-200"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;