import React from 'react'
import { CheckCircleIcon,StarIcon} from "@heroicons/react/24/outline";


export default function FieldRulsCard() {
  return (


        <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6 mb-5">

              <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-lg font-semibold">Validation Rules</h3>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    All required fields (*) must be filled
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    Price must be numeric
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    Minimum 1 image required
                  </li>
                </ul>
              </div>
            </div>


            <div className="rounded-xl border bg-white  p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-lg font-semibold">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Fields Created</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Active Bookings</span>
                    <span className="font-medium">86</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Average Rating</span>
                    <span className="flex items-center gap-1">
                      <StarIcon className="h-4 w-4 text-amber-400" />
                      4.8
                    </span>
                  </div>
                </div>
              </div>
        </div>
        
    
    )
}
