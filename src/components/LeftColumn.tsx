import React from "react";

interface Props {
  state: any;
  handleBackgroundUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearBackground?: () => void;
}

const LeftColumn: React.FC<Props> = ({ state, handleBackgroundUpload, handleClearBackground }) => {
  return (
    <div className="flex flex-col w-1/3 gap-4">
      <div className="w-full flex items-center justify-center overflow-hidden rounded relative shadow-[0_6px_18px_rgba(180,165,220,0.35)]">
        <img
          src={state.background || "/images/invited.png"}
          alt="Invited"
          className="w-100 h-100 rounded-2xl object-cover"
        />
        <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-[#575585] flex items-center justify-center">
          <img src="/images/icons/create.png" alt="icon" className="w-4 h-4" />
        </div>
      </div>

      <div className="bg-gradient-to-b from-[#a494b7] to-[#a593b9] rounded-lg text-sm">
        <div className="flex items-center justify-center gap-2 py-3">
          <input
            id="bg-uploader"
            type="file"
            accept="image/*"
            onChange={handleBackgroundUpload}
            className="hidden"
          />
          <label htmlFor="bg-uploader" className="cursor-pointer w-full flex items-center justify-center gap-2 text-white">
            <img src="/images/icons/background.png" alt="icon" className="w-6 h-6" />
            Change background
          </label>
        </div>
      </div>
    </div>
  );
};

export default LeftColumn;
