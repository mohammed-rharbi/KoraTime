import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">

      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-900">KoraTime</h1>
          <div className="flex items-center space-x-4">
            <Link href="/profile" className="text-green-700 hover:text-green-900">
              Profile
            </Link>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </header>


      <section className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-4xl font-bold text-green-900 mb-4">Welcome Back, Player!</h2>
        <p className="text-gray-600 mb-8">Ready to dominate the field? Check out your stats and recent activity below.</p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
          Join a Match
        </button>
      </section>


      <section className="container mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold text-green-900 mb-6">Your Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600">Matches Played</p>
            <p className="text-3xl font-bold text-green-900">25</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600">Goals Scored</p>
            <p className="text-3xl font-bold text-green-900">18</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600">Win Rate</p>
            <p className="text-3xl font-bold text-green-900">72%</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold text-green-900 mb-6">Recent Activity</h3>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <p className="text-gray-600">Match vs Team Alpha</p>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">Won</span>
            </li>
            <li className="flex justify-between items-center">
              <p className="text-gray-600">Match vs Team Bravo</p>
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">Lost</span>
            </li>
            <li className="flex justify-between items-center">
              <p className="text-gray-600">Match vs Team Charlie</p>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">Won</span>
            </li>
          </ul>
        </div>
      </section>

      <footer className="bg-white mt-12 py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600">&copy; 2023 KoraTime. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/about" className="text-green-700 hover:text-green-900">
              About
            </Link>
            <Link href="/contact" className="text-green-700 hover:text-green-900">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}