import React, { useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { eventState } from "@/state/eventState";
import { FaArrowRight, FaPlus, FaUserFriends, FaLink } from "react-icons/fa";
import toast from "react-hot-toast";

import invited from "/images/invited.png";
import colorPalette from "/images/icons/color-palette.png";
import Diskette from "/images/icons/diskette.png";
import Calendar from "/images/icons/calendar.png";
import Pin from "/images/icons/pin.png";
import Cash from "/images/icons/cash.png";
import Background from "/images/icons/background.png";
import Rocket from "/images/icons/rocket.png";
import Create from "/images/icons/create.png";

export const CreateEventPage1: React.FC = () => {
  const [state, setState] = useRecoilState(eventState);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  // Inside your component:
const backgroundInputRef = useRef<HTMLInputElement>(null);

const handleBackgroundClick = () => {
  backgroundInputRef.current?.click();
};

const handleBackgroundChangeFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
  const file = ev.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    setState(prev => ({ ...prev, background: reader.result as string }));
  };
  reader.readAsDataURL(file);
};


  // Close dropdown + modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setState(prev => ({ ...prev, dropdownOpen: false }));
      }

      // Modal closing for Photo gallery, Privacy, Announcements
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        if (["Photo gallery", "Privacy", "Announcements"].includes(state.activeButton || "")) {
          setState(prev => ({ ...prev, activeButton: null }));
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [state.activeButton, setState]);

  const handleBackgroundChange = (newBackground: string) => {
    setState(prev => ({ ...prev, background: newBackground }));
  };

  // Handle "Capacity", "Links", etc
  const handleButtonClick = (btn: string) => {
    setState(prev => {
      let { mainButtons, dropdownButtons } = prev;

      if (mainButtons.includes(btn)) {
        const updatedMain = mainButtons.filter(b => b !== btn);
        const updatedDropdown = [...dropdownButtons, btn];

        while (updatedMain.length < 3 && updatedDropdown.length > 0) {
          updatedMain.push(updatedDropdown.shift()!);
        }

        return {
          ...prev,
          activeButton: btn,
          mainButtons: updatedMain,
          dropdownButtons: updatedDropdown,
        };
      }

      return { ...prev, activeButton: btn };
    });
  };

  const handleDropdownButtonClick = (btn: string) => {
    handleButtonClick(btn);
    setState(prev => ({ ...prev, dropdownOpen: false }));
  };

  const handleAddLink = () =>
    setState(prev => ({ ...prev, links: [...prev.links, ""] }));

  const handleLinkChange = (idx: number, value: string) => {
    const newLinks = [...state.links];
    newLinks[idx] = value;
    setState(prev => ({ ...prev, links: newLinks }));
  };

  const handleArrowClick = async () => {
    if (!state.phoneNumber) {
      toast.error("Please enter a phone number first!");
      return;
    }
    try {
      const res = await fetch("/api/save-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: state.phoneNumber }),
      });
      const data = await res.json();
      if (res.ok) toast.success(data.message);
      else toast.error(data.message || "Failed to save phone number");
    } catch {
      toast.error("Network error");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#d5aecb] to-[#46497c] p-6">
      <p className="text-white text-2xl font-syne font-bold px-16">let's hang</p>

      <div className="flex w-full h-full gap-10 p-4 px-16">
        {/* LEFT */}
        <div className="flex flex-col w-1/3 gap-4">
<div className="w-full flex items-center justify-center overflow-hidden rounded relative shadow-[0_6px_18px_rgba(180,165,220,0.35)]">
  <img
    src={state.background || invited} // <-- use state.background here
    alt="Invited"
    className="w-100 h-100 rounded-2xl"
  />
  <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-[#575585] flex items-center justify-center">
    <img src={Create} alt="icon" className="w-4 h-4" />
  </div>
</div>

          {/* Change Background with file input */}
<div className="bg-gradient-to-b from-[#a494b7] to-[#a593b9] rounded-lg text-sm relative">
  <button
    className="w-full text-white py-3 flex items-center justify-center gap-2"
    onClick={handleBackgroundClick}
  >
    <img src={Background} alt="icon" className="w-6 h-6" />
    Change background
  </button>

  {/* hidden file input */}
  <input
    type="file"
    accept="image/*"
    ref={backgroundInputRef}
    className="hidden"
    onChange={handleBackgroundChangeFile}
  />


</div>

        </div>

        {/* RIGHT */}
        <div className="flex flex-col w-2/3 gap-4">
          {/* Event Name */}
          <input
            type="text"
            value={state.name}
            onChange={e => setState(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Name your event"
            className="w-full text-white/50 text-4xl placeholder-white/50 px-4 py-3 resize-none"
          />

          {/* Phone */}
          <div className="flex items-center justify-between p-3 bg-gradient-to-b from-[#817182] to-[#746779] rounded-lg text-white/50 text-sm">
            <div className="flex items-center gap-2 flex-1">
              <img src={Diskette} alt="icon" className="w-6 h-6" />
              <input
                type="text"
                value={state.phoneNumber}
                onChange={e => setState(prev => ({ ...prev, phoneNumber: e.target.value }))}
                placeholder="Enter phone number"
                className="w-full bg-transparent outline-none text-white/50 placeholder-white/50 text-sm"
              />
            </div>

            <div
              className="px-2 py-2 bg-[#9e7e99] rounded-md flex items-center justify-center cursor-pointer"
              onClick={handleArrowClick}
            >
              <FaArrowRight className="text-white text-sm" />
            </div>
          </div>

          {/* Date / Location / Cost */}
          <div className="flex flex-col p-3 bg-gradient-to-b from-[#817182] to-[#746779] rounded-lg text-white/50 h-42 text-sm">
            <div className="flex items-center gap-2 flex-1">
              <img src={Calendar} alt="icon" className="w-6 h-6" />
              <input
                type="date"
                value={state.date}
                onChange={e => setState(prev => ({ ...prev, date: e.target.value }))}
                className="bg-transparent outline-none text-white/50 text-sm"
                min={new Date().toISOString().split("T")[0]}
              />
              <input
                type="time"
                value={state.time}
                onChange={e => setState(prev => ({ ...prev, time: e.target.value }))}
                className="bg-transparent outline-none text-white/50 text-sm ml-2"
              />
            </div>

            <hr className="border-t border-white/30 my-1" />

            <div className="flex items-center gap-2 flex-1">
              <img src={Pin} alt="icon" className="w-6 h-6" />
              <input
                type="text"
                value={state.location}
                onChange={e => setState(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Location"
                className="w-full bg-transparent outline-none text-white/50 placeholder-white/50 text-sm"
              />
            </div>

            <hr className="border-t border-white/30 my-1" />

            <div className="flex items-center gap-2 flex-1">
              <img src={Cash} alt="icon" className="w-6 h-6" />
              <input
                type="text"
                value={state.cost}
                onChange={e => setState(prev => ({ ...prev, cost: e.target.value }))}
                placeholder="Cost per person ($)"
                className="bg-transparent outline-none text-white/50 placeholder-white/50 text-sm w-full"
              />
            </div>
          </div>

          {/* Description */}
          <textarea
            value={state.description}
            onChange={e => setState(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe your event"
            className="w-full p-3 pt-1 pl-3 bg-gradient-to-b from-[#817182] to-[#746779] rounded-lg text-white/50 resize-none text-sm"
            rows={3}
          />

          {/* Capacity */}
          {state.activeButton === "Capacity" && (
            <div className="w-full bg-gradient-to-b from-[#817182] to-[#746779] rounded-lg flex items-center p-3 text-white/50 text-sm mt-2">
              <FaUserFriends className="mr-2 text-white/50" size={18} />
              <input
                type="text"
                value={state.capacity}
                onChange={e => setState(prev => ({ ...prev, capacity: e.target.value }))}
                className="w-full bg-transparent outline-none text-white/50 text-sm"
                placeholder="0"
              />
            </div>
          )}

          {/* Links */}
          {state.activeButton === "Links" && (
            <div className="w-full bg-gradient-to-b from-[#817182] to-[#746779] p-3 rounded-lg flex flex-col gap-2 text-white/50 text-sm mt-2">
              {state.links.map((link, idx) => (
                <div key={idx} className="flex items-center w-full bg-[#746779] rounded p-2">
                  <FaLink className="mr-2 text-white/50" size={16} />
                  <input
                    type="text"
                    value={link}
                    onChange={e => handleLinkChange(idx, e.target.value)}
                    className="w-full bg-transparent outline-none text-white/50 text-sm"
                    placeholder="Add link"
                  />
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
          )}

          {/* Buttons + Dropdown */}
          <div className="flex gap-3 justify-start w-full max-w-2xl text-sm relative mt-2">
            {state.mainButtons.map(btn => (
              <button
                key={btn}
                className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg bg-gradient-to-b from-[#a494b7] to-[#a593b9] text-white"
                onClick={() => handleButtonClick(btn)}
              >
                <FaPlus size={12} /> {btn}
              </button>
            ))}

            {/* Dropdown */}
            {state.dropdownButtons.length > 0 && (
              <div ref={dropdownRef} className="relative">
                <p
                  className="flex items-center text-white text-white/40 cursor-pointer select-none"
                  onClick={() => setState(prev => ({ ...prev, dropdownOpen: !prev.dropdownOpen }))}
                >
                  Show More
                </p>

                {state.dropdownOpen && (
                  <div className="absolute mt-1 left-0 w-48 bg-[#817182] rounded-lg shadow-lg flex flex-col z-10">
                    {state.dropdownButtons.map(btn => (
                      <button
                        key={btn}
                        className="text-white p-2 text-left hover:bg-[#746779]"
                        onClick={() => handleDropdownButtonClick(btn)}
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Modals */}
          {["Photo gallery", "Privacy", "Announcements"].includes(state.activeButton || "") && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
              <div
                ref={modalRef}
                className="relative bg-gradient-to-b from-[#817182] to-[#746779] p-6 rounded-lg w-96"
              >
                <button
                  className="absolute top-3 right-3 text-white/50 hover:text-white text-3xl font-bold"
                  onClick={() => setState(prev => ({ ...prev, activeButton: null }))}
                >
                  ×
                </button>

                <h2 className="text-white text-lg font-semibold mb-4">{state.activeButton}</h2>
                <p className="text-white/50">
                  Modal content for {state.activeButton} goes here.
                </p>
              </div>
            </div>
          )}

          {/* Customize */}
          <div className="bg-gradient-to-b from-[#4e4b66] to-[#645a72] p-4 flex flex-col h-48 rounded-lg justify-between">
            <div className="flex-1 flex items-center justify-center text-gray-50 text-md font-semibold text-center leading-tight">
              Customize your <br /> event your way
            </div>

            <div className="bg-gradient-to-b from-[#706a8c] to-[#726d8c] rounded-lg">
              <button className="w-full text-white text-sm py-3 rounded flex items-center justify-center gap-2">
                <img src={colorPalette} alt="icon" className="w-6 h-6" /> Customize
              </button>
            </div>
          </div>

          {/* Go live */}
          <div className="bg-gradient-to-b from-[#7673aa] to-[#7873ab] rounded-lg">
            <button className="w-full py-3 flex flex-col items-center gap-1">
              <img src={Rocket} alt="icon" className="w-6 h-6" />
              <span className="text-green-300 text-sm">Go live</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
