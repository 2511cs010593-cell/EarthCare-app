import React, { useState, useEffect } from 'react'
import { TrendingUp, Leaf, Award, Target } from 'lucide-react'

const LiveTrackerWidget = () => {
  const [stats, setStats] = useState({
    totalPoints: 0,
    greenCoins: 0,
    treesPlanted: 0,
    tasksCompleted: 0,
    level: 1,
    streak: 0,
  })

  useEffect(() => {
    // Mock stats - would come from authenticated user context
    setStats({
      totalPoints: 2450,
      greenCoins: 1225,
      treesPlanted: 42,
      tasksCompleted: 156,
      level: 5,
      streak: 12,
    })
  }, [])

  const progressPercentage = (stats.totalPoints % 1000) / 10

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Total Points Card */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl p-6 border border-emerald-200 dark:border-emerald-700">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-gray-900 dark:text-white">Total Points</h4>
          <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
          {stats.totalPoints.toLocaleString()}
        </p>
        <div className="w-full bg-emerald-200 dark:bg-emerald-800 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-2">
          {stats.totalPoints % 1000} / 1000 to next milestone
        </p>
      </div>

      {/* Green Coins Card */}
      <div className="bg-gradient-to-br from-green-50 to-lime-50 dark:from-green-900/30 dark:to-lime-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-gray-900 dark:text-white">Green Coins</h4>
          <Leaf className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <p className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
          {stats.greenCoins.toLocaleString()}
        </p>
        <p className="text-sm text-green-700 dark:text-green-300">
          💰 Use to redeem rewards
        </p>
      </div>

      {/* Level & Streak Card */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-gray-900 dark:text-white">Your Progress</h4>
          <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Level</p>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {stats.level}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Streak</p>
            <p className="text-3xl font-bold text-pink-600 dark:text-pink-400">
              {stats.streak}d 🔥
            </p>
          </div>
        </div>
      </div>

      {/* Trees Planted */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 rounded-xl p-6 border border-emerald-200 dark:border-emerald-700">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-gray-900 dark:text-white">Trees Planted</h4>
          <Leaf className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
          {stats.treesPlanted}
        </p>
        <p className="text-sm text-emerald-700 dark:text-emerald-300">
          🌳 Carbon offset: ~{stats.treesPlanted * 25} kg
        </p>
      </div>

      {/* Tasks Completed */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-gray-900 dark:text-white">Tasks Done</h4>
          <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          {stats.tasksCompleted}
        </p>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          ✅ Keep the streak alive!
        </p>
      </div>

      {/* Impact Summary */}
      <div className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
        <h4 className="font-bold text-gray-900 dark:text-white mb-4">Your Impact</h4>
        <div className="space-y-2 text-sm">
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Carbon Saved:</span> ~{Math.round(stats.tasksCompleted * 2.5)} kg
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Water Saved:</span> ~{stats.tasksCompleted * 50} L
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Plastic Collected:</span> ~{Math.round(stats.tasksCompleted * 0.5)} kg
          </p>
        </div>
      </div>
    </div>
  )
}

export default LiveTrackerWidget
