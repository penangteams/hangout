
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
  | "Announcements";