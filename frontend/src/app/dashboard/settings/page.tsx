'use client'

import React from "react";
import MainLayout from "@/components/mainLayout";
import { motion } from "framer-motion";
import { CogIcon, ShieldCheckIcon, KeyIcon, TrashIcon,PlusIcon ,  BellIcon, UsersIcon, GlobeAltIcon, ArrowPathIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import SettingsLayout from "@/components/dashboard/settings/settingsLayout";

const SystemSettings = () => {
  return (
    <MainLayout>
    <SettingsLayout>

        
      <div className="flex h-screen bg-slate-950">
     
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto mb-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-semibold text-slate-200">Platform Settings</h1>
                  <p className="text-slate-500 text-sm mt-1">Current environment: Production</p>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                  System Operational
                </div>
              </div>
            </motion.div>
          </div>


          <div className="max-w-5xl mx-auto space-y-8">

            <motion.div 
              className="bg-slate-900 rounded-xl p-6 border border-slate-800"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              <h3 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
                <CogIcon className="h-5 w-5 text-blue-500" />
                General Platform Settings
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-slate-300 mb-1">Maintenance Mode</h4>
                    <p className="text-slate-500 text-sm">
                      Enable to restrict access to administrators only
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only" />
                    <div className="w-11 h-6 bg-slate-800 rounded-full border border-slate-700"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-slate-300 mb-1">Data Retention Policy</h4>
                    <p className="text-slate-500 text-sm">
                      Automatically delete logs older than
                    </p>
                  </div>
                  <select className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-300 text-sm">
                    <option>30 days</option>
                    <option>60 days</option>
                    <option>90 days</option>
                  </select>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-slate-900 rounded-xl p-6 border border-slate-800"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
                <ShieldCheckIcon className="h-5 w-5 text-green-500" />
                Security Policies
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-slate-300 mb-1">Two-Factor Authentication</h4>
                    <p className="text-slate-500 text-sm">
                      Require 2FA for all administrator accounts
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only" checked />
                    <div className="w-11 h-6 bg-green-900 rounded-full border border-green-800">
                      <div className="dot absolute left-1 top-1 bg-green-500 w-4 h-4 rounded-full transition"></div>
                    </div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-slate-300 mb-1">Session Timeout</h4>
                    <p className="text-slate-500 text-sm">
                      Inactivity period before automatic logout
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input 
                      type="number" 
                      className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-300 text-sm w-24"
                      defaultValue="30" 
                    />
                    <span className="text-slate-500 text-sm">minutes</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-slate-900 rounded-xl p-6 border border-slate-800"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
                <KeyIcon className="h-5 w-5 text-amber-500" />
                API Key Management
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-slate-800 p-4 rounded-lg">
                  <div>
                    <div className="text-slate-300 text-sm font-mono mb-1">
                      sk_live_*******a3d9
                    </div>
                    <div className="text-slate-500 text-xs">
                      Created: 2023-08-15 • Read/Write Access
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="text-slate-500 hover:text-amber-500 text-sm">
                      <ArrowPathIcon className="h-4 w-4" />
                    </button>
                    <button className="text-slate-500 hover:text-red-500 text-sm">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-slate-700 rounded-lg text-slate-400 hover:text-slate-200 hover:border-slate-600 text-sm">
                  <PlusIcon className="h-4 w-4" />
                  Generate New API Key
                </button>
              </div>
            </motion.div>


            <motion.div 
              className="bg-slate-900 rounded-xl p-6 border border-slate-800"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
                <DocumentTextIcon className="h-5 w-5 text-purple-500" />
                Recent Audit Events
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-slate-400">Timestamp</th>
                      <th className="px-4 py-3 text-left text-slate-400">User</th>
                      <th className="px-4 py-3 text-left text-slate-400">Event</th>
                      <th className="px-4 py-3 text-left text-slate-400">IP Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {[...Array(3)].map((_, i) => (
                      <tr key={i} className="hover:bg-slate-800/50">
                        <td className="px-4 py-3 text-slate-400">2023-08-20 14:3{i}2</td>
                        <td className="px-4 py-3 text-slate-300">admin@platform.com</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded-full text-xs">
                            Settings Modified
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-400 font-mono">192.168.1.{i}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          <div className="max-w-5xl mx-auto mt-8 border-t border-slate-800 pt-6 flex justify-end gap-4">
        <button className="px-6 py-2 text-slate-300 hover:text-white rounded-lg border border-slate-700 hover:border-slate-600">
              Cancel
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </SettingsLayout>
    </MainLayout>

  );
};

export default SystemSettings;