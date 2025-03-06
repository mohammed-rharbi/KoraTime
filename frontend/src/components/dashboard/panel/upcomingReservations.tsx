import React from 'react'

export default function UpcomingReservations() {

  return (
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
            <h3 className="text-xl font-bold mb-4">Upcoming Reservations</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <span>🕒</span>
                  <div>
                    <p>Field 3 - 19:00 Today</p>
                    <p className="text-sm text-gray-400">Team: Thunder FC</p>
                  </div>
                </div>
                <span className="text-blue-400">Confirmed</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <span>🕒</span>
                  <div>
                    <p>Field 1 - 20:30 Tomorrow</p>
                    <p className="text-sm text-gray-400">Team: Red Wolves</p>
                  </div>
                </div>
                <span className="text-yellow-400">Pending Payment</span>
              </div>
            </div>
        </div>
  )
}
