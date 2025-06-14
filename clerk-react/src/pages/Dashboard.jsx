import { useAuth } from '../auth/AuthContext';
import { useUser } from '@clerk/clerk-react';

export function Dashboard() {
  const { user } = useAuth(); 
  const { user: clerkUser, isSignedIn } = useUser(); 

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {isSignedIn ? (
        <div className="space-y-4">
          <p><strong>Usuario Clerk (OAuth):</strong></p>
          <p>Email: {clerkUser?.emailAddresses[0]?.emailAddress}</p>
          <p>Nombre: {clerkUser?.firstName} {clerkUser?.lastName}</p>
          <p>ID Clerk: {clerkUser?.id}</p>
        </div>
      ) : (
        <p>No estás autenticado con Clerk.</p>
      )}

      <hr className="my-6" />

      {user ? (
        <div className="space-y-4">
          <p><strong>Usuario Backend (Token):</strong></p>
          <p>Email: {user.email}</p>
          <p>ID: {user.id}</p>
        </div>
      ) : (
        <p>No estás autenticado con el backend.</p>
      )}
    </div>
  );
}
