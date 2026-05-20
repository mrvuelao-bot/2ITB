import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [studentId, setStudentId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = { email, password, fullname, student_id: studentId };

        // Use Vite env var VITE_API_BASE or VITE_API_URL when available, otherwise fall back to localhost
        const API_BASE = import.meta.env.VITE_API_BASE || import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

        try {
            const res = await axios.post(`${API_BASE}/api/auth`, loginData);
            if (res.data.user) {
                // let App handle storing studentId and other user info
                alert(res.data.message);
                onLoginSuccess(res.data.user);
            }
        } catch (err) {
            console.error("Login Error:", err);
            const msg = err.response?.data?.message || "ຕິດຕໍ່ Server ບໍ່ໄດ້";
            alert(msg);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-10 bg-gray-100 min-h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">ລະບົບສະມັກສະມາຊິກຂອງ 2ITB</h2>
                <div className="mb-3">
                    <label className="text-sm font-medium text-gray-600">ຊື່ ແລະ ນາມສະກຸນແທ້</label>
                    <input required type="text" value={fullname} className="w-full border p-2 rounded mt-1 text-sm" onChange={e => setFullname(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="text-sm font-medium text-gray-600">ເລກລຳດັບ (Student ID)</label>
                    <input required type="text" value={studentId} className="w-full border p-2 rounded mt-1 text-sm" onChange={e => setStudentId(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="text-sm font-medium text-gray-600">ອີເມວ (Email)</label>
                    <input required type="email" value={email} className="w-full border p-2 rounded mt-1 text-sm" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label className="text-sm font-medium text-gray-600">ລະຫັດຜ່ານ (Password)</label>
                    <input required type="password" value={password} className="w-full border p-2 rounded mt-1 text-sm" onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition">ຢືນຢັນຂໍ້ມູນເຂົ້າລະບົບ</button>
            </form>
        </div>
    );
};

export default Login;