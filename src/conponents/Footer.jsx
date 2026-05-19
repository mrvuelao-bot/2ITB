import React from 'react'
import Logo from '../assets/Logo.jpg';

function Footer() {
  return (
    <div>
        <div className="flex flex-col items-center md:flex-row justify-between items-start md:items-center bg-gray-800 text-white p-6 mt-10">
      <div>
        <img className="w-[100px] h-[100px] rounded-full mb-4" src={Logo} alt="Logo" />
        <p>Student Attendance System <br /> Fast Secure and Reliable</p>
      </div>
      <div>
        <h2 className='font-semibold text-[20px]'>Quick Links</h2>
        <ul>
            <li className="hover:text-gray-800 hover:bg-gray-200 p-1 duration-300"><a href="#Home">Home</a></li>
            <li className="hover:text-gray-800 hover:bg-gray-200 p-1 duration-300"><a href="#checkIn">CheckIn</a></li>
            <li className="hover:text-gray-800 hover:bg-gray-200 p-1 duration-300"><a href="https://fet-su.edu.la/score/" target='_blank'>Score</a></li>
        </ul>
      </div>
      <div>
        <h2 className="font-semibold text-[20px]">Support & Contact Us</h2>
        <p className="text-gray-300 p-1">Email: info@studentattendance.com</p>
        <p className="text-gray-300 p-1">Phone: +856 2097848290</p>
        <p className="text-gray-300 p-1">Location: IT department, Souphanouvong University </p>
      </div>
    </div>
    
    <div className="bg-gray-900 flex-row flex justify-between px-[3rem] text-white text-center text-sm py-1">
       <p className="text-center tracking-wider text-gray-200 text-sm py-4">
            Copyright © 2026 Student Attendance System. All Rights Reserved.
       </p>
        <p className="text-center text-gray-200 text-sm py-4"> <strong className="font-bold text-[#fff]"> Built</strong> By Mr vue Lao</p>
    </div>
    </div>
  )
}

export default Footer
