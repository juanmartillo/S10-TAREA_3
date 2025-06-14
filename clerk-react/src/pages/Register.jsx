import { useState } from 'react';
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Register = () => {
  const [form, setForm] = useState({ name: '', surname: '', email: '', password: '' });
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  try {
    const data = await registerUser(form);

    if (data?.id && data?.email) {
      setUser(data);
      navigate('/dashboard');
    } else {
      setError('Registro fallido. Intenta nuevamente.');
    }
  } catch (err) {
    const mensaje = typeof err === 'string' ? err : err?.message || 'Error al registrar usuario';
    setError(mensaje);
    console.error('Error al registrar usuario:', err);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 max-w-md w-full"
        noValidate
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Crear Cuenta</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-1 font-medium">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Tu nombre"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="surname" className="block text-gray-700 mb-1 font-medium">
            Apellido
          </label>
          <input
            id="surname"
            name="surname"
            type="text"
            placeholder="Tu apellido"
            value={form.surname}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1 font-medium">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="correo@ejemplo.com"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-1 font-medium">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
