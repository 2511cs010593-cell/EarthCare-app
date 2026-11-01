import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const PleaseLoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Show alert
    alert('⚠️ Please login to access this page!')
    
    // Redirect to login after 1 second
    const timer = setTimeout(() => {
      navigate('/login', { state: { from: location.pathname } })
    }, 1000)

    return () => clearTimeout(timer)
  }, [navigate, location])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="text-8xl mb-6">🔒</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-600 mb-6">
          You need to login to access this page.
        </p>
        <div className="text-sm text-gray-500 mb-6">
          Redirecting to login page...
        </div>
        <button
          onClick={() => navigate('/login')}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
        >
          Go to Login Now
        </button>
      </div>
    </div>
  )
}

export default PleaseLoginPage
