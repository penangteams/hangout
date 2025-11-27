// src/state/userState.ts
import { atom, selectorFamily } from 'recoil';
import type { User } from "@/types"

export const usersState = atom<User[]>({
  key: 'usersState',
  default: [],
});

// Selector family for getting a single user by id
export const userByIdQuery = selectorFamily<User | undefined, number>({
  key: 'userByIdQuery',
  get: (id: number) => async () => {
    const res = await fetch(`/api/users/${id}`);
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
  },
});
