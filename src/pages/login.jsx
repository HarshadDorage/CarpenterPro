import { getSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Shop Owner Portal</h1>
        
        <div className="space-y-4">
          <button
            onClick={() => signIn('credentials', { 
              callbackUrl: '/gallery',
              role: 'shopOwner' 
            })}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Login as Shop Owner
          </button>
          
          <div className="text-center text-sm text-gray-500">
            Don't have an account? Contact admin for access
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  
  if (session) {
    return {
      redirect: {
        destination: '/gallery',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}