import React, { useState } from 'react'

const AdminRewardsPage = () => {
  const [rewards, setRewards] = useState([
    { id: 1, name: "Eco Shopping Bag", points: 100, category: "Physical", stock: 50, redeemed: 245, status: "Active", image: "🛍️" },
    { id: 2, name: "Plant a Tree", points: 200, category: "Environmental", stock: 999, redeemed: 1532, status: "Active", image: "🌳" },
    { id: 3, name: "Discount Coupon 10%", points: 50, category: "Voucher", stock: 200, redeemed: 567, status: "Active", image: "🎟️" },
    { id: 4, name: "Reusable Water Bottle", points: 150, category: "Physical", stock: 30, redeemed: 189, status: "Active", image: "💧" },
    { id: 5, name: "Solar Power Bank", points: 500, category: "Physical", stock: 15, redeemed: 45, status: "Active", image: "☀️" },
    { id: 6, name: "Bamboo Toothbrush Set", points: 80, category: "Physical", stock: 100, redeemed: 342, status: "Active", image: "🪥" },
    { id: 7, name: "Organic Seeds Pack", points: 120, category: "Environmental", stock: 75, redeemed: 267, status: "Active", image: "🌱" }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newReward, setNewReward] = useState({
    name: '', points: '', category: 'Physical', stock: '', image: '🎁'
  })

  const filteredRewards = rewards.filter(reward => {
    const matchesSearch = reward.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCategory === 'All' || reward.category === filterCategory
    return matchesSearch && matchesFilter
  })

  const handleAddReward = () => {
    if (!newReward.name || !newReward.points || !newReward.stock) {
      alert('Please fill all required fields!')
      return
    }
    const reward = {
      id: rewards.length + 1,
      name: newReward.name,
      points: parseInt(newReward.points),
      category: newReward.category,
      stock: parseInt(newReward.stock),
      redeemed: 0,
      status: 'Active',
      image: newReward.image
    }
    setRewards([...rewards, reward])
    setShowAddModal(false)
    setNewReward({ name: '', points: '', category: 'Physical', stock: '', image: '🎁' })
    alert('Reward added successfully!')
  }

  const handleDeleteReward = (rewardId) => {
    if (window.confirm('Are you sure you want to delete this reward?')) {
      setRewards(rewards.filter(r => r.id !== rewardId))
      alert('Reward deleted successfully!')
    }
  }

  const handleToggleStatus = (rewardId) => {
    setRewards(rewards.map(r => 
      r.id === rewardId 
        ? {...r, status: r.status === 'Active' ? 'Inactive' : 'Active'} 
        : r
    ))
  }

  const handleUpdateStock = (rewardId) => {
    const newStock = prompt('Enter new stock quantity:')
    if (newStock !== null && !isNaN(newStock)) {
      setRewards(rewards.map(r => 
        r.id === rewardId 
          ? {...r, stock: parseInt(newStock)} 
          : r
      ))
      alert('Stock updated successfully!')
    }
  }

  const totalRewards = rewards.length
  const totalStock = rewards.reduce((sum, r) => sum + r.stock, 0)
  const totalRedeemed = rewards.reduce((sum, r) => sum + r.redeemed, 0)
  const totalPointsIssued = rewards.reduce((sum, r) => sum + (r.redeemed * r.points), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-3xl">🎁</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Rewards Management</h1>
              <p className="text-lg text-gray-600">Control all rewards, points, and redemptions</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-yellow-200">
              <p className="text-sm text-gray-600 mb-1">Total Rewards</p>
              <p className="text-3xl font-bold text-yellow-600">{totalRewards}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-green-200">
              <p className="text-sm text-gray-600 mb-1">Total Stock</p>
              <p className="text-3xl font-bold text-green-600">{totalStock.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Total Redeemed</p>
              <p className="text-3xl font-bold text-blue-600">{totalRedeemed.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Points Issued</p>
              <p className="text-3xl font-bold text-purple-600">{totalPointsIssued.toLocaleString()}</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="🔍 Search rewards by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-500 focus:outline-none"
              />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-6 py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-500 focus:outline-none bg-white"
              >
                <option value="All">All Categories</option>
                <option value="Physical">Physical</option>
                <option value="Environmental">Environmental</option>
                <option value="Voucher">Voucher</option>
              </select>
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                + Add Reward
              </button>
            </div>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredRewards.map((reward) => (
            <div key={reward.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-yellow-200 hover:border-yellow-400 transition-all transform hover:scale-105">
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-6 text-center">
                <div className="text-6xl mb-3">{reward.image}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{reward.name}</h3>
                <div className="flex justify-center gap-3">
                  <span className="bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    {reward.points} points
                  </span>
                  <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    reward.status === 'Active' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-400 text-white'
                  }`}>
                    {reward.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 font-medium">Category:</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                    {reward.category}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 font-medium">Stock:</span>
                  <span className={`font-bold ${reward.stock < 20 ? 'text-red-600' : 'text-green-600'}`}>
                    {reward.stock} units
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 font-medium">Redeemed:</span>
                  <span className="font-bold text-purple-600">{reward.redeemed} times</span>
                </div>
                
                <div className="pt-3 border-t border-gray-200 flex gap-2">
                  <button
                    onClick={() => handleUpdateStock(reward.id)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all"
                  >
                    📦 Update Stock
                  </button>
                  <button
                    onClick={() => handleToggleStatus(reward.id)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all"
                  >
                    {reward.status === 'Active' ? '🔒 Disable' : '✓ Enable'}
                  </button>
                </div>
                <button
                  onClick={() => handleDeleteReward(reward.id)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all"
                >
                  🗑️ Delete Reward
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Results Info */}
        <div className="text-center text-gray-600">
          Showing {filteredRewards.length} of {totalRewards} rewards
        </div>

        {/* Add Reward Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">➕ Add New Reward</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Reward Name *</label>
                  <input
                    type="text"
                    value={newReward.name}
                    onChange={(e) => setNewReward({...newReward, name: e.target.value})}
                    placeholder="e.g., Eco Shopping Bag"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Points Required *</label>
                  <input
                    type="number"
                    value={newReward.points}
                    onChange={(e) => setNewReward({...newReward, points: e.target.value})}
                    placeholder="e.g., 100"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select
                    value={newReward.category}
                    onChange={(e) => setNewReward({...newReward, category: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-500 focus:outline-none bg-white"
                  >
                    <option value="Physical">Physical</option>
                    <option value="Environmental">Environmental</option>
                    <option value="Voucher">Voucher</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity *</label>
                  <input
                    type="number"
                    value={newReward.stock}
                    onChange={(e) => setNewReward({...newReward, stock: e.target.value})}
                    placeholder="e.g., 50"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Icon Emoji</label>
                  <input
                    type="text"
                    value={newReward.image}
                    onChange={(e) => setNewReward({...newReward, image: e.target.value})}
                    placeholder="e.g., 🎁"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-500 focus:outline-none text-3xl text-center"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddReward}
                  className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  Add Reward
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminRewardsPage
