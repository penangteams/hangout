import React from "react";

interface Props {
  state: any;
  setState: React.Dispatch<any>;
}

const EventName: React.FC<Props> = ({ state, setState }) => {
  return (
    <input
      type="text"
      value={state.name}
      onChange={e => setState((prev: any) => ({ ...prev, name: e.target.value }))}
      placeholder="Name your event"
      className="w-full text-white/50 text-4xl placeholder-white/50 px-4 py-3 resize-none"
    />
  );
};

export default EventName;
