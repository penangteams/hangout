import React from "react";
import type { GoLiveProps } from "@/types";

const GoLive: React.FC<GoLiveProps> = ({ onGoLive }) => {
  return (
    <div className="bg-gradient-to-b from-[#7673aa] to-[#7873ab] rounded-lg">
      <button className="w-full py-3 flex flex-col items-center gap-1"
      onClick={onGoLive}>
        <img src="/images/icons/rocket.png" alt="icon" className="w-6 h-6" />
        <span className="text-green-300 text-sm">Go live</span>
      </button>
    </div>
  );
};

export default GoLive;
