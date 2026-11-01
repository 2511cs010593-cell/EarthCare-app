import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useContext(AuthContext)
  
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
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/please-login" replace />
}

export default ProtectedRoute