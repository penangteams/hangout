import React, { useState, useRef, useEffect } from "react";
import { FaArrowRight, FaPlus, FaUserFriends, FaLink } from "react-icons/fa";
import invited from "/images/invited.png";
import colorPalette from "/images/icons/color-palette.png";
import Diskette from "/images/icons/diskette.png";
import Calendar from "/images/icons/calendar.png";
import Pin from "/images/icons/pin.png";
import Cash from "/images/icons/cash.png";
import Background from "/images/icons/background.png";
import Rocket from "/images/icons/rocket.png";
import Create from "/images/icons/create.png";
import type { ButtonType } from "@/types";
import toast from "react-hot-toast";

export const CreateEventPage1: React.FC = () => {
  const allButtons: ButtonType[] = [
    "Capacity",
    "Photo gallery",
    "Links",
    "Privacy",
    "Announcements",
  ];

  const [capacity, setCapacity] = useState("");
  const [links, setLinks] = useState<string[]>([""]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [activeButton, setActiveButton] = useState<ButtonType | null>(null);
  const [mainButtons, setMainButtons] = useState<ButtonType[]>(allButtons.slice(0, 3));
  const [dropdownButtons, setDropdownButtons] = useState<ButtonType[]>(allButtons.slice(3));
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        if (
          activeButton === "Photo gallery" ||
          activeButton === "Privacy" ||
          activeButton === "Announcements"
        ) {
          setActiveButton(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeButton]);

  const handleButtonClick = (btn: ButtonType) => {
    setActiveButton(btn);

    if (mainButtons.includes(btn)) {
      const updatedMain = mainButtons.filter((b) => b !== btn);
      const updatedDropdown = [...dropdownButtons, btn];
      while (updatedMain.length < 3 && updatedDropdown.length > 0) {
        const move = updatedDropdown.shift()!;
        updatedMain.push(move);
      }
      setMainButtons(updatedMain);
      setDropdownButtons(updatedDropdown);
    }
  };

  const handleDropdownButtonClick = (btn: ButtonType) => {
    handleButtonClick(btn);
    setDropdownOpen(false);
  };

  const handleAddLink = () => setLinks([...links, ""]);
  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  // ✅ Arrow button click: call MSW endpoint and show toast
  const handleArrowClick = async () => {
    try {
      const response = await fetch("/api/save-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to save phone number");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#d5aecb] to-[#46497c] p-6">
      <p className="text-white text-2xl font-syne font-bold px-16">
        let's hang
      </p>
      <div className="flex w-full h-full gap-10 p-4 px-16">
        {/* LEFT COLUMN */}
        <div className="flex flex-col w-1/3 gap-4">
          <div className="w-full flex items-center justify-center overflow-hidden rounded relative shadow-[0_6px_18px_rgba(180,165,220,0.35)]">
            <img src={invited} alt="Invited" className="w-100 h-100 rounded-2xl" />
            <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-[#575585] flex items-center justify-center">
              <img src={Create} alt="icon" className="w-4 h-4" />
            </div>
          </div>
          <div className="bg-gradient-to-b from-[#a494b7] to-[#a593b9] rounded-lg text-sm">
            <button className="w-full text-white py-3 flex items-center justify-center gap-2">
              <img src={Background} alt="icon" className="w-6 h-6" />
              Change background
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col w-2/3 gap-4">
          {/* Event Name Input */}
          <input
            type="text"
            placeholder="Name your event"
            className="w-full text-white/50 text-4xl placeholder-white/50 px-4 py-3 resize-none"
          />

          {/* Draft Row */}
          <div className="flex items-center justify-between p-3 bg-gradient-to-b from-[#817182] to-[#746779] rounded-lg text-white/50 text-sm">
            <div className="flex items-center gap-2 flex-1">
              <img src={Diskette} alt="icon" className="w-6 h-6" />
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
                className="bg-transparent outline-none text-white/50 placeholder-white/50 text-sm"
                min={new Date().toLocaleDateString("en-CA")}
              />
              <input
                type="time"
                className="bg-transparent outline-none text-white/50 placeholder-white/50 text-sm ml-2"
              />
            </div>
            <hr className="border-t border-white/30 my-1" />
            <div className="flex items-center gap-2 flex-1">
              <img src={Pin} alt="icon" className="w-6 h-6" />
              <input
                type="text"
                placeholder="Location"
                className="w-full bg-transparent outline-none text-white/50 placeholder-white/50 text-sm"
              />
            </div>
            <hr className="border-t border-white/30 my-1" />
            <div className="flex items-center gap-2 flex-1">
              <img src={Cash} alt="icon" className="w-6 h-6" />
              <input
                type="text"
                placeholder="Cost per person ($)"
                className="bg-transparent outline-none text-white/50 placeholder-white/50 text-sm w-full"
              />
            </div>
          </div>

          <textarea
            placeholder="Describe your event"
            className="w-full p-3 pt-1 pl-3 bg-gradient-to-b from-[#817182] to-[#746779] rounded-lg text-white/50 resize-none text-sm"
            rows={3}
          />

          {/* Conditional forms above buttons */}
          {activeButton === "Capacity" && (
            <div className="w-full bg-gradient-to-b from-[#817182] to-[#746779] rounded-lg flex items-center p-3 text-white/50 text-sm mt-2">
              <FaUserFriends className="mr-2 text-white/50" size={18} />
              <input
                type="text"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full bg-transparent outline-none text-white/50 placeholder-white/50 text-sm"
                placeholder="0"
              />
            </div>
          )}

          {activeButton === "Links" && (
            <div className="w-full bg-gradient-to-b from-[#817182] to-[#746779] p-3 rounded-lg flex flex-col gap-2 text-white/50 text-sm mt-2">
              {links.map((link, idx) => (
                <div key={idx} className="flex items-center w-full bg-[#746779] rounded p-2">
                  <FaLink className="mr-2 text-white/50 cursor-pointer" size={16} />
                  <input
                    type="text"
                    value={link}
                    onChange={(e) => handleLinkChange(idx, e.target.value)}
                    className="w-full bg-transparent outline-none text-white/50 placeholder-white/50 text-sm"
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

          {/* Buttons + Show More */}
          <div className="flex gap-3 justify-start w-full max-w-2xl text-sm relative mt-2">
            {mainButtons.map((btn) => (
              <button
                key={btn}
                className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg bg-gradient-to-b from-[#a494b7] to-[#a593b9] text-white"
                onClick={() => handleButtonClick(btn)}
              >
                <FaPlus size={12} />
                {btn}
              </button>
            ))}

            {dropdownButtons.length > 0 && (
              <div ref={dropdownRef} className="relative">
                <p
                  className="flex items-center text-white whitespace-nowrap text-white/40 cursor-pointer select-none"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  Show More
                </p>
                {dropdownOpen && (
                  <div className="absolute mt-1 left-0 w-48 bg-[#817182] rounded-lg shadow-lg flex flex-col z-10">
                    {dropdownButtons.map((btn) => (
                      <button
                        key={btn}
                        className="text-white p-2 text-left hover:bg-[#746779] rounded-t last:rounded-b"
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

          {/* Modal for Photo gallery, Privacy, Announcements */}
          {activeButton &&
            (activeButton === "Photo gallery" ||
              activeButton === "Privacy" ||
              activeButton === "Announcements") && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
                <div
                  ref={modalRef}
                  className="relative bg-gradient-to-b from-[#817182] to-[#746779] p-6 rounded-lg w-96"
                >
                  <button
                    className="absolute top-3 right-3 text-white/50 hover:text-white text-3xl font-bold"
                    onClick={() => setActiveButton(null)}
                  >
                    ×
                  </button>
                  <h2 className="text-white text-lg font-semibold mb-4">
                    {activeButton}
                  </h2>
                  <p className="text-white/50">
                    Modal content for {activeButton} goes here.
                  </p>
                </div>
              </div>
            )}

          {/* Row 4: Customize */}
          <div className="bg-gradient-to-b from-[#4e4b66] to-[#645a72] p-4 flex flex-col h-48 rounded-lg justify-between">
            <div className="flex-1 flex items-center justify-center text-gray-50 text-md font-semibold text-center leading-tight">
              Customize your <br /> event your way
            </div>
            <div className="bg-gradient-to-b from-[#706a8c] to-[#726d8c] rounded-lg">
              <button className="w-full text-white text-semibold text-sm py-3 rounded flex items-center justify-center gap-2">
                <img src={colorPalette} alt="icon" className="w-6 h-6" />
                Customize
              </button>
            </div>
          </div>

          {/* Row 5: Go live */}
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
