import React from "react";
import { motion } from "framer-motion";
import {
  PhotoIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const CreateFieldPage = () => {
  return (
   

        <div className="grid gap-8 lg:grid-cols-3">

          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 lg:col-span-2"
          >

            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-semibold">Field Preview</h2>
              <div className="h-48 rounded-lg bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-gray-700 dark:to-gray-600"></div>
            </div>


            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-6 text-xl font-semibold">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Field Name</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700"
                    placeholder="Enter field name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Description</label>
                  <textarea
                    rows={4}
                    className="w-full rounded-lg border bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700"
                    placeholder="Describe your field..."
                  />
                </div>
              </div>
            </div>


            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-6 text-xl font-semibold">Specifications</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/50">
                    <UserGroupIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <label className="mb-1 block text-sm font-medium">Field Size</label>
                    <select className="w-full rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700">
                      <option>5v5</option>
                      <option>7v7</option>
                      <option>11v11</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                    <CurrencyDollarIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <label className="mb-1 block text-sm font-medium">Hourly Rate ($)</label>
                    <input
                      type="number"
                      className="w-full rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700"
                      placeholder="00.00"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/50">
                    <ClockIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <label className="mb-1 block text-sm font-medium">Operating Hours</label>
                    <div className="flex gap-2">
                      <input
                        type="time"
                        className="w-full rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700"
                      />
                      <span className="self-center">to</span>
                      <input
                        type="time"
                        className="w-full rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/50">
                    <MapPinIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <label className="mb-1 block text-sm font-medium">Location</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700"
                      placeholder="Enter address"
                    />
                  </div>
                </div>
              </div>
            </div>


            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-6 text-xl font-semibold">Field Images</h2>
              <div className="flex flex-wrap gap-4">
                <label className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-indigo-500 hover:bg-indigo-50 dark:border-gray-600 dark:bg-gray-700">
                  <PhotoIcon className="h-8 w-8 text-gray-400" />
                  <input type="file" className="hidden" multiple />
                </label>
              </div>
            </div>


            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="flex-1 rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
              >
                Publish Field
              </motion.button>
              <button
                type="button"
                className="rounded-lg border px-6 py-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                Save Draft
              </button>
            </div>
          </motion.form>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">

              <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-lg font-semibold">Publication Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                    <span className="text-sm">Ready to publish</span>
                  </div>
                  <div className="flex items-center gap-3 opacity-50">
                    <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                    <span className="text-sm">Draft mode</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

  );
};

export default CreateFieldPage;