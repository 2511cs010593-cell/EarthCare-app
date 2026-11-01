import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const RewardsPage = () => {
  const { user } = useContext(AuthContext)
  
  // Get user stats from context or default to 0
  const [userStats, setUserStats] = useState({ 
    points: user?.totalPoints || 0, 
    coins: user?.greenCoins || 0, 
    level: user?.level || 1, 
    streak: user?.streak || 0 
  })
  
  const badges = [
    { name: "Bronze", tier: "BRONZE", earned: false, icon: "🥉" },
    { name: "Silver", tier: "SILVER", earned: false, icon: "🥈" },
    { name: "Gold", tier: "GOLD", earned: false, icon: "🥇" },
    { name: "Platinum", tier: "PLATINUM", earned: false, icon: "💎" },
    { name: "Earth Hero", tier: "EARTH_HERO", earned: false, icon: "🌍" }
  ]

  const rewards = [
    { id: 1, name: "Eco Tote Bag", cost: 200, image: "🛍️" },
    { id: 2, name: "Bamboo Water Bottle", cost: 150, image: "🎋" },
    { id: 3, name: "Solar Power Bank", cost: 500, image: "🔋" },
    { id: 4, name: "Organic Seeds Pack", cost: 100, image: "🌱" }
  ]

  const handleRedeemReward = (rewardId, cost) => {
    if (userStats.coins >= cost) {
      setUserStats(prev => ({ ...prev, coins: prev.coins - cost }))
      const reward = rewards.find(r => r.id === rewardId)
      alert(`🎉 Successfully redeemed ${reward.name}! You spent ${cost} coins.`)
    } else {
      alert(`❌ Not enough coins! You need ${cost} coins but only have ${userStats.coins}.`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">🏆 Rewards & Badges</h1>
        
        {/* User Stats */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Your Stats</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg transform hover:scale-105 transition-all">
              <div className="text-3xl text-green-600 font-bold animate-pulse-slow">{userStats.points}</div>
              <div className="text-gray-600">Total Points</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg transform hover:scale-105 transition-all">
              <div className="text-3xl text-yellow-600 font-bold animate-bounce-slow">{userStats.coins}</div>
              <div className="text-gray-600">Green Coins</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg transform hover:scale-105 transition-all">
              <div className="text-3xl text-blue-600 font-bold">{userStats.level}</div>
              <div className="text-gray-600">Level</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg transform hover:scale-105 transition-all">
              <div className="text-3xl text-red-600 font-bold">{userStats.streak}</div>
              <div className="text-gray-600">Day Streak</div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Badges Collection</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {badges.map((badge, index) => (
              <div key={index} className={`text-center p-6 rounded-lg transition-all transform hover:scale-110 ${
                badge.earned 
                  ? 'bg-gradient-to-b from-green-100 to-green-50 shadow-lg' 
                  : 'bg-gray-100 opacity-50 grayscale'
              }`}>
                <div className="text-4xl mb-2">{badge.icon}</div>
                <div className="font-medium">{badge.name}</div>
                {badge.earned && <div className="text-xs text-green-600 mt-1">✓ Earned</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Rewards Store */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Rewards Store</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map(reward => (
              <div key={reward.id} className="border rounded-lg p-6 text-center transform hover:scale-105 transition-all shadow-lg">
                <div className="text-5xl mb-4 animate-bounce-slow">{reward.image}</div>
                <h3 className="font-medium mb-2">{reward.name}</h3>
                <div className="text-green-600 font-bold mb-4 text-lg">{reward.cost} coins</div>
                <button 
                  onClick={() => handleRedeemReward(reward.id, reward.cost)}
                  className={`w-full py-2 px-4 rounded-lg transition-all transform hover:scale-105 ${
                    userStats.coins >= reward.cost 
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {userStats.coins >= reward.cost ? 'Redeem Now' : 'Not Enough Coins'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RewardsPage