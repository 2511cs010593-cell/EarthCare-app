import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/login')
  }

  const handleRegister = () => {
    navigate('/register')
  }

  const handleLogout = () => {
    // Clear all storage completely
    localStorage.clear()
    sessionStorage.clear()
    logout()
    alert('👋 Logged out successfully! Storage cleared.')
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
            <span className="text-2xl animate-spin-slow">🌍</span>
            <span className="text-xl font-bold text-green-600">EarthCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Home
            </Link>
            <Link to="/tasks" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Tasks
            </Link>
            <Link to="/rewards" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Rewards
            </Link>
            <Link to="/challenges" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Challenges
            </Link>
            <Link to="/events" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Events
            </Link>
            <Link to="/news" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              News
            </Link>
            <Link to="/community" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Community
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Contact
            </Link>
            <Link to="/admin/dashboard" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
              Admin
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <button 
                  onClick={handleLogin}
                  className="text-green-600 hover:text-green-700 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-green-50"
                >
                  Login
                </button>
                <button 
                  onClick={handleRegister}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all transform hover:scale-105 shadow-lg font-medium"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="text-green-600 hover:text-green-700 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-green-50">
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded transition-colors">Home</Link>
              <Link to="/tasks" className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded transition-colors">Tasks</Link>
              <Link to="/rewards" className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded transition-colors">Rewards</Link>
              <Link to="/challenges" className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded transition-colors">Challenges</Link>
              <Link to="/events" className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded transition-colors">Events</Link>
              <Link to="/news" className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded transition-colors">News</Link>
              <Link to="/community" className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded transition-colors">Community</Link>
              <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded transition-colors">Contact</Link>
              <Link to="/admin/dashboard" className="block px-4 py-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">Admin</Link>
              <hr className="my-2" />
              {!isAuthenticated ? (
                <>
                  <button onClick={handleLogin} className="block w-full text-left px-4 py-2 text-green-600 hover:bg-green-50 rounded transition-colors">Login</button>
                  <button onClick={handleRegister} className="block w-full text-left px-4 py-2 text-green-600 hover:bg-green-50 rounded transition-colors">Register</button>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="block px-4 py-2 text-green-600 hover:bg-green-50 rounded transition-colors">Dashboard</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded transition-colors">Logout</button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar