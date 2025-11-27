import { atom } from "recoil";
import type { ButtonType } from "@/types";

export interface EventState {
  name: string;
  phoneNumber: string;
  date: string;
  time: string;
  location: string;
  cost: string;
  capacity: string;
  links: string[];
  activeButton: ButtonType | null;
  mainButtons: ButtonType[];
  dropdownButtons: ButtonType[];
  dropdownOpen: boolean;
}

export const allButtons: ButtonType[] = [
  "Capacity",
  "Photo gallery",
  "Links",
  "Privacy",
  "Announcements",
];

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
    activeButton: null,
    mainButtons: allButtons.slice(0, 3),
    dropdownButtons: allButtons.slice(3),
    dropdownOpen: false,
  },
});
