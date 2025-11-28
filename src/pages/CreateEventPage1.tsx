// src/pages/CreateEventPage1.tsx

import React, { useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import toast from "react-hot-toast";

import { eventState } from "@/state/eventState";
import LeftColumn from "@/components/LeftColumn";
import EventName from "@/components/RightColumn/EventName";
import PhoneInput from "@/components/RightColumn/PhoneInput";
import DateLocationCost from "@/components/RightColumn/DateLocationCost";
import DescriptionBox from "@/components/RightColumn/Description";
import Capacity from "@/components/RightColumn/Capacity";
import Links from "@/components/RightColumn/Links";
import ButtonsRow from "@/components/RightColumn/Buttons";
import Modals from "@/components/RightColumn/Modals";
import CustomizeBox from "@/components/RightColumn/Customize";
import GoLive from "@/components/RightColumn/GoLive";

export const CreateEventPage1: React.FC = () => {
  const [state, setState] = useRecoilState(eventState);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setState(prev => ({ ...prev, dropdownOpen: false }));
      }
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        if (["Photo gallery", "Privacy", "Announcements"].includes(state.activeButton || "")) {
          setState(prev => ({ ...prev, activeButton: null }));
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [state.activeButton, setState]);

  const handleButtonClick = (btn: string) => {
    setState(prev => {
      const { mainButtons, dropdownButtons } = prev;
      if (mainButtons.includes(btn)) {
        const updatedMain = mainButtons.filter(b => b !== btn);
        const updatedDropdown = [...dropdownButtons, btn];
        while (updatedMain.length < 3 && updatedDropdown.length > 0) {
          updatedMain.push(updatedDropdown.shift()!);
        }
        return { ...prev, activeButton: btn, mainButtons: updatedMain, dropdownButtons: updatedDropdown };
      }
      return { ...prev, activeButton: btn };
    });
  };

  const handleDropdownButtonClick = (btn: string) => {
    handleButtonClick(btn);
    setState(prev => ({ ...prev, dropdownOpen: false }));
  };

  const handleAddLink = () => {
    setState(prev => ({ ...prev, links: [...prev.links, ""] }));
  };

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...state.links];
    newLinks[index] = value;
    setState(prev => ({ ...prev, links: newLinks }));
  };

  const handleDeleteLink = (index: number) => {
    setState(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index),
    }));
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

  // Background upload helpers
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });

const handleBackgroundUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const MAX_MB = 5;
  if (file.size > MAX_MB * 1024 * 1024) {
    toast.error(`Image too large — max ${MAX_MB} MB`);
    return;
  }

  try {
    const base64 = await fileToBase64(file);
    setState(prev => ({ ...prev, background: base64 }));
    toast.success("Background updated!");

    // FIX: reset using ref, not event target
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

  } catch (err) {
    console.error(err);
    toast.error("Failed to load image");
  }
};

  const handleClearBackground = () => {
    setState(prev => ({ ...prev, background: "" }));
    toast.success("Background cleared");
  };
const handleGoLive = async () => {
  try {
    console.log("hey go live!")
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    });

    if (!res.ok) {
      toast.error("Failed to go live");
      return;
    }

    const data = await res.json();
    toast.success("Event created — id: " + data.id);
    // optionally: clear state or redirect
  } catch (err) {
    console.error(err);
    toast.error("Network error");
  }
};

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#d5aecb] to-[#46497c] p-6">
      <p className="text-white text-2xl font-syne font-bold px-16">let's hang</p>
      <div className="flex w-full h-full gap-10 p-4 px-16">
        <LeftColumn
          state={state}
          handleBackgroundUpload={handleBackgroundUpload}
          handleClearBackground={handleClearBackground}
          fileInputRef={fileInputRef}
        />

        <div className="flex flex-col w-2/3 gap-4">
          <EventName state={state} setState={setState} />

          <PhoneInput state={state} setState={setState} onArrowClick={handleArrowClick} />

          <DateLocationCost state={state} setState={setState} />

          <DescriptionBox state={state} setState={setState} />

          <Capacity state={state} setState={setState} />

          <Links
            state={state}
            handleAddLink={handleAddLink}
            handleLinkChange={handleLinkChange}
            handleDeleteLink={handleDeleteLink}
          />

          <ButtonsRow
            state={state}
            setState={setState}
            dropdownRef={dropdownRef}
            onMainButtonClick={handleButtonClick}
            onDropdownButtonClick={handleDropdownButtonClick}
          />

          <Modals state={state} setState={setState} modalRef={modalRef} />

          <CustomizeBox />

          <GoLive onGoLive={handleGoLive} />
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage1;
