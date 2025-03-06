'use client'
import React from "react";
import MainLayout from "@/components/mainLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserGroupIcon,
  TrophyIcon,
  CalendarIcon,
  ChartBarIcon,
  UserPlusIcon,
  PencilSquareIcon,
  TrashIcon,
  UsersIcon,
  MapPinIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

const TeamsPage = () => {
  const teams = [
    { 
      id: "TM-001",
      name: "Red Dragons FC",
      sport: "Soccer",
      members: 18,
      coach: "Alex Ferguson",
      nextMatch: "2024-03-20 19:00",
      status: "Active",
      division: "Premier League",
      trainingSchedule: "Mon/Wed/Fri 18:30-20:00"
    },
    { 
      id: "TM-002",
      name: "Thunder Strikers",
      sport: "Basketball",
      members: 12,
      coach: "Michael Jordan",
      nextMatch: "2024-03-22 20:30",
      status: "On Break",
      division: "Division 2",
      trainingSchedule: "Tue/Thu 17:00-19:00"
    },
  ];

  return (
    <MainLayout>
      <div className="p-8 bg-gray-50 min-h-screen dark:bg-gray-900">
        {/* Header Section */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Team Management</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage sports teams, schedules, and memberships
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm hover:shadow-md dark:bg-gray-800">
              <ChartBarIcon className="h-5 w-5" />
              Generate Report
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
              <UserPlusIcon className="h-5 w-5" />
              Create New Team
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Teams</p>
                <p className="text-2xl font-bold dark:text-white">24</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900/30">
                <UserGroupIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Players</p>
                <p className="text-2xl font-bold dark:text-white">286</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900/30">
                <TrophyIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Upcoming Matches</p>
                <p className="text-2xl font-bold dark:text-white">15</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center dark:bg-purple-900/30">
                <CalendarIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Training Sessions</p>
                <p className="text-2xl font-bold dark:text-white">42</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center dark:bg-orange-900/30">
                <ClockIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="rounded-xl bg-white shadow-sm overflow-hidden dark:bg-gray-800 mb-8">
          <div className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                placeholder="Search teams..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex gap-3 flex-wrap">
              <select className="rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700">
                <option>All Sports</option>
                <option>Soccer</option>
                <option>Basketball</option>
                <option>Volleyball</option>
              </select>
              <select className="rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700">
                <option>All Divisions</option>
                <option>Premier League</option>
                <option>Division 1</option>
                <option>Division 2</option>
              </select>
              <button className="flex items-center gap-2 rounded-lg border bg-gray-50 px-4 py-2 hover:shadow-md dark:border-gray-700 dark:bg-gray-700">
                <FunnelIcon className="h-5 w-5" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {teams.map((team) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold dark:text-white">{team.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {team.sport} • {team.division}
                    </p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-sm ${
                    team.status === 'Active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {team.status}
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Team Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Coach</p>
                      <p className="font-medium dark:text-white">{team.coach}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Members</p>
                      <p className="font-medium dark:text-white">{team.members} players</p>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm dark:text-gray-300">
                        Next Match: {team.nextMatch}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm dark:text-gray-300">
                        Training: {team.trainingSchedule}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <PencilSquareIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <TrashIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
                      <UsersIcon className="h-5 w-5" />
                      Manage Roster
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Calendar Section */}
        <div className="mt-8 rounded-xl bg-white shadow-sm dark:bg-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Team Calendar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 dark:bg-gray-700">
              <h3 className="font-medium mb-2 dark:text-white">Upcoming Matches</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-white dark:bg-gray-600">
                  <MapPinIcon className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium dark:text-white">Red Dragons vs Thunder Strikers</p>
                    <p className="text-xs text-gray-500 dark:text-gray-300">Mar 20 • 19:00 - Stadium Arena</p>
                  </div>
                </div>
                {/* More matches... */}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 dark:bg-gray-700">
              <h3 className="font-medium mb-2 dark:text-white">Training Sessions</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-white dark:bg-gray-600">
                  <ClockIcon className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium dark:text-white">Red Dragons FC Training</p>
                    <p className="text-xs text-gray-500 dark:text-gray-300">Mar 18 • 18:30-20:00 - Field 2</p>
                  </div>
                </div>
                {/* More trainings... */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TeamsPage;