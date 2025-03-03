import React from 'react'


export default function QuickAction() {
  return (

        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="space-y-4">
              <button className="w-full text-left p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors flex items-center gap-3">
                <span>🏟️</span>
                Manage Fields
              </button>
              <button className="w-full text-left p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors flex items-center gap-3">
                <span>👔</span>
                Manage Managers
              </button>
              <button className="w-full text-left p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors flex items-center gap-3">
                <span>👥</span>
                View Teams
              </button>
              <button className="w-full text-left p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors flex items-center gap-3">
                <span>📋</span>
                Manage Players
              </button>
            </div>
        </div>
  )
}
