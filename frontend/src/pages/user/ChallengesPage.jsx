import React, { useState } from 'react'

const ChallengesPage = () => {
  const [challenges] = useState([
    { id: 1, title: "Zero Waste Week", description: "Go one week without producing waste", points: 500, duration: "7 days", participants: 234, difficulty: "Medium", icon: "🗑️", active: true },
    { id: 2, title: "Plant 10 Trees", description: "Contribute to reforestation by planting trees", points: 1000, duration: "30 days", participants: 567, difficulty: "Hard", icon: "🌳", active: true },
    { id: 3, title: "Plastic-Free Shopping", description: "Shop without using any plastic for one month", points: 750, duration: "30 days", participants: 189, difficulty: "Medium", icon: "🛍️", active: true },
    { id: 4, title: "Daily Walk Challenge", description: "Walk at least 30 minutes every day", points: 300, duration: "14 days", participants: 891, difficulty: "Easy", icon: "🚶", active: true },
    { id: 5, title: "Composting Master", description: "Start and maintain a compost bin", points: 600, duration: "30 days", participants: 156, difficulty: "Medium", icon: "♻️", active: true },
    { id: 6, title: "Save Water Challenge", description: "Reduce water usage by 30%", points: 450, duration: "21 days", participants: 423, difficulty: "Medium", icon: "💧", active: true },
    { id: 7, title: "Solar Energy Switch", description: "Install solar panels or use solar devices", points: 2000, duration: "60 days", participants: 89, difficulty: "Hard", icon: "☀️", active: true },
    { id: 8, title: "Bike to Work", description: "Cycle to work for an entire month", points: 800, duration: "30 days", participants: 312, difficulty: "Medium", icon: "🚴", active: true },
    { id: 9, title: "Meat-Free Month", description: "Go vegetarian for 30 days", points: 650, duration: "30 days", participants: 245, difficulty: "Medium", icon: "🥗", active: true },
    { id: 10, title: "Eco Home Makeover", description: "Make your home more eco-friendly", points: 1500, duration: "90 days", participants: 67, difficulty: "Hard", icon: "🏡", active: true }
  ])

  const handleJoinChallenge = (challengeId) => {
    const challenge = challenges.find(c => c.id === challengeId)
    alert(`🎉 You joined "${challenge.title}"! Complete it to earn ${challenge.points} points!`)
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">🎯 Eco Challenges</h1>
          <p className="text-xl text-gray-600">Join environmental challenges and compete with others</p>
        </div>

        {/* Stats Bar */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-2 border-green-200">
            <div className="text-4xl mb-2">🏆</div>
            <div className="text-3xl font-bold text-green-600">{challenges.length}</div>
            <div className="text-gray-600">Active Challenges</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-2 border-blue-200">
            <div className="text-4xl mb-2">👥</div>
            <div className="text-3xl font-bold text-blue-600">{challenges.reduce((sum, c) => sum + c.participants, 0).toLocaleString()}</div>
            <div className="text-gray-600">Total Participants</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-2 border-purple-200">
            <div className="text-4xl mb-2">⭐</div>
            <div className="text-3xl font-bold text-purple-600">{challenges.reduce((sum, c) => sum + c.points, 0).toLocaleString()}</div>
            <div className="text-gray-600">Total Points Available</div>
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map(challenge => (
            <div key={challenge.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200 hover:border-green-400 transition-all transform hover:scale-105">
              <div className="h-2 bg-gradient-to-r from-green-500 to-blue-500"></div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-5xl">{challenge.icon}</div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{challenge.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Reward:</span>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {challenge.points} pts
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Duration:</span>
                    <span className="text-sm font-semibold text-gray-900">{challenge.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Participants:</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {challenge.participants}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleJoinChallenge(challenge.id)}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                >
                  Join Challenge
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChallengesPage
