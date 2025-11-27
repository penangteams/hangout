import React from "react";

interface Props {
  state: any;
  setState: React.Dispatch<any>;
  modalRef: React.RefObject<HTMLDivElement>;
}

const Modals: React.FC<Props> = ({ state, setState, modalRef }) => {
  const active = state.activeButton;

  if (!["Photo gallery", "Privacy", "Announcements"].includes(active || "")) {
    return null;
  }

  const fieldMap: Record<string, string> = {
    "Photo gallery": "photoGalleryText",
    "Privacy": "privacyText",
    "Announcements": "announcementsText",
  };
  const fieldName = fieldMap[active];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
      <div
        ref={modalRef}
        className="relative bg-gradient-to-b from-[#817182] to-[#746779] p-6 rounded-lg w-96"
      >
        <button
          className="absolute top-3 right-3 text-white/50 hover:text-white text-3xl font-bold"
          onClick={() => setState((prev: any) => ({ ...prev, activeButton: null }))}
        >
          ×
        </button>

        <h2 className="text-white text-lg font-semibold mb-4">{active}</h2>

        {/* show textarea for privacy, photo gallery and announcements share same textarea storage mapping */}
        <textarea
          className="w-full min-h-[160px] p-3 rounded-md bg-white/10 text-white border border-white/20 focus:outline-none"
          placeholder={`Enter ${active} details…`}
          value={state[fieldName] || ""}
          onChange={(e) =>
            setState((prev: any) => ({ ...prev, [fieldName]: e.target.value }))
          }
        />
      </div>
    </div>
  );
};

export default Modals;
