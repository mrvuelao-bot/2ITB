import React from 'react';
import { LayoutDashboard, UserCheck, Calendar, Megaphone, User, LogOut } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: <LayoutDashboard size={20}/>, label: "ໜ້າຫຼັກ", active: true },
    { icon: <UserCheck size={20}/>, label: "ເຊັກຊື່" },
    { icon: <Calendar size={20}/>, label: "ປະຫວັດການເຊັກຊື່" },
    { icon: <Megaphone size={20}/>, label: "ປະກາດ" },
    { icon: <User size={20}/>, label: "ຂໍ້ມູນສ່ວນຕົວ" },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xs">SAS</div>
        <span className="font-bold text-xl">SAS</span>
      </div>
      
      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${item.active ? 'bg-blue-50 text-primary font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3 p-3 text-red-500 cursor-pointer hover:bg-red-50 rounded-xl transition-all">
          <LogOut size={20}/>
          <span>ອອກຈາກລະບົບ</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;