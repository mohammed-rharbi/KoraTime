'use client'

import React from "react";
import MainLayout from "@/components/mainLayout";
import { motion } from "framer-motion";
import { UserCircleIcon, ShieldCheckIcon, KeyIcon, EnvelopeIcon, CalendarIcon, PencilIcon } from "@heroicons/react/24/outline";
import useAuthStore from "../../../../store/authStore";

const AdminProfile = () => {


  const {user} = useAuthStore()

  const recentActivity = [
    { date: '2023-08-20 14:32', action: 'Password changed', ip: '192.168.1.1' },
    { date: '2023-08-19 09:15', action: 'User permissions updated', ip: '192.168.1.2' },
    { date: '2023-08-18 16:45', action: 'System settings modified', ip: '192.168.1.3' },
  ];


  if(!user){
    return <p>user was not found</p>
  }

  return (
    <MainLayout>
      <div className="p-8 min-h-screen">
        <div className="max-w-7xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6"
          >
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-slate-800 flex items-center justify-center">
                <UserCircleIcon className="h-12 w-12 text-slate-500" />
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-slate-800 rounded-full border border-slate-700 hover:border-slate-600">
                <PencilIcon className="h-4 w-4 text-slate-400" />
              </button>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-slate-200 mb-1">Admin User</h1>
              <p className="text-slate-500 mb-2">System Administrator</p>
              <div className="flex items-center gap-4 text-slate-500 text-sm">
                <span className="flex items-center gap-1">
                  <ShieldCheckIcon className="h-4 w-4" />
                  Super Admin
                </span>
                <span className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  Joined: 2022-01-01
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              className="px-6 py-2 bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg border border-slate-700 text-slate-300 hover:text-white"
            >
              Sign Out
            </motion.button>
          </motion.div>
        </div>


        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
                <UserCircleIcon className="h-5 w-5 text-blue-500" />
                Account Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <EnvelopeIcon className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-slate-400 text-sm">Email</p>
                    <p className="text-slate-200">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <ShieldCheckIcon className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-slate-400 text-sm">Role</p>
                    <p className="text-slate-200">Super Administrator</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <KeyIcon className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-slate-400 text-sm">Permissions</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded-full text-xs">
                        Full Access
                      </span>
                      <span className="px-2 py-1 bg-purple-900/30 text-purple-400 rounded-full text-xs">
                        User Management
                      </span>
                      <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded-full text-xs">
                        System Settings
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
              <ShieldCheckIcon className="h-5 w-5 text-green-500" />
              Security
            </h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-200 text-sm mb-1">Two-Factor Authentication</p>
                  <p className="text-slate-500 text-xs">Add an extra layer of security</p>
                </div>
                <button className="px-4 py-2 bg-slate-700 rounded-lg text-slate-300 hover:text-white text-sm">
                  Enable 2FA
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-200 text-sm mb-1">Password</p>
                  <p className="text-slate-500 text-xs">Last changed 3 days ago</p>
                </div>
                <button className="px-4 py-2 bg-slate-700 rounded-lg text-slate-300 hover:text-white text-sm">
                  Change
                </button>
              </div>
            </div>
          </div>


          <div className="lg:col-span-3">
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <h2 className="text-lg font-semibold text-slate-200 mb-6">Recent Activity</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-slate-300 text-sm">Date</th>
                      <th className="px-4 py-3 text-left text-slate-300 text-sm">Activity</th>
                      <th className="px-4 py-3 text-left text-slate-300 text-sm">IP Address</th>
                      <th className="px-4 py-3 text-left text-slate-300 text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {recentActivity.map((activity, index) => (
                      <tr key={index} className="hover:bg-slate-700/50">
                        <td className="px-4 py-3 text-slate-400 text-sm">{activity.date}</td>
                        <td className="px-4 py-3 text-slate-200 text-sm">{activity.action}</td>
                        <td className="px-4 py-3 text-slate-400 text-sm font-mono">{activity.ip}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded-full text-xs">
                            Completed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminProfile;