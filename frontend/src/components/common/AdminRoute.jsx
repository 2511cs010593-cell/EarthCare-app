import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const AdminRoute = () => {
  const { isAuthenticated, user, loading } = useContext(AuthContext)
  
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
  
  return isAdmin ? <Outlet /> : <Navigate to="/dashboard" replace />
}

export default AdminRoute