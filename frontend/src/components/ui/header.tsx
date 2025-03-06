'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import useAuthStore from '../../../store/authStore'
import { useRouter } from "next/navigation";

export default function Header() {


    const {logout , user , token , role} = useAuthStore()

  const router = useRouter();

    const handleLogout = ()=>{


        try {

          logout();
          router.push('/auth/login')
          
        } catch (error) {

            console.log(error);
            
        }
    }

  return (
      <header className="bg-gray-800/80 backdrop-blur-md sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href={'/dashboard'}>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
            KoraTime
          </h1>
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/dashboard/profile" className="text-gray-300 hover:text-white transition-colors">
              Profile
            </Link>
            <button onClick={handleLogout} className="bg-gradient-to-r from-green-400 to-blue-400 text-white px-5 py-2 rounded-full hover:opacity-90 transition-opacity">
              Logout
            </button>
          </div>
        </div>
      </header>  )
}
