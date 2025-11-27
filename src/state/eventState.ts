import { atom, AtomEffect } from "recoil";
import type { ButtonType, EventState } from "@/types";

export const allButtons: ButtonType[] = [
  "Capacity",
  "Photo gallery",
  "Links",
  "Privacy",
  "Announcements",
];

// Type-safe localStorage effect for Recoil
const localStorageEffect =
  (key: string): AtomEffect<EventState> =>
  ({ setSelf, onSet }) => {
    // Load saved value from localStorage on initialization
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      try {
        setSelf(JSON.parse(savedValue) as EventState);
      } catch (e) {
        console.error("Failed to parse localStorage value for", key, e);
      }
    }

    // Subscribe to changes and save them to localStorage
    onSet((newValue, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const eventState = atom<EventState>({
  key: "eventState",
default: {
  name: "",
  phoneNumber: "",
  date: "",
  time: "",
  location: "",
  cost: "",
  capacity: "",
  links: [""],
  description: "",
  privacyText: "",
  photoGalleryText: "",
  announcementsText: "",
  activeButton: null,
  mainButtons: allButtons.slice(0, 3),
  dropdownButtons: allButtons.slice(3),
  dropdownOpen: false,
  background: "",
},
  effects: [localStorageEffect("eventState")],
});
