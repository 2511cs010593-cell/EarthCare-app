import React, { useContext, useState, useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const AdminRoute = () => {
  const { isAuthenticated, user, loading } = useContext(AuthContext)
  const [passwordVerified, setPasswordVerified] = useState(false)
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false)
  const [password, setPassword] = useState('')
  const location = useLocation()
  
  useEffect(() => {
    // Check if user has admin role and verify password
    if (isAuthenticated && user?.roles?.includes('ROLE_ADMIN')) {
      // Check if password was already verified in this session
      const verified = sessionStorage.getItem('adminPasswordVerified')
      if (verified === 'true') {
        setPasswordVerified(true)
      } else {
        setShowPasswordPrompt(true)
      }
    }
  }, [isAuthenticated, user, location])
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-spin">🌍</div>
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    )
  }
  
  const isAdmin = isAuthenticated && user?.roles?.includes('ROLE_ADMIN')
  
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />
  }
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (password === '1234567890') {
      setPasswordVerified(true)
      setShowPasswordPrompt(false)
      sessionStorage.setItem('adminPasswordVerified', 'true')
      setPassword('')
    } else {
      alert('❌ Incorrect admin password!')
      setPassword('')
    }
  }
  
  if (showPasswordPrompt && !passwordVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h2>
            <p className="text-gray-600">Enter admin password to continue</p>
          </div>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg"
              autoFocus
            />
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => window.location.href = '/dashboard'}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-semibold transition-all"
              >
                Verify
              </button>
            </div>
          </form>
          
          <p className="mt-4 text-xs text-center text-gray-500">
            Contact system administrator if you forgot the password
          </p>
        </div>
      </div>
    )
  }
  
  return passwordVerified ? <Outlet /> : null
}

export default AdminRoute