'use client'
import React from 'react'
import Link from 'next/link'

export default function SideBar() {
  return (
    <aside className="w-64 bg-gray-900/50 border-r border-green-500/70 p-6 fixed h-[calc(100vh-4rem)]">
      <nav className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-400 mb-4">Management</h3>

        <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50  transition-colors">
          <span>📊</span>
          Dashboard
        </Link>
        <Link href="/dashboard/fields" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
          <span>🏟️</span>
          Fields
        </Link>
        <Link href="/dashboard/fields/fieldManagers" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
          <span>👔</span>
          Field Managers
        </Link>
        <Link href="/dashboard/fields/reservations" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
          <span>📅</span>
          Reservations
        </Link>
        <Link href="/dashboard/teams" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
          <span>👥</span>
          Teams
        </Link>
        <Link href="/dashboard/players" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
          <span>🥅</span>
          Players
        </Link>

        <div className="border-t border-green-700 my-6 pt-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-4">Quick Access</h3>
          <Link href="/dashboard/reports" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
            <span>📈</span>
            Reports
          </Link>
          
          <Link href="/dashboard/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
            <span>⚙️</span>
            System Settings
          </Link>
        </div>
      </nav>
    </aside>
  )
}