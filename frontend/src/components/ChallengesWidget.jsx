import React, { useState, useEffect } from 'react'
import { Trophy, Zap, TrendingUp } from 'lucide-react'

const ChallengesWidget = () => {
  const [challenges, setChallenges] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL')

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        // Mock data - challenges would come from backend
        const mockChallenges = [
          { id: 1, title: 'No Plastic Day', difficulty: 'EASY', points: 20, category: 'WASTE' },
          { id: 2, title: 'Save 100L Water', difficulty: 'MEDIUM', points: 75, category: 'WATER' },
          { id: 3, title: 'Plant 5 Trees', difficulty: 'MEDIUM', points: 100, category: 'PLANTATION' },
          { id: 4, title: 'Carbon Neutral Week', difficulty: 'HARD', points: 250, category: 'TRANSPORT' },
          { id: 5, title: 'Zero Waste Month', difficulty: 'HARD', points: 500, category: 'WASTE' },
        ]
        setChallenges(mockChallenges)
      } catch (err) {
        console.error('Error fetching challenges:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchChallenges()
  }, [])

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'EASY':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'HARD':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPointsColor = (points) => {
    if (points >= 200) return 'text-red-600 dark:text-red-400'
    if (points >= 100) return 'text-orange-600 dark:text-orange-400'
    return 'text-emerald-600 dark:text-emerald-400'
  }

  const filteredChallenges = selectedDifficulty === 'ALL' 
    ? challenges 
    : challenges.filter(c => c.difficulty === selectedDifficulty)

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Trophy className="w-6 h-6 text-amber-500" />
          Daily Challenges
        </h3>
      </div>

      {/* Difficulty Filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {['ALL', 'EASY', 'MEDIUM', 'HARD'].map(diff => (
          <button
            key={diff}
            onClick={() => setSelectedDifficulty(diff)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedDifficulty === diff
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {diff}
          </button>
        ))}
      </div>

      {/* Challenges List */}
      <div className="space-y-3">
        {filteredChallenges.map(challenge => (
          <div
            key={challenge.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:scale-102 transform"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white">
                    {challenge.title}
                  </h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Category: <span className="font-semibold">{challenge.category}</span>
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className={`flex items-center gap-1 text-lg font-bold ${getPointsColor(challenge.points)}`}>
                  <TrendingUp className="w-5 h-5" />
                  +{challenge.points}
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95 text-sm">
                  Join
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredChallenges.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">No challenges found for this difficulty level</p>
        </div>
      )}
    </div>
  )
}

export default ChallengesWidget
