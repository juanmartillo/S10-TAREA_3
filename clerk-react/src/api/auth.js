const BASE_URL = 'http://localhost:5000/api/users';

export async function registerUser(data) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result?.message || 'Error al registrar el usuario');
  }

  return result;
}


export async function loginUser(data) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function verifyToken() {
  const res = await fetch(`${BASE_URL}/verify`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('No autorizado');
  return res.json();
}

export async function logoutUser() {
  await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}
