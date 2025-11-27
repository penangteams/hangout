export async function getUsers() {
  return fetch("/api/users").then((r) => r.json());
}

export async function createUser(name: string) {
  return fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  }).then((r) => r.json());
}

export async function updateUser(id: number, name: string) {
  return fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  }).then((r) => r.json());
}

export async function deleteUser(id: number) {
  return fetch(`/api/users/${id}`, {
    method: "DELETE",
  }).then((r) => r.json());
}
