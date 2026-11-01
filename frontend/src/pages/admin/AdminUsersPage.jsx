import React, { useState } from 'react'

const AdminUsersPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Sarah Green", email: "sarah@email.com", points: 1250, level: 5, status: "Active", joined: "2024-01-15", role: "User" },
    { id: 2, name: "Mike Eco", email: "mike@email.com", points: 2340, level: 7, status: "Active", joined: "2024-02-20", role: "User" },
    { id: 3, name: "Emma Nature", email: "emma@email.com", points: 890, level: 3, status: "Active", joined: "2024-03-10", role: "User" },
    { id: 4, name: "John Forest", email: "john@email.com", points: 1678, level: 6, status: "Inactive", joined: "2024-01-25", role: "User" },
    { id: 5, name: "Lisa Earth", email: "lisa@email.com", points: 3250, level: 9, status: "Active", joined: "2023-12-05", role: "User" },
    { id: 6, name: "Tom Green", email: "tom@email.com", points: 567, level: 2, status: "Active", joined: "2024-04-01", role: "User" },
    { id: 7, name: "Admin User", email: "admin@earthcare.com", points: 9999, level: 15, status: "Active", joined: "2023-11-01", role: "Admin" }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'All' || user.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId))
      alert('User deleted successfully!')
    }
  }

  const handleToggleStatus = (userId) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? {...u, status: u.status === 'Active' ? 'Inactive' : 'Active'} 
        : u
    ))
  }

  const handleMakeAdmin = (userId) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? {...u, role: u.role === 'Admin' ? 'User' : 'Admin'} 
        : u
    ))
    alert('User role updated!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-3xl">👥</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">User Management</h1>
              <p className="text-lg text-gray-600">Control all user accounts and permissions</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-green-200">
              <p className="text-sm text-gray-600 mb-1">Total Users</p>
              <p className="text-3xl font-bold text-green-600">{users.length}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Active Users</p>
              <p className="text-3xl font-bold text-blue-600">{users.filter(u => u.status === 'Active').length}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Admin Users</p>
              <p className="text-3xl font-bold text-purple-600">{users.filter(u => u.role === 'Admin').length}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-yellow-200">
              <p className="text-sm text-gray-600 mb-1">Total Points</p>
              <p className="text-3xl font-bold text-yellow-600">{users.reduce((sum, u) => sum + u.points, 0).toLocaleString()}</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="🔍 Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-6 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105">
                + Add User
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-blue-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">ID</th>
                  <th className="px-6 py-4 text-left font-bold">Name</th>
                  <th className="px-6 py-4 text-left font-bold">Email</th>
                  <th className="px-6 py-4 text-left font-bold">Points</th>
                  <th className="px-6 py-4 text-left font-bold">Level</th>
                  <th className="px-6 py-4 text-left font-bold">Role</th>
                  <th className="px-6 py-4 text-left font-bold">Status</th>
                  <th className="px-6 py-4 text-left font-bold">Joined</th>
                  <th className="px-6 py-4 text-center font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <tr key={user.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                    <td className="px-6 py-4 font-semibold text-gray-700">#{user.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {user.points} pts
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Level {user.level}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        user.role === 'Admin' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        user.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{user.joined}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold transition-all"
                          title={user.status === 'Active' ? 'Deactivate' : 'Activate'}
                        >
                          {user.status === 'Active' ? '🔒' : '✓'}
                        </button>
                        <button
                          onClick={() => handleMakeAdmin(user.id)}
                          className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg text-sm font-semibold transition-all"
                          title={user.role === 'Admin' ? 'Remove Admin' : 'Make Admin'}
                        >
                          👑
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-semibold transition-all"
                          title="Delete User"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Info */}
        <div className="mt-4 text-center text-gray-600">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>
    </div>
  )
}

export default AdminUsersPage
