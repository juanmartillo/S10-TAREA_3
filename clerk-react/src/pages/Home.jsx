import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white px-6">
      <h1 className="text-5xl font-extrabold mb-4 text-center drop-shadow-lg">
        Bienvenido a <span className="text-yellow-300">MiApp</span>
      </h1>
      <p className="text-lg max-w-xl text-center mb-8 drop-shadow-md">
        La mejor plataforma para gestionar tu cuenta con login tradicional y OAuth integrado.
      </p>

      <div className="flex flex-wrap gap-6 justify-center">
        <SignedOut>
          <Link
            to="/register"
            className="px-6 py-3 bg-yellow-400 rounded-lg font-semibold text-gray-900 shadow-lg hover:bg-yellow-300 transition"
          >
            Crear Cuenta
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-indigo-700 transition"
          >
            Iniciar Sesión Tradicional
          </Link>
          <SignInButton mode="modal">
            <button className="px-6 py-3 bg-white text-indigo-700 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition">
              Iniciar Sesión con OAuth
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <Link
            to="/dashboard"
            className="px-8 py-4 bg-yellow-300 rounded-lg font-bold text-indigo-900 shadow-lg hover:bg-yellow-400 transition"
          >
            Ir al Dashboard
          </Link>
        </SignedIn>
      </div>
    </div>
  );
}
