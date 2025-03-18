'use client'

import React, { useEffect } from "react";
import MainLayout from "@/components/mainLayout";
import { motion } from "framer-motion";
import { UserIcon, UserGroupIcon , TrophyIcon,  ChartBarIcon, PlusIcon, PencilIcon, TrashIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import usePlayersStore from "../../../../store/playersStore";

const PlayerManagement = () => {


  const {Players , getPlayers} = usePlayersStore()

  useEffect(()=>{

    getPlayers()

  },[getPlayers])


  return (
    <MainLayout>
      <div className="p-8 bg-slate-900 min-h-screen">

        <div className="max-w-7xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
              Player Dashboard
            </h1>
            <p className="text-slate-400 font-light">
              Manage your team s elite athletes with precision
            </p>
          </motion.div>
        </div>


        <div className="max-w-7xl mx-auto">

          <motion.div
            className="mb-8 flex gap-4 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search champions..."
                className="w-full pl-12 pr-4 py-3 bg-slate-800 rounded-lg shadow-xl border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-500 text-slate-200"
              />
              <svg
                className="absolute left-4 top-4 h-5 w-5 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all"
            >
              <PlusIcon className="h-5 w-5" />
              Add New Player
            </motion.button>
          </motion.div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { icon: UserIcon, title: "Active Players", value: Players?.length , color: "from-green-500 to-emerald-500" },
              { icon: TrophyIcon, title: "Total Matches", value: "8,542", color: "from-blue-500 to-cyan-500" },
              { icon: ChartBarIcon, title: "Avg. Rating", value: "4.7", color: "from-purple-500 to-fuchsia-500" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-700"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-100">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>


          <div className="bg-slate-800 rounded-xl shadow-xl overflow-hidden border border-slate-700">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  {["Player", "Contact", "Location", "Role", "Team" , "Status", "Actions"].map((header, idx) => (
                    <th
                      key={idx}
                      className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {Players?.map((player) => (
                  <motion.tr
                    key={player._id}
                    whileHover={{ scale: 1.005 }}
                    className="hover:bg-slate-750 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-600 flex items-center justify-center">
                          <UserIcon className="h-6 w-6 text-slate-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-100">{player.userName}</p>
                          <p className="text-sm text-slate-400">ID: {player._id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <EnvelopeIcon className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-300">{player.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <PhoneIcon className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-300">{player.phoneNumber}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{player.location }</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <UserIcon className="h-5 w-5 text-amber-300" />
                        <span className="font-semibold text-slate-100">{player.role}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <UserGroupIcon className="h-5 w-5 text-amber-300" />
                        <span className="text-slate-100">{player.team ? player.team : 'no team'}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        player.status === 'active'
                          ? 'bg-green-800/30 text-green-400'
                          : 'bg-red-800/30 text-red-400'
                      }`}>
                        {player.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="p-2 hover:bg-slate-700 rounded-lg text-slate-300"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="p-2 hover:bg-slate-700 rounded-lg text-red-400"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PlayerManagement;