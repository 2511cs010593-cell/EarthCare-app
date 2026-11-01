import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const DashboardPage = () => {
  const { user } = useContext(AuthContext)
  
  // Get user stats or default to 0
  const totalPoints = user?.totalPoints || 0
  const tasksCompleted = user?.tasksCompleted || 0
  const treesPlanted = user?.treesPlanted || 0
  const wasteReports = user?.wasteReports || 0
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">🌍 Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-bold text-green-600">{totalPoints.toLocaleString()}</div>
            <div className="text-gray-600">Total Points</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-2xl font-bold text-blue-600">{tasksCompleted}</div>
            <div className="text-gray-600">Tasks Completed</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl mb-2">🌳</div>
            <div className="text-2xl font-bold text-green-600">{treesPlanted}</div>
            <div className="text-gray-600">Trees Planted</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl mb-2">♻️</div>
            <div className="text-2xl font-bold text-yellow-600">{wasteReports}</div>
            <div className="text-gray-600">Waste Reports</div>
          </div>
        </div>

        {/* Welcome Message for New Users */}
        {totalPoints === 0 && (
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg shadow p-6 mb-8 border-2 border-green-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">🎉 Welcome to EarthCare!</h2>
            <p className="text-gray-700 mb-4">
              Start your eco-friendly journey by completing tasks, planting trees, and earning rewards!
            </p>
            <div className="flex gap-4">
              <a href="/tasks" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-all">
                Browse Tasks
              </a>
              <a href="/challenges" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all">
                Join Challenges
              </a>
            </div>
          </div>
        )}

        {/* Participating Challenges */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">🎯 Participating Challenges</h2>
          {totalPoints > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                <span className="text-2xl">🗑️</span>
                <div className="flex-1">
                  <div className="font-medium">Zero Waste Week</div>
                  <div className="text-sm text-gray-600">Day 3 of 7 • 500 points reward</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Progress</div>
                  <div className="text-lg font-bold text-blue-600">43%</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded border-l-4 border-green-500">
                <span className="text-2xl">🚶</span>
                <div className="flex-1">
                  <div className="font-medium">Daily Walk Challenge</div>
                  <div className="text-sm text-gray-600">Day 8 of 14 • 300 points reward</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Progress</div>
                  <div className="text-lg font-bold text-green-600">57%</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded border-l-4 border-yellow-500">
                <span className="text-2xl">🌱</span>
                <div className="flex-1">
                  <div className="font-medium">Plant 10 Trees</div>
                  <div className="text-sm text-gray-600">Day 5 of 30 • 1000 points reward</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Progress</div>
                  <div className="text-lg font-bold text-yellow-600">17%</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-lg mb-4">No challenges joined yet!</p>
              <p className="text-sm text-gray-600 mb-6">Join eco-challenges to track your progress here</p>
              <a href="/challenges" className="inline-block bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105">
                Browse Challenges
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage