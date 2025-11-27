import React from "react";

interface Props {
  state: any;
  setState: React.Dispatch<any>;
}

const DateLocationCost: React.FC<Props> = ({ state, setState }) => {
  return (
    <div className="flex flex-col p-3 bg-gradient-to-b from-[#817182] to-[#746779] rounded-lg text-white/50 h-42 text-sm">
      <div className="flex items-center gap-2 flex-1">
        <img src="/images/icons/calendar.png" alt="icon" className="w-6 h-6" />
        <input
          type="date"
          value={state.date}
          onChange={e => setState((prev: any) => ({ ...prev, date: e.target.value }))}
          className="bg-transparent outline-none text-white/50 placeholder-white/50 text-sm"
          min={new Date().toISOString().split("T")[0]}
        />
        <input
          type="time"
          value={state.time}
          onChange={e => setState((prev: any) => ({ ...prev, time: e.target.value }))}
          className="bg-transparent outline-none text-white/50 placeholder-white/50 text-sm ml-2"
        />
      </div>

      <hr className="border-t border-white/30 my-1" />

      <div className="flex items-center gap-2 flex-1">
        <img src="/images/icons/pin.png" alt="icon" className="w-6 h-6" />
        <input
          type="text"
          value={state.location}
          onChange={e => setState((prev: any) => ({ ...prev, location: e.target.value }))}
          placeholder="Location"
          className="w-full bg-transparent outline-none text-white/50 placeholder-white/50 text-sm"
        />
      </div>

      <hr className="border-t border-white/30 my-1" />

      <div className="flex items-center gap-2 flex-1">
        <img src="/images/icons/cash.png" alt="icon" className="w-6 h-6" />
        <input
          type="text"
          value={state.cost}
          onChange={e => setState((prev: any) => ({ ...prev, cost: e.target.value }))}
          placeholder="Cost per person ($)"
          className="bg-transparent outline-none text-white/50 placeholder-white/50 text-sm w-full"
        />
      </div>
    </div>
  );
};

export default DateLocationCost;
