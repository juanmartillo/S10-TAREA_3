import React from 'react';
import {
  UserButton,
  useAuth as useAuthClerk,
} from '@clerk/clerk-react';

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';

import { AuthProvider, useAuth as useAuthContext } from './auth/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { loading, user: userContext } = useAuthContext();
  const { isLoaded, isSignedIn } = useAuthClerk();

  if (loading || !isLoaded) {
    return <p className="p-4 text-center text-gray-500">Cargando...</p>;
  }

  const isAuthenticated = isSignedIn || !!userContext;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function InnerApp() {
  const { loading, user: userContext, setUser } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (!loading) {
      if (userContext && location.pathname === '/') {
        navigate('/dashboard');
      }
    }
  }, [loading, userContext, location.pathname, navigate]);

const handleLogout = () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  setUser(null);
  navigate('/');
};

  if (loading) {
    return <p className="p-4 text-center text-gray-500">Cargando...</p>;
  }

  return (
    <>
      <header className="p-4 bg-gray-100 flex justify-between items-center shadow-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-indigo-700">Mi App</h1>

        <nav className="flex items-center gap-4">
          {userContext && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Cerrar Sesión
            </button>
          )}
          <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'w-10 h-10',
                  },
                }}
              />
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard user={userContext} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
    );
  }

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <InnerApp />
      </BrowserRouter>
    </AuthProvider>
  );
}
