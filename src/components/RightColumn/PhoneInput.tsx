import React from "react";
import { FaArrowRight } from "react-icons/fa";

interface Props {
  state: any;
  setState: React.Dispatch<any>;
  onArrowClick: () => void;
}

const PhoneInput: React.FC<Props> = ({ state, setState, onArrowClick }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gradient-to-b from-[#817182] to-[#746779] rounded-lg text-white/50 text-sm">
      <div className="flex items-center gap-2 flex-1">
        <img src="/images/icons/diskette.png" alt="icon" className="w-6 h-6" />
        <input
          type="text"
          value={state.phoneNumber}
          onChange={e => setState((prev: any) => ({ ...prev, phoneNumber: e.target.value }))}
          placeholder="Enter phone number"
          className="w-full bg-transparent outline-none text-white/50 placeholder-white/50 text-sm"
        />
      </div>
      <div
        className="px-2 py-2 bg-[#9e7e99] rounded-md flex items-center justify-center cursor-pointer"
        onClick={onArrowClick}
      >
        <FaArrowRight className="text-white text-sm" />
      </div>
    </div>
  );
};

export default PhoneInput;
