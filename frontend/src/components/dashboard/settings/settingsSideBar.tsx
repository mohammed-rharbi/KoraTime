import React from 'react'
import { CogIcon, ShieldCheckIcon, KeyIcon, BellIcon, UsersIcon, GlobeAltIcon, DocumentTextIcon } from "@heroicons/react/24/outline";


export default function SettingsSideBar() {
  return (

  <div className="w-64 border-r border-slate-800  p-4">
          <h2 className="text-sm font-semibold text-slate-400 mb-4">Platform Configuration</h2>
          <nav className="space-y-1">
            {[
              { icon: CogIcon, name: "General", current: true },
              { icon: ShieldCheckIcon, name: "Security" },
              { icon: UsersIcon, name: "User Roles" },
              { icon: KeyIcon, name: "API Keys" },
              { icon: CogIcon, name: "Database" },
              { icon: GlobeAltIcon, name: "Regional" },
              { icon: BellIcon, name: "Notifications" },
              { icon: DocumentTextIcon, name: "Audit Logs" },
            ].map((item) => (
              <a
                key={item.name}
                href="#"
                className={`flex items-center px-3 py-2 rounded-lg text-sm ${
                  item.current 
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
  )
}
