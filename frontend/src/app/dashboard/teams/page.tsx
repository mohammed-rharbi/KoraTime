'use client'
import React, { useEffect } from "react";
import MainLayout from "@/components/mainLayout";
import { motion, AnimatePresence } from "framer-motion";
import { UserGroupIcon, TrophyIcon, CalendarIcon, ChartBarIcon, UserPlusIcon, PencilSquareIcon, TrashIcon, UsersIcon, MapPinIcon,
 ClockIcon, MagnifyingGlassIcon, FunnelIcon,} from "@heroicons/react/24/outline";
import useTeamStore from "../../../../store/teamStore";
import Photo from "@/components/ui/Image";

const TeamsPage = () => {

  const { teams , getAllTeams } = useTeamStore()

  useEffect(()=>{

    getAllTeams()

  },[getAllTeams])

  return (
    <MainLayout>
      <div className="p-8 bg-gray-50 min-h-screen dark:bg-gray-900">

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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Teams</p>
                <p className="text-2xl font-bold dark:text-white">{teams?.length}</p>
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

        <div className="rounded-xl bg-white shadow-sm overflow-hidden dark:bg-gray-800 mb-8">
          <div className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                placeholder="Search teams..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700"/>
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


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {teams?.map((team) => (
              <motion.div
                key={team._id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                className="group relative bg-gradient-to-br from-gray-800 to-[#0F172A] rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
                style={{ borderTop: `4px solid ${team.teamColor}` }}
              >

                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Photo 
                        url={team.logo || '/default-team-logo.svg'} 
                        style="w-12 h-12 rounded-lg bg-gray-700 object-cover"
                        alt={team.name}
                      />
                      <div className="absolute -bottom-2 -right-2 bg-[#1A1F2E] px-2 py-1 rounded-full text-xs font-bold text-[#2DD4BF]">
                        #{team.formation || '4-4-2'}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{team.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPinIcon className="h-4 w-4 text-gray-400" />
                        <p className="text-sm text-gray-400">{team.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400">Captain</p>
                    <div className="flex items-center gap-2">
                      <Photo
                        url={team.captain.profilePic as string}
                        style="w-8 h-8 rounded-full border-2 border-[#2DD4BF]"
                        alt={team.captain.userName}
                      />
                      <p className="font-medium text-white">{team.captain.userName}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400">Squad</p>
                    <p className="text-2xl font-bold text-[#2DD4BF]">
                      {team.members?.length || 0}
                      <span className="text-sm text-gray-400 ml-1">players</span>
                    </p>
                  </div>
                </div>


                {team.members && team.members.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs text-gray-400 mb-3">Team Roster</p>
                    <div className="flex">
                      {team.members.slice(0, 5).map((member, index) => (
                        <div 
                          key={member._id}
                          className="relative -mr-3 transition-transform hover:-translate-y-2"
                          style={{ zIndex: 5 - index }}
                        >
                          <Photo
                            url={member.profilePic as string}
                            style="w-10 h-10 rounded-full border-2 border-[#1A1F2E] hover:border-[#2DD4BF] transition-all"
                            alt={member.userName}
                          />
                        </div>
                      ))}
                      {team.members.length > 5 && (
                        <div className="w-10 h-10 rounded-full bg-[#2DD4BF]/10 flex items-center justify-center border-2 border-[#1A1F2E] text-[#2DD4BF] text-xs font-bold">
                          +{team.members.length - 5}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-[#2DD4BF]/10 rounded-lg transition-colors">
                      <PencilSquareIcon className="h-5 w-5 text-[#2DD4BF]" />
                    </button>
                    <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors">
                      <TrashIcon className="h-5 w-5 text-red-400" />
                    </button>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-[#2DD4BF]/10 hover:bg-[#2DD4BF]/20 text-[#2DD4BF] transition-colors">
                    <UsersIcon className="h-5 w-5" />
                    Manage
                  </button>
                </div>

                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div 
                    className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-[#2DD4BF]/20 to-[#84CC16]/20 blur-md"
                    aria-hidden="true"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

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

              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TeamsPage;