"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

interface HeaderProps {
  transparent?: boolean
}

export default function Header({ transparent = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className={`${transparent ? 'absolute top-0 left-0 right-0 z-50 bg-transparent' : 'bg-white shadow-sm border-b'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/">
              <h1 className={`text-2xl font-bold ${transparent ? 'text-white' : 'text-gray-900'}`}>
                Hepta
              </h1>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`${transparent ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-teal-500'} transition-colors`}
            >
              Home
            </Link>
            <Link 
              href="/tours" 
              className={`${transparent ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-teal-500'} transition-colors`}
            >
              Tours
            </Link>
            <Link 
              href="/about" 
              className={`${transparent ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-teal-500'} transition-colors`}
            >
              About
            </Link>
            <Link 
              href="/blog" 
              className={`${transparent ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-teal-500'} transition-colors`}
            >
              Blog
            </Link>
            <Link 
              href="/contact" 
              className={`${transparent ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-teal-500'} transition-colors`}
            >
              Contact
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className={`${transparent ? 'text-white border-white hover:bg-white hover:text-gray-900' : 'text-gray-700 hover:text-teal-500'}`}
              asChild
            >
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button className="bg-teal-500 hover:bg-teal-600 text-white" asChild>
              <Link href="/auth/register">Sign Up</Link>
            </Button>
            
            <div className="md:hidden ml-4">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${transparent ? 'text-white' : 'text-gray-700'}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden py-4 ${transparent ? 'bg-black/50 backdrop-blur-sm' : 'bg-white border-t'}`}>
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className={`${transparent ? 'text-white' : 'text-gray-700'} px-4 py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/tours" 
                className={`${transparent ? 'text-white' : 'text-gray-700'} px-4 py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                Tours
              </Link>
              <Link 
                href="/about" 
                className={`${transparent ? 'text-white' : 'text-gray-700'} px-4 py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/blog" 
                className={`${transparent ? 'text-white' : 'text-gray-700'} px-4 py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/contact" 
                className={`${transparent ? 'text-white' : 'text-gray-700'} px-4 py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
