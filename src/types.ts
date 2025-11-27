
// Option 1: Export interface
export interface User {
  id: number;
  name: string;
}

// Option 2: Define a type (alternative)
// export type User = {
//   id: number;
//   name: string;
// }

export type ButtonType =
  | "Capacity"
  | "Photo gallery"
  | "Links"
  | "Privacy"
  | "Announcements"
  | (string & {});

// Example: eventState.ts
export interface EventState {
  background: string;  
  invitedPicture?: string;
  name: string;
  phoneNumber: string;
  date: string;
  time: string;
  location: string;
  cost: string;
  capacity: string;
  links: string[];
  description: string;
  activeButton: ButtonType | null;
  mainButtons: ButtonType[];
  dropdownButtons: ButtonType[];
  dropdownOpen: boolean;
}

