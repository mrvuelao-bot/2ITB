import React, { useEffect, useState } from 'react';
import HeroImg from '../assets/heroImg.png';

const Hero = () => {
  const text = "Student Attendance System";

  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const speed = isDeleting ? 60 : 120;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setDisplayText((prev) => {
          const updated = text.substring(0, prev.length + 1);

          // when finish typing → pause → then delete
          if (updated === text) {
            setTimeout(() => setIsDeleting(true), 800);
          }

          return updated;
        });
      } else {
        // Deleting (speed back)
        setDisplayText((prev) => {
          const updated = text.substring(0, prev.length - 1);

          // when empty → restart typing
          if (updated === "") {
            setIsDeleting(false);
          }

          return updated;
        });
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting]);

  return (
    <section
      id="Home"
      className="relative flex flex-col md:flex-row items-center justify-between
                 px-6 md:px-10 py-16 min-h-screen
                 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.6)),
          url(${HeroImg})
        `,
      }}
    >
      <div className="md:w-1/2 px-[1rem] space-y-6 absolute z-10">

        {/* Typing Text */}
        <h1 className="text-[20px] md:whitespace-nowrap md:text-[55px]  leading-tight text-white font-inter drop-shadow-md">
          {displayText}
          <span className="animate-pulse">|</span>
        </h1>

        {/* Description */}
        <p className="text-[15px] md:text-xl text-gray-200 leading-relaxed max-w-xl drop-shadow-md">
          ລະບົບບັນທຶກການເຂົ້າຮຽນສຳລັບນັກສຶກສາ ທີ່ຊ່ວຍໃຫ້ການລົງຊື່ເຂົ້າຮຽນສະດວກ, ວ່ອງໄວ ແລະ ປອດໄພ.
        </p>

        {/* Button */}
        <div className="flex gap-4">
          <a
            href="#about"
            className="inline-block bg-[#0B325E] px-4 py-2 md:px-8 md:py-4
                       hover:shadow-[0_4px_8px_rgba(0,0,0,0.7)] duration-300 text-white font-semibold
                       shadow-xl transition duration-300"
          >
            ກ່ຽວກັບລະບົບ
          </a>
        </div>

      </div>
    </section>
  );
};

export default Hero;