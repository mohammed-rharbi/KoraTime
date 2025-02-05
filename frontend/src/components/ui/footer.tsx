import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (

    <footer className="bg-gray-800/80 backdrop-blur-md mt-12 py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">&copy; 2025 KoraTime. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    
  )
}
