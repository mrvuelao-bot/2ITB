import React, { useState } from 'react';
import Logo from '../assets/Logo.jpg';
import { FaBars } from 'react-icons/fa';

const Navbar = ({ onLoginClick, isLoggedIn, onLogout }) => {
 
  const [toggle, setToggle] = useState(false);

  const updateToggle =() => {
    setToggle(!toggle)
  }
 
 
  return (
    <nav className="flex relative justify-between shadow-lg flex-col md:flex-row md:items-center md:py-4 px-10 bg-white border-b border-gray-200 md:sticky top-0 z-50">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
        <img className="w-[70px] h-[70px] rounded-full object-cover" src={Logo} alt="Logo" />
        <span className="font-bold text-xl text-gray-800">2ITB SAS System</span>
      </div>
      
      
      <div className={`${!toggle ? "hidden" : "flex"} bg-[#EDEDED] md:bg-transparent p-[1rem] relative md:flex gap-[2rem] mt-[1rem] md:mt-0 md:flex-row flex-col`}>
        <div className="flex flex-col  md:flex-row md:flex  md:gap-8 text-gray-600 font-medium">
          <a href="#Home" className="hover:text-[#ffff] hover:bg-[#0B325E] px-[3px] py-[5px] md:px-[1rem] md:py-[8px] transition">Home</a>
          <a href="https://fet-su.edu.la/score/" target='_blank' className="hover:text-[#ffff] hover:bg-[#0B325E] px-[3px] py-[5px] md:px-[1rem] md:py-[8px] transition">Score</a>
          <a href="#checkIn" className="hover:text-[#ffff] hover:bg-[#0B325E] px-[3px] py-[5px] md:px-[1rem] md:py-[8px] transition">CheckIn</a>
          <a href="#feature" className="hover:text-[#ffff] hover:bg-[#0B325E] px-[3px] py-[5px] md:px-[1rem] md:py-[8px] transition">Features</a>
          <a href="#" className="hover:text-[#ffff] hover:bg-[#0B325E] px-[3px] py-[5px] md:px-[1rem] md:py-[8px] transition">Contact</a>
        </div>
      <div className=' md:flex mt-[1rem] md:mt-0'>
          {isLoggedIn ? (
            <button 
              onClick={onLogout}
              className="bg-[#0B325E] text-white px-6 py-2  hover:bg-[#0B325E] transition font-medium shadow-sm"
            >
              Logout
            </button>
          ) : (
            <button 
              onClick={onLoginClick}
              className="bg-[#0B325E] text-white px-6 py-2  hover:bg-transparent hover:text-[#0B325E] transition font-medium shadow-sm"
            >
              Login
            </button>
          )}
        </div>
      </div>
      <FaBars className='absolute  right-5 top-8 text-[25px] md:hidden ' onClick={updateToggle} />
    </nav>
  );
};

export default Navbar;