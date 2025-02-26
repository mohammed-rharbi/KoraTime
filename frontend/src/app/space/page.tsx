import Link from 'next/link';
import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">


      <Header/>

      <section className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-5xl font-bold mb-4 animate-fade-in">
            Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Player!</span>
          </h2>
          <p className="text-gray-400 mb-8 animate-fade-in delay-100">
            Ready to dominate the field? Check out your stats and recent activity below.
          </p>
          <button className="bg-gradient-to-r from-green-400 to-blue-400 text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity animate-fade-in delay-200">
            Join a Match
          </button>
      </section>

      <section className="container mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
          Your Stats
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-green-400/50 transition-all hover:scale-105">
            <p className="text-gray-400">Matches Played</p>
            <p className="text-4xl font-bold text-green-400">25</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-blue-400/50 transition-all hover:scale-105">
            <p className="text-gray-400">Goals Scored</p>
            <p className="text-4xl font-bold text-blue-400">18</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-purple-400/50 transition-all hover:scale-105">
            <p className="text-gray-400">Win Rate</p>
            <p className="text-4xl font-bold text-purple-400">72%</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
          Recent Activity
        </h3>
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
          <ul className="space-y-4">
            <li className="flex justify-between items-center p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors">
              <p className="text-gray-300">Match vs Team Alpha</p>
              <span className="bg-green-400/10 text-green-400 px-3 py-1 rounded-full text-sm">Won</span>
            </li>
            <li className="flex justify-between items-center p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors">
              <p className="text-gray-300">Match vs Team Bravo</p>
              <span className="bg-red-400/10 text-red-400 px-3 py-1 rounded-full text-sm">Lost</span>
            </li>
            <li className="flex justify-between items-center p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors">
              <p className="text-gray-300">Match vs Team Charlie</p>
              <span className="bg-green-400/10 text-green-400 px-3 py-1 rounded-full text-sm">Won</span>
            </li>
          </ul>
        </div>
      </section>


      <Footer/>

    </div>
  );
}