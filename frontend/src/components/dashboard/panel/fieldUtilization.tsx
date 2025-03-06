import React from 'react'

export default function FieldUtilization() {
  return (

    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
            <h3 className="text-xl font-bold mb-4">Field Utilization</h3>
            <div className="space-y-4">
            <div>
                <div className="flex justify-between mb-1">
                <span>Field 1 (Main)</span>
                <span>82%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                <div className="h-2 bg-purple-500 rounded-full w-4/5"></div>
                </div>
            </div>
            <div>
                <div className="flex justify-between mb-1">
                <span>Field 2 (Training)</span>
                <span>65%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full w-3/5"></div>
                </div>
            </div>
            <div>
                <div className="flex justify-between mb-1">
                <span>Field 3 (VIP)</span>
                <span>45%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                <div className="h-2 bg-green-500 rounded-full w-2/5"></div>
                </div>
            </div>
            </div>
    </div>
    )
}
