import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ChallengesPage = () => {
  const navigate = useNavigate()
  const [selectedChallenge, setSelectedChallenge] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '' })

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

  const handleJoinChallenge = (challenge) => {
    setSelectedChallenge(challenge)
    setShowForm(true)
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    setShowForm(false)
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setFormData({ fullName: '', email: '', phone: '' })
    }, 3000)
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
                  onClick={() => handleJoinChallenge(challenge)}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                >
                  Join Challenge
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Form Modal */}
      {showForm && selectedChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold">Join Challenge</h2>
              <p className="text-sm opacity-90 mt-1">{selectedChallenge.title}</p>
            </div>
            <form onSubmit={handleSubmitForm} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && selectedChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Successfully Registered!</h2>
            <p className="text-gray-600 mb-4">
              You have successfully registered for <span className="font-semibold text-green-600">{selectedChallenge.title}</span>
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Challenge Participation</span><br />
                Complete the challenge to earn {selectedChallenge.points} points!
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSuccess(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => navigate(`/challenge/${selectedChallenge.id}`)}
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                View Challenge
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChallengesPage
