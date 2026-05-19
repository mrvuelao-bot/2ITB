import React, { useState, useEffect } from 'react';
import Login from './conponents/Login';
import StudentDashboard from './conponents/StudentDashboard';
import Navbar from './conponents/Navbar';
import Hero from './conponents/Hero';
import Feature from './conponents/Features';
import Footer from './conponents/Footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // 🔑 ຕົວແປຄວບຄຸມການເປີດ-ປິດ ຟອມ Login ທີ່ລອຍເທິງ Hero
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const studentId = localStorage.getItem('studentId');
    if (studentId) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (userData) => {
    if (userData) {
      localStorage.setItem('studentId', userData.student_id || '');
      localStorage.setItem('userName', userData.fullname || '');
      localStorage.setItem('userEmail', userData.email || '');
    }
    setIsLoggedIn(true);
    setShowLoginModal(false); // 🔓 Login ສຳເລັດແລ້ວ ໃຫ້ປິດຟອມລອຍລົງທັນທີ
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">ກຳລັງໂຫລດ...</div>;
  }

  return (
    <div className="App min-h-screen bg-gray-50 flex flex-col relative">
      {/* 🌟 1. Navbar: ສົ່ງຟັງຊັນໄປໃຫ້ປຸ່ມ Login ຢູ່ໃນ Navbar ກົດເປີດ */}
      <Navbar onLoginClick={() => setShowLoginModal(true)} isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      {/* 🌟 2. ພາກສ່ວນ Hero ແລະ ຟອມ Login ທີ່ລອຍຢູ່ເທິງ Hero */}
      <div className="relative w-full">
        <Hero />
        
        {/* 🎯 ກ່ອງ Login ທີ່ກວ້າງ w-full h-fit ແລະ ຄ່ອຍໆ Opacity ອອກມາ ເມື່ອກົດປຸ່ມ */}
        {!isLoggedIn && (
          <div 
            className={`absolute top-0 left-0 w-full h-fit bg-black/40 backdrop-blur-sm z-40 transition-all duration-500 flex justify-center items-start pt-10 ${
              showLoginModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border relative m-4">
              {/* ປຸ່ມ X ສໍາລັບປິດຟອມ Login */}
              <button 
                onClick={() => setShowLoginModal(false)} 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl"
              >
                ✕
              </button>
              
              <Login onLoginSuccess={handleLoginSuccess} />
            </div>
          </div>
        )}
      </div>
      
      {/* 🌟 3. ໜ້າ Dashboard: ສະແດງຢູ່ບ່ອນນີ້ຕະຫຼອດໄປ ບໍ່ວ່າຈະ Login ແລ້ວ ຫຼື ບໍ່ */}
      <div className="flex-1 py-10 bg-gray-100">
        <StudentDashboard onLogout={handleLogout} />
      </div>
      <Feature />
      <Footer />
    </div>
  );
}

export default App;