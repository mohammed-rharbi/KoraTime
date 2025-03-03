import React from "react";
import MainLayout from "@/components/mainLayout";
import QuickAction from "@/components/dashboard/panel/quickAction";
import FieldUtilization from "@/components/dashboard/panel/fieldUtilization";
import RecentActivities from "@/components/dashboard/panel/recentActivities";
import UpcomingReservations from "@/components/dashboard/panel/upcomingReservations";
import Link from "next/link";


export default function Dashboard() {
  return (

      <MainLayout>

        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">KoraTime Admin Panel</h1>
            <p className="text-gray-400 mt-2">Manage your football facilities</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg transition-colors">
              Generate Report
            </button>
            <Link href={'/dashboard/fields/createField'} className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-lg transition-colors">
              Add New Field
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <span className="text-2xl">⏰</span>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Active Reservations</p>
                <p className="text-2xl font-bold">84</p>
                <span className="text-green-400 text-sm">↑ 22%</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-green-500/50 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <span className="text-2xl">⚽</span>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Fields</p>
                <p className="text-2xl font-bold">15</p>
                <span className="text-green-400 text-sm">3 new</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <span className="text-2xl">👥</span>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Registered Teams</p>
                <p className="text-2xl font-bold">62</p>
                <span className="text-green-400 text-sm">↑ 8.4%</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-orange-500/50 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <span className="text-2xl">⚠️</span>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Pending Approvals</p>
                <p className="text-2xl font-bold">9</p>
                <span className="text-yellow-400 text-sm">3 urgent</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
         

        <UpcomingReservations/>


        <FieldUtilization/>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
        <RecentActivities/>

        <QuickAction/>

        </div>

      </MainLayout>

);
}