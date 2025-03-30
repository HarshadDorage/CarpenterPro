import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-sm relative">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span className="ml-2 text-xl font-bold text-gray-800">CarpenterPro</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
          <Link href="/calculators" className="text-gray-600 hover:text-blue-600">Calculators</Link>
          <Link href="/design" className="text-gray-600 hover:text-blue-600">Design</Link>
          <Link href="/pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link>
          <Link href="/gallery" className="text-gray-600 hover:text-blue-600">Gallery</Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute w-full z-10 shadow-md">
          <nav className="flex flex-col space-y-4 px-4 py-4">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/calculators" 
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Calculators
            </Link>
            <Link 
              href="/design" 
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Design
            </Link>
            <Link 
              href="/pricing" 
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="/gallery" 
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
             Gallery
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}