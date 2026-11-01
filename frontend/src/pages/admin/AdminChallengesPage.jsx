import React, { useState } from 'react'

const AdminChallengesPage = () => {
  const [challenges, setChallenges] = useState([
    { id: 1, title: "Zero Waste Week", description: "Go one week without producing waste", points: 500, duration: "7 days", participants: 234, status: "Active", difficulty: "Medium" },
    { id: 2, title: "Plant 10 Trees", description: "Contribute to reforestation by planting trees", points: 1000, duration: "30 days", participants: 567, status: "Active", difficulty: "Hard" },
    { id: 3, title: "Plastic-Free Shopping", description: "Shop without using any plastic for one month", points: 750, duration: "30 days", participants: 189, status: "Active", difficulty: "Medium" },
    { id: 4, title: "Daily Walk Challenge", description: "Walk at least 30 minutes every day", points: 300, duration: "14 days", participants: 891, status: "Active", difficulty: "Easy" },
    { id: 5, title: "Composting Master", description: "Start and maintain a compost bin", points: 600, duration: "30 days", participants: 156, status: "Active", difficulty: "Medium" },
    { id: 6, title: "Clean Rivers Initiative", description: "Participate in river cleanup events", points: 800, duration: "7 days", participants: 423, status: "Inactive", difficulty: "Medium" }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'All' || challenge.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleDeleteChallenge = (challengeId) => {
    if (window.confirm('Are you sure you want to delete this challenge?')) {
      setChallenges(challenges.filter(c => c.id !== challengeId))
      alert('Challenge deleted successfully!')
    }
  }

  const handleToggleStatus = (challengeId) => {
    setChallenges(challenges.map(c => 
      c.id === challengeId 
        ? {...c, status: c.status === 'Active' ? 'Inactive' : 'Active'} 
        : c
    ))
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-3xl">🏆</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Challenge Management</h1>
              <p className="text-lg text-gray-600">Create and manage environmental challenges</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-yellow-200">
              <p className="text-sm text-gray-600 mb-1">Total Challenges</p>
              <p className="text-3xl font-bold text-yellow-600">{challenges.length}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-green-200">
              <p className="text-sm text-gray-600 mb-1">Active Challenges</p>
              <p className="text-3xl font-bold text-green-600">{challenges.filter(c => c.status === 'Active').length}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Total Participants</p>
              <p className="text-3xl font-bold text-blue-600">{challenges.reduce((sum, c) => sum + c.participants, 0).toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Total Points</p>
              <p className="text-3xl font-bold text-purple-600">{challenges.reduce((sum, c) => sum + c.points, 0).toLocaleString()}</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="🔍 Search challenges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-500 focus:outline-none"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-6 py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-500 focus:outline-none bg-white"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105">
                + Add Challenge
              </button>
            </div>
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map(challenge => (
            <div key={challenge.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200 hover:border-yellow-400 transition-all transform hover:scale-105">
              <div className={`h-2 ${challenge.status === 'Active' ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gray-400'}`}></div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{challenge.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    challenge.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {challenge.status}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Points Reward:</span>
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
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Difficulty:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleToggleStatus(challenge.id)}
                    className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                      challenge.status === 'Active'
                        ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {challenge.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all">
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteChallenge(challenge.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Results Info */}
        <div className="mt-6 text-center text-gray-600">
          Showing {filteredChallenges.length} of {challenges.length} challenges
        </div>
      </div>
    </div>
  )
}

export default AdminChallengesPage
