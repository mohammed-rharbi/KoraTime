import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 to-green-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center border-2 border-green-700">
        <h1 className="text-4xl font-bold text-green-900 mb-6">Welcome to KoraTime!</h1>
        <p className="text-gray-700 mb-6">Your ultimate football platform.</p>
        <div className="space-y-4">
          <Link href="/auth/login" className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors">
              Log In
          </Link>
          <Link href="/auth/register" className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors">
              Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}