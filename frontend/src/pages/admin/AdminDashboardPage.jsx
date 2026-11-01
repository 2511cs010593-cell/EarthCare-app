import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const AdminDashboardPage = () => {
  const [stats] = useState({
    totalUsers: 50847,
    activeUsers: 42156,
    totalRewards: 15432,
    totalChallenges: 89,
    totalEvents: 124,
    treesPlanted: 98521,
    co2Reduced: 245678,
    totalPoints: 8945621
  })

  const [recentUsers] = useState([
    { id: 1, name: "Sarah Green", email: "sarah@email.com", points: 1250, level: 5, status: "Active" },
    { id: 2, name: "Mike Eco", email: "mike@email.com", points: 2340, level: 7, status: "Active" },
    { id: 3, name: "Emma Nature", email: "emma@email.com", points: 890, level: 3, status: "Active" },
    { id: 4, name: "John Forest", email: "john@email.com", points: 1678, level: 6, status: "Inactive" }
  ])

  const [recentActivity] = useState([
    { id: 1, user: "Sarah Green", action: "Completed challenge 'Zero Waste Week'", time: "10 min ago" },
    { id: 2, user: "Mike Eco", action: "Planted 5 trees", time: "25 min ago" },
    { id: 3, user: "Emma Nature", action: "Redeemed reward 'Eco Shopping Bag'", time: "1 hour ago" },
    { id: 4, user: "Admin", action: "Created new challenge 'Clean Rivers'", time: "2 hours ago" }
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-3xl">👨‍💼</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-lg text-gray-600">Complete control over EarthCare platform</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all">
            <div className="flex justify-between items-start mb-2">
              <span className="text-3xl">👥</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">+12%</span>
            </div>
            <p className="text-sm opacity-90 mb-1">Total Users</p>
            <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all">
            <div className="flex justify-between items-start mb-2">
              <span className="text-3xl">🎁</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">+8%</span>
            </div>
            <p className="text-sm opacity-90 mb-1">Total Rewards</p>
            <p className="text-3xl font-bold">{stats.totalRewards.toLocaleString()}</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all">
            <div className="flex justify-between items-start mb-2">
              <span className="text-3xl">🏆</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">+15%</span>
            </div>
            <p className="text-sm opacity-90 mb-1">Active Challenges</p>
            <p className="text-3xl font-bold">{stats.totalChallenges}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all">
            <div className="flex justify-between items-start mb-2">
              <span className="text-3xl">🌳</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">+24%</span>
            </div>
            <p className="text-sm opacity-90 mb-1">Trees Planted</p>
            <p className="text-3xl font-bold">{stats.treesPlanted.toLocaleString()}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">⚡ Quick Actions</h2>
          <div className="grid md:grid-cols-5 gap-4">
            <Link to="/admin/users" className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-xl text-center transform hover:scale-105 transition-all shadow-lg">
              <div className="text-3xl mb-2">👥</div>
              <p className="font-semibold">Manage Users</p>
            </Link>
            
            <Link to="/admin/rewards" className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-xl text-center transform hover:scale-105 transition-all shadow-lg">
              <div className="text-3xl mb-2">🎁</div>
              <p className="font-semibold">Manage Rewards</p>
            </Link>
            
            <Link to="/admin/challenges" className="bg-gradient-to-br from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white p-4 rounded-xl text-center transform hover:scale-105 transition-all shadow-lg">
              <div className="text-3xl mb-2">🏆</div>
              <p className="font-semibold">Manage Challenges</p>
            </Link>
            
            <Link to="/admin/events" className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-4 rounded-xl text-center transform hover:scale-105 transition-all shadow-lg">
              <div className="text-3xl mb-2">📅</div>
              <p className="font-semibold">Manage Events</p>
            </Link>
            
            <Link to="/admin/news" className="bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white p-4 rounded-xl text-center transform hover:scale-105 transition-all shadow-lg">
              <div className="text-3xl mb-2">📰</div>
              <p className="font-semibold">Manage News</p>
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">📋 Recent Users</h2>
              <Link to="/admin/users" className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {recentUsers.map(user => (
                <div key={user.id} className="bg-gradient-to-r from-gray-50 to-green-50 p-4 rounded-xl border border-gray-200 hover:border-green-300 transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <div className="flex gap-3 mt-2 text-xs">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                          Level {user.level}
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                          {user.points} pts
                        </span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">⚡ Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map(activity => (
                <div key={activity.id} className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {activity.user.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">
                        <span className="font-bold">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Environmental Impact Stats */}
        <div className="mt-6 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">🌍 Platform Environmental Impact</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-4xl mb-2">🌳</p>
              <p className="text-3xl font-bold mb-1">{stats.treesPlanted.toLocaleString()}</p>
              <p className="text-sm opacity-90">Trees Planted</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-4xl mb-2">💨</p>
              <p className="text-3xl font-bold mb-1">{stats.co2Reduced.toLocaleString()}</p>
              <p className="text-sm opacity-90">kg CO₂ Reduced</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-4xl mb-2">⭐</p>
              <p className="text-3xl font-bold mb-1">{(stats.totalPoints / 1000).toFixed(1)}M</p>
              <p className="text-sm opacity-90">Total Points Earned</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-4xl mb-2">📅</p>
              <p className="text-3xl font-bold mb-1">{stats.totalEvents}</p>
              <p className="text-sm opacity-90">Events Organized</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
