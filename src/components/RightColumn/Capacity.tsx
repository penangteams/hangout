import React from "react";
import { FaUserFriends } from "react-icons/fa";

interface Props {
  state: any;
  setState: React.Dispatch<any>;
}

const Capacity: React.FC<Props> = ({ state, setState }) => {
  if (state.activeButton !== "Capacity") return null;

  return (
    <div className="w-full bg-gradient-to-b from-[#817182] to-[#746779] rounded-lg flex items-center p-3 text-white/50 text-sm mt-2">
      <FaUserFriends className="mr-2 text-white/50" size={18} />
      <input
        type="text"
        value={state.capacity}
        onChange={e => setState((prev: any) => ({ ...prev, capacity: e.target.value }))}
        className="w-full bg-transparent outline-none text-white/50 placeholder-white/50 text-sm"
        placeholder="0"
      />
    </div>
  );
};

export default Capacity;
