import React from 'react';
import { ShieldCheck, Clock, BarChart3 } from 'lucide-react';

const features = [
{ icon: <ShieldCheck size={40} className="text-[#444]" />, title: "ປອດໄພ", desc: "ຂໍ້ມູນຖືກປົກປ້ອງແລະເປັນສ່ວນຕົວ" },
{ icon: <Clock size={40} className="text-[#444]" />, title: "ວ່ອງໄວ", desc: "ເຊັກຊື່ໄດ້ພາຍໃນ2ຫາ3ວິນາທີ" },
{ icon: <BarChart3 size={40} className="text-[#444]" />, title: "ລາຍງານຄົບຖ້ວນ", desc: "ສະຫຼຸບຜົນແລະລາຍງານໄດ້ຢ່າງຖືກຕ້ອງ" },
];

const Features = () => {
  return (
    <div id='feature' className="grid bg-[#dedede]  grid-cols-1 md:grid-cols-3 gap-6 px-10 py-10 bg-gray-50">
      {features.map((f, i) => (
        <div key={i} className="bg-white hover:bg-[#e0e0e0] duration-300 p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="bg-blue-50 p-4 rounded-xl">{f.icon}</div>
          <div>
            <h3 className="font-bold text-gray-800">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;