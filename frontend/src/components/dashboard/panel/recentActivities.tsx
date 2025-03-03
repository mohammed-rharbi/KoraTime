import React from 'react'



export default function RecentActivities() {

  return (

        <div className="lg:col-span-2 bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
            <h3 className="text-xl font-bold mb-4">Recent Activities</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-700/30">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <span className="text-green-500">✅</span>
                </div>
                <div>
                  <p className="font-medium">New reservation created</p>
                  <p className="text-sm text-gray-400">Field 2 - 15:00 Tomorrow</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-700/30">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <span className="text-blue-500">👤</span>
                </div>
                <div>
                  <p className="font-medium">New field manager added</p>
                  <p className="text-sm text-gray-400">John Doe assigned to Field 3</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-700/30">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <span className="text-red-500">⚠️</span>
                </div>
                <div>
                  <p className="font-medium">Payment issue detected</p>
                  <p className="text-sm text-gray-400">Reservation #4582</p>
                </div>
              </div>
            </div>
        </div>
)
}
