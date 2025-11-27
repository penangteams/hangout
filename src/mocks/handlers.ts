// src/mocks/handlers.ts
import { http } from 'msw';
import type { User } from '@/types';

// In-memory users array
let users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

// In-memory storage for phone numbers
let phoneNumbers: string[] = [];

export const handlers = [
// POST /api/events  — create event
 http.post<never, any, { id: string }>("/api/events", async ({ request }) => {
    const evt = await request.json();
    return new Response(JSON.stringify({ id: "mocked-id", ...evt }), { status: 201 });
  }),
  // GET all users
  http.get('/api/users', () => {
    return new Response(JSON.stringify(users), { status: 200 });
  }),

  // GET single user by ID
  http.get<{ id: string }>('/api/users/:id', ({ params }) => {
    const user = users.find(u => u.id === Number(params.id));
    if (!user) return new Response(null, { status: 404 });
    return new Response(JSON.stringify(user), { status: 200 });
  }),

  // CREATE user
  http.post<never, { name: string }, User>(
    '/api/users',
    async ({ request }) => {
      const body = (await request.json()) as { name: string };
      const newUser: User = { id: users.length + 1, name: body.name };
      users.push(newUser);
      return new Response(JSON.stringify(newUser), { status: 201 });
    }
  ),

  // UPDATE user
  http.put<{ id: string }, { name?: string }, User>(
    '/api/users/:id',
    async ({ request, params }) => {
      const body = (await request.json()) as { name?: string };
      const index = users.findIndex(u => u.id === Number(params.id));
      if (index === -1) return new Response(null, { status: 404 });
      users[index] = { ...users[index], ...body };
      return new Response(JSON.stringify(users[index]), { status: 200 });
    }
  ),

  // DELETE user
  http.delete<{ id: string }>('/api/users/:id', ({ params }) => {
    users = users.filter(u => u.id !== Number(params.id));
    return new Response(null, { status: 204 });
  }),

  // SAVE phone number
  http.post<never, { phoneNumber: string }, { message: string }>(
    '/api/save-phone',
    async ({ request }) => {
      const body = (await request.json()) as { phoneNumber: string };
      if (!body.phoneNumber) {
        return new Response(JSON.stringify({ message: 'Phone number required' }), { status: 400 });
      }
      phoneNumbers.push(body.phoneNumber);
      console.log('MSW saved phone number:', body.phoneNumber);
      return new Response(JSON.stringify({ message: 'Phone number saved successfully' }), { status: 200 });
    }
  ),

// Catch-all handler to prevent unhandled request warnings
http.get('*', ({ request }) => {
  // Ignore static assets
  if (request.url.includes('/images/')) return;

  console.warn(`[MSW] No handler for request: ${request.method} ${request.url}`);
  // Returning undefined means the request goes to the network
}),
];
