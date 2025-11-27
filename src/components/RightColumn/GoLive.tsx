import React from "react";

const GoLive: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-[#7673aa] to-[#7873ab] rounded-lg">
      <button className="w-full py-3 flex flex-col items-center gap-1">
        <img src="/images/icons/rocket.png" alt="icon" className="w-6 h-6" />
        <span className="text-green-300 text-sm">Go live</span>
      </button>
    </div>
  );
};

export default GoLive;
