'use client'
import React from "react";
import MainLayout from "@/components/mainLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarIcon,
  ClockIcon,
  UserCircleIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  TableCellsIcon,
  ArrowPathIcon,
  PencilSquareIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

const ReservationsPage = () => {
  const reservations = [
    { 
      id: "#RES-2354",
      customer: "Michael Johnson",
      date: "2024-03-15",
      time: "18:30",
      partySize: 8,
      status: "confirmed",
      table: "T-12",
      duration: "2h",
      amount: "$320.00",
      specialRequests: "Birthday celebration"
    },
    { 
      id: "#RES-2355",
      customer: "Sarah Wilson",
      date: "2024-03-16",
      time: "19:00",
      partySize: 4,
      status: "pending",
      table: "T-05",
      duration: "1.5h",
      amount: "$180.00",
      specialRequests: "Vegetarian menu required"
    },
  ];

  return (
    <MainLayout>
      <div className="p-8 bg-gray-50 min-h-screen dark:bg-gray-900">
        {/* Header Section */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reservation Management</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage bookings, table assignments, and customer requests
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm hover:shadow-md dark:bg-gray-800">
              <ArrowPathIcon className="h-5 w-5" />
              Sync Calendar
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
              <CalendarIcon className="h-5 w-5" />
              New Reservation
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Bookings</p>
                <p className="text-2xl font-bold dark:text-white">42</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900/30">
                <TableCellsIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Confirmed</p>
                <p className="text-2xl font-bold dark:text-white">38</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900/30">
                <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold dark:text-white">4</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center dark:bg-yellow-900/30">
                <ClockIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>
          
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Revenue</p>
                <p className="text-2xl font-bold dark:text-white">$12,540</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center dark:bg-purple-900/30">
                <CurrencyDollarIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="rounded-xl bg-white shadow-sm overflow-hidden dark:bg-gray-800 mb-8">
          <div className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                placeholder="Search reservations..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex gap-3 flex-wrap">
              <select className="rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700">
                <option>All Statuses</option>
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>
              <input 
                type="date"
                className="rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700"
              />
              <button className="flex items-center gap-2 rounded-lg border bg-gray-50 px-4 py-2 hover:shadow-md dark:border-gray-700 dark:bg-gray-700">
                <FunnelIcon className="h-5 w-5" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Reservations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {reservations.map((reservation) => (
              <motion.div
                key={reservation.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold dark:text-white">{reservation.id}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {reservation.date} • {reservation.time}
                    </p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-sm ${
                    reservation.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500'
                  }`}>
                    {reservation.status}
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Customer Info */}
                  <div className="flex items-center gap-3">
                    <UserCircleIcon className="h-10 w-10 text-gray-400" />
                    <div>
                      <p className="font-medium dark:text-white">{reservation.customer}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Party of {reservation.partySize} • {reservation.duration}
                      </p>
                    </div>
                  </div>

                  {/* Reservation Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Table</p>
                      <p className="font-medium dark:text-white">{reservation.table}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
                      <p className="font-medium dark:text-white">{reservation.amount}</p>
                    </div>
                  </div>

                  {/* Special Requests */}
                  {reservation.specialRequests && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Special Requests</p>
                      <p className="text-sm dark:text-gray-300">{reservation.specialRequests}</p>
                    </div>
                  )}

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
                      <CheckCircleIcon className="h-5 w-5" />
                      Check In
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Calendar Section */}
        <div className="mt-8 rounded-xl bg-white shadow-sm dark:bg-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Calendar Overview</h2>
          {/* Add calendar component here */}
          <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500 dark:bg-gray-700 dark:text-gray-400">
            Calendar integration placeholder
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReservationsPage;