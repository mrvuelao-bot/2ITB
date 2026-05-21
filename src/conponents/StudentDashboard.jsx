import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = ({ onLogout }) => {
    const [list, setList] = useState([]);
    const [summary, setSummary] = useState({ total: 0, present: 0, absent: 0 });
    const [showModal, setShowModal] = useState(false); 
    const [activeTab, setActiveTab] = useState('all'); 
    
    const email = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');

    const fetchData = async () => {
    try {
        const API_BASE = import.meta.env.DEV
            ? (import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000')
            : (import.meta.env.VITE_API_BASE || 'https://2itb-sas-backend.vercel.app');

        // backend exposes attendance endpoints: /api/attendance-list and /api/attendance-summary
        const resList = await axios.get(`${API_BASE}/api/attendance-list`);
        const resSum = await axios.get(`${API_BASE}/api/attendance-summary`);

        setList(resList.data);
        setSummary(resSum.data);
    } catch (err) { 
        console.error("Fetch Data Error:", err);    
    }
};

    useEffect(() => { fetchData(); }, []);

    const handleCheckIn = async () => {
        if (!email) return alert("ບໍ່ພົບອີເມວ");
        try {
            const API_BASE = import.meta.env.DEV
                ? (import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000')
                : (import.meta.env.VITE_API_BASE || 'https://2itb-sas-backend.vercel.app');
            const res = await axios.post(`${API_BASE}/api/checkin`, { email });
            alert(res.data.message);
            fetchData(); 
        } catch (err) { 
            alert(err.response?.data?.message || "Check-in ບໍ່ສຳເລັດ"); 
        }
    };

    const filteredList = list.filter((item) => {
        // ✅ ເຊັກວ່າມີເວລາ Check-in ໃນມື້ນີ້ຫຼືບໍ່
        const isPresent = item.checkin_time !== null && item.checkin_time !== undefined;
        if (activeTab === 'present') return isPresent; 
        if (activeTab === 'absent') return !isPresent; 
        return true; 
    });

    return (
        <div id='checkIn' className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow mt-6">
             {/* Header */}
             <div className="flex justify-between items-center mb-6 border-b pb-4">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">ສະບາຍດີ, {userName || 'ນັກສຶກສາ'}</h1>
                    <p className="text-sm text-gray-500">{email}</p>
                </div>
                <button onClick={onLogout} className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200">Logout</button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div onClick={() => {setActiveTab('all'); setShowModal(true)}} className="bg-blue-50 p-4 rounded-xl text-center border cursor-pointer">
                    <p className="text-xs font-medium text-blue-600">ນັກສືກສາທັງໝົດ</p>
                    <p className="text-3xl font-bold text-blue-700">{summary.total}</p>
                </div>
                <div onClick={() => {setActiveTab('present'); setShowModal(true)}} className="bg-green-50 p-4 rounded-xl text-center border cursor-pointer">
                    <p className="text-xs font-medium text-green-600">ນັກສືກສາທີມາຮຽນ</p>
                    <p className="text-3xl font-bold text-green-700">{summary.present}</p>
                </div>
                <div onClick={() => {setActiveTab('absent'); setShowModal(true)}} className="bg-red-50 p-4 rounded-xl text-center border cursor-pointer">
                    <p className="text-xs font-medium text-red-600">ນັກສືກສາທີຂາດຮຽນ</p>
                    <p className="text-3xl font-bold text-red-700">{summary.absent}</p>
                </div>
            </div>

            <button onClick={handleCheckIn} className="w-full bg-[#0B325E] text-white py-4 rounded-2xl font-bold text-lg hover:shadow-[0_4px_8px_rgba(0,0,0,0.7)] duration-300 active:scale-95 mb-6">
                📍 ກົດ Check-in ເຂົ້າຮຽນມື້ນີ້
            </button>

            {/* Modal ລາຍຊື່ */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
                        <div className="p-5 bg-gray-900 text-white flex justify-between">
                            <h3 className="font-bold">{activeTab === 'all' ? 'ລາຍຊື່ທັງໝົດ' : activeTab === 'present' ? 'ລາຍຊື່ມາຮຽນ' : 'ລາຍຊື່ຂາດຮຽນ'}</h3>
                            <button onClick={() => setShowModal(false)}>✕ ປິດ</button>
                        </div>
                        <div className="p-4 overflow-y-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-200 text-sm">
                                        <th className="p-3">ID</th>
                                        <th className="p-3 text-left">ຊື່ ແລະ ນາມສະກຸນ</th>
                                        <th className="p-3">ເວລາ Check-in</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredList.map((item, idx) => (
                                        <tr key={idx} className="border-b hover:bg-gray-50">
                                            <td className="p-3 text-center text-gray-600 font-mono text-sm">
                                                {item.student_id || 'N/A'} 
                                            </td>
                                            <td className="p-3 text-gray-800 font-medium">
                                                {item.fullname}
                                            </td>
                                            <td className={`p-3 text-center font-bold ${item.checkin_time ? 'text-green-600' : 'text-red-400'}`}>
                                                {item.checkin_time || "ຍັງບໍ່ມາ"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;