// src/App.tsx
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { usersState} from '@/state/userState';
import type { User } from "@/types"
import { getUsers, createUser, updateUser, deleteUser } from '@/services/userService';

export default function App() {
  const [users, setUsers] = useRecoilState(usersState);
  const [name, setName] = useState('');

  useEffect(() => {
    getUsers().then(setUsers);
  }, [setUsers]);

  const handleAdd = async () => {
    const newUser = await createUser({ name });
    setUsers([...users, newUser]);
    setName('');
  };

  const handleUpdate = async (user: User) => {
    const updated = await updateUser(user.id, { name: user.name + '!' });
    setUsers(users.map(u => (u.id === user.id ? updated : u)));
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div>
      <h1>Users</h1>
      <input className="mb-8" value={name} onChange={e => setName(e.target.value)} placeholder="New user name" />
      <button onClick={handleAdd}>Add User</button>

      <ul>
        {users.map(u => (
          <li key={u.id}>
            <p className="text-5xl underline text-regal-gr">{u.name}</p>
            <button onClick={() => handleUpdate(u)}>Update</button>{' '}
            <button onClick={() => handleDelete(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
