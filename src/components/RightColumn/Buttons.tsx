import React from "react";
import { FaPlus } from "react-icons/fa";

interface Props {
  state: any;
  setState: React.Dispatch<any>;
  dropdownRef: React.RefObject<HTMLDivElement>;
  onMainButtonClick: (btn: string) => void;
  onDropdownButtonClick: (btn: string) => void;
}

const ButtonsRow: React.FC<Props> = ({
  state,
  setState,
  dropdownRef,
  onMainButtonClick,
  onDropdownButtonClick,
}) => {
  return (
    <div className="flex gap-3 justify-start w-full max-w-2xl text-sm relative mt-2">
      {state.mainButtons.map((btn: string) => (
        <button
          key={btn}
          className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg bg-gradient-to-b from-[#a494b7] to-[#a593b9] text-white"
          onClick={() => onMainButtonClick(btn)}
        >
          <FaPlus size={12} /> {btn}
        </button>
      ))}

      {state.dropdownButtons.length > 0 && (
        <div ref={dropdownRef} className="relative">
          <p
            className="flex items-center text-white whitespace-nowrap text-white/40 cursor-pointer select-none"
            onClick={() => setState((prev: any) => ({ ...prev, dropdownOpen: !prev.dropdownOpen }))}
          >
            Show More
          </p>
          {state.dropdownOpen && (
            <div className="absolute mt-1 left-0 w-48 bg-[#817182] rounded-lg shadow-lg flex flex-col z-10">
              {state.dropdownButtons.map((btn: string) => (
                <button
                  key={btn}
                  className="text-white p-2 text-left hover:bg-[#746779] rounded-t last:rounded-b"
                  onClick={() => onDropdownButtonClick(btn)}
                >
                  {btn}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ButtonsRow;
