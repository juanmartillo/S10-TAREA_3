import React, { useState } from 'react';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await loginUser(form);
      if (res.user) {
        setUser(res.user);
        navigate('/dashboard');
      } else {
        setError('Credenciales inválidas');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Iniciar Sesión</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="email"
          type="email"
          placeholder="Correo"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="mt-4 bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
