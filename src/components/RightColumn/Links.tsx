import React from "react";
import { FaLink } from "react-icons/fa";

interface Props {
  state: any;
  handleAddLink: () => void;
  handleLinkChange: (index: number, value: string) => void;
  handleDeleteLink: (index: number) => void;
}

const Links: React.FC<Props> = ({
  state,
  handleAddLink,
  handleLinkChange,
  handleDeleteLink,
}) => {
  if (state.activeButton !== "Links") return null;

  return (
    <div className="w-full bg-gradient-to-b from-[#817182] to-[#746779] p-3 rounded-lg flex flex-col gap-2 text-white/50 text-sm mt-2">
      {state.links.map((link: string, idx: number) => (
        <div
          key={idx}
          className="flex items-center w-full bg-[#746779] rounded p-2 justify-between"
        >
          <div className="flex items-center gap-2 flex-1">
            <FaLink className="text-white/50" size={16} />
            <input
              type="text"
              value={link}
              onChange={(e) => handleLinkChange(idx, e.target.value)}
              className="w-full bg-transparent outline-none text-white/50 placeholder-white/50 text-sm"
              placeholder="Add link"
            />
          </div>
          <button
            type="button"
            className="text-white/50 hover:text-white font-bold ml-2"
            onClick={() => handleDeleteLink(idx)}
          >
            ×
          </button>
        </div>
      ))}

      <div className="flex justify-center mt-2">
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-1 text-white text-sm"
          onClick={handleAddLink}
        >
          + Add another link
        </button>
      </div>
    </div>
  );
};

export default Links;
