import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">

      <div className="absolute w-96 h-96 bg-green-500 opacity-20 blur-3xl rounded-full -top-10 -left-20"></div>
      <div className="absolute w-80 h-80 bg-green-700 opacity-20 blur-3xl rounded-full bottom-10 right-10"></div>
    

      <div className="relative bg-white/10 backdrop-blur-lg border border-gray-700 shadow-2xl p-12 rounded-3xl w-full max-w-lg text-center">
        <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">
          KoraTime Admin
        </h1>
        <p className="text-gray-300 text-lg font-medium mb-8">
          Exclusive access to manage the platform
        </p>

        <div className="space-y-6">
          <Link href="/auth/login" className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-105 duration-300 shadow-lg text-center">
            Log In
          </Link>
          <Link href="/" className="block text-gray-400 hover:text-white transition duration-300 text-center">
            Back to Main Platform
          </Link>
        </div>
      </div>
    </div>
  );
}
