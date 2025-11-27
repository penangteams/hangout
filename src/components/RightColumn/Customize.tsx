import React from "react";

const CustomizeBox: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-[#4e4b66] to-[#645a72] p-4 flex flex-col h-48 rounded-lg justify-between">
      <div className="flex-1 flex items-center justify-center text-gray-50 text-md font-semibold text-center leading-tight">
        Customize your <br /> event your way
      </div>
      <div className="bg-gradient-to-b from-[#706a8c] to-[#726d8c] rounded-lg">
        <button className="w-full text-white text-semibold text-sm py-3 rounded flex items-center justify-center gap-2">
          <img src="/images/icons/color-palette.png" alt="icon" className="w-6 h-6" /> Customize
        </button>
      </div>
    </div>
  );
};

export default CustomizeBox;
