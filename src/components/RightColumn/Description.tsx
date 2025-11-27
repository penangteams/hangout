import React from "react";

interface Props {
  state: any;
  setState: React.Dispatch<any>;
}

const DescriptionBox: React.FC<Props> = ({ state, setState }) => {
  return (
    <textarea
      value={state.description}
      onChange={e => setState((prev: any) => ({ ...prev, description: e.target.value }))}
      placeholder="Describe your event"
      className="w-full p-3 pt-1 pl-3 bg-gradient-to-b from-[#817182] to-[#746779] rounded-lg text-white/50 resize-none text-sm"
      rows={3}
    />
  );
};

export default DescriptionBox;
