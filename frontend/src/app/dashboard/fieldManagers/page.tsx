'use client'
import React, { useEffect } from "react";
import MainLayout from "@/components/mainLayout";
import { motion, AnimatePresence } from "framer-motion";
import { IdentificationIcon, ShieldCheckIcon, UserPlusIcon, PencilSquareIcon, LockClosedIcon, UserCircleIcon, EnvelopeIcon, ArrowPathIcon, TrashIcon, MagnifyingGlassIcon, PhoneIcon, } from "@heroicons/react/24/outline";
import Link from "next/link";
import useManagerStore from "../../../../store/managerStore";

const FieldManagerAdminPage = () => {


  const { fieldManagers , getManagers , banAUser } = useManagerStore()

  useEffect(()=>{

    getManagers()

  },[getManagers])


  const HandleBan = async (id: string, action: "ban" | "unban")=>{

    await banAUser(id , action );

  }

  return (
    <MainLayout>
      <div className="p-8 bg-gray-50 min-h-screen dark:bg-gray-900">

        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Field Manager Administration</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage field staff and their access permissions
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm hover:shadow-md dark:bg-gray-800">
              <IdentificationIcon className="h-5 w-5" />
              Export CSV
            </button>
            <Link href={'/dashboard/fieldManagers/createManager'} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
              <UserPlusIcon className="h-5 w-5" />
              Add New Manager
            </Link>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Managers</p>
                <p className="text-2xl font-bold dark:text-white">8</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900/30">
                <ShieldCheckIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pending Invites</p>
                <p className="text-2xl font-bold dark:text-white">2</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900/30">
                <EnvelopeIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">2FA Enabled</p>
                <p className="text-2xl font-bold dark:text-white">75%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center dark:bg-purple-900/30">
                <LockClosedIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>


        <div className="rounded-xl bg-white shadow-sm overflow-hidden dark:bg-gray-800">

          <div className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                placeholder="Search managers..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex gap-3">
              <select className="rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700">
                <option>All Statuses</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <select className="rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700">
                <option>Sort by</option>
                <option>Name</option>
                <option>Last Login</option>
                <option>Field</option>
              </select>
            </div>
          </div>


          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Manager</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Assigned Field</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Security</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <AnimatePresence>
                  {fieldManagers?.map((manager) => (
                    <motion.tr
                      key={manager._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <UserCircleIcon className="h-9 w-9 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{manager.userName}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">ID: {manager._id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{manager.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <PhoneIcon className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{manager.phoneNumber}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">{manager.email}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${
                          manager._id === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500'
                        }`}>
                          {manager.userName}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {manager.isActive ? (
                            <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                              <LockClosedIcon className="h-4 w-4" />
                              2FA Enabled
                            </span>
                          ) : (
                            <span className="text-sm text-gray-500">Basic Auth</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                            <PencilSquareIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                            <ArrowPathIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          </button>

                          <button
                          onClick={() => HandleBan(manager._id as string, manager.isBan ? "unban" : "ban")}
                          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                          <TrashIcon className={`h-5 w-5 ${manager.isBan ? "text-green-400" : "text-red-400"}`} />
                          </button>

                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {fieldManagers?.length} of {fieldManagers?.length} managers
            </div>
            <div className="flex gap-2">
              <button className="rounded-lg border px-4 py-2 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700">
                Previous
              </button>
              <button className="rounded-lg border px-4 py-2 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700">
                Next
              </button>
            </div>
          </div>
        </div>

      </div>
    </MainLayout>
  );
};

export default FieldManagerAdminPage;