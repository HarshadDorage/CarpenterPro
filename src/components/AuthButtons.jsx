import { useSession, signIn, signOut } from 'next-auth/react';

export default function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="w-24 h-10 bg-gray-200 rounded-md animate-pulse"></div>;
  }

  return (
    <div className="flex items-center space-x-4">
      {session ? (
        <>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
          <span className="text-sm text-gray-600">
            Logged in as {session.user.name}
          </span>
        </>
      ) : (
        <>
          <button
            onClick={() => signIn()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => signIn()}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Sign Up
          </button>
        </>
      )}
    </div>
  );
}