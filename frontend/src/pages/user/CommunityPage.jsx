import React, { useState } from 'react'

const CommunityPage = () => {
  const [aiQuery, setAiQuery] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const aiSuggestions = [
    "How can I reduce plastic waste at home?",
    "What are the best plants for indoor air quality?",
    "Tips for starting a community garden",
    "How to organize a neighborhood cleanup event"
  ]

  const handleAiQuery = () => {
    if (!aiQuery.trim()) return
    
    setIsGenerating(true)
    // Simulate AI response
    setTimeout(() => {
      const responses = {
        "plastic": "🌱 Great question! Here are some ways to reduce plastic waste:\n\n1. Use reusable shopping bags and water bottles\n2. Choose products with minimal packaging\n3. Switch to glass or metal containers\n4. Avoid single-use plastics like straws and cutlery\n5. Support local farmers markets for package-free produce",
        "plant": "🌿 Excellent indoor air-purifying plants include:\n\n1. Snake Plant - removes toxins and releases oxygen at night\n2. Spider Plant - removes formaldehyde and xylene\n3. Peace Lily - filters harmful VOCs\n4. Aloe Vera - removes benzene and formaldehyde\n5. Boston Fern - natural humidifier and air purifier",
        "garden": "🌻 Starting a community garden:\n\n1. Find a suitable location with good sunlight\n2. Gather interested community members\n3. Secure necessary permissions and permits\n4. Plan garden layout and raised beds\n5. Organize volunteer schedules and responsibilities\n6. Start composting for natural fertilizer",
        "cleanup": "🧹 Organizing a neighborhood cleanup:\n\n1. Set a date and notify residents\n2. Partner with local waste management\n3. Provide gloves, bags, and safety equipment\n4. Divide area into zones for teams\n5. Plan a celebration or gathering afterwards\n6. Document impact with photos and statistics"
      }
      
      // Find matching response
      let response = "🤖 Thank you for your question! Here's my suggestion:\n\nTake small, consistent steps towards environmental action. Every effort counts, whether it's reducing waste, planting trees, or educating others. Join community initiatives, share knowledge, and inspire others through your actions. Together, we can create a sustainable future! 🌍💚"
      
      for (const [key, value] of Object.entries(responses)) {
        if (aiQuery.toLowerCase().includes(key)) {
          response = value
          break
        }
      }
      
      setAiResponse(response)
      setIsGenerating(false)
    }, 1500)
  }

  const communityPosts = [
    { id: 1, author: "Sarah Green", time: "2 hours ago", content: "Just completed my first zero-waste week! 🎉", likes: 45, comments: 12 },
    { id: 2, author: "Mike Eco", time: "5 hours ago", content: "Planted 10 trees in the local park today with my team!", likes: 89, comments: 23 },
    { id: 3, author: "Emma Nature", time: "1 day ago", content: "Started composting - it's easier than I thought!", likes: 67, comments: 18 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">🌍 Community Hub</h1>
          <p className="text-xl text-gray-600">Connect, Share, and Make a Difference Together</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - AI Suggestions */}
          <div className="lg:col-span-1 space-y-6">
            {/* AI Assistant */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">AI Eco Assistant</h2>
                  <p className="text-sm text-gray-600">Ask me anything!</p>
                </div>
              </div>

              <div className="space-y-3">
                <textarea
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="Ask for eco-friendly tips and advice..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none resize-none"
                  rows="3"
                />
                
                <button
                  onClick={handleAiQuery}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 disabled:opacity-50"
                >
                  {isGenerating ? "Thinking... 🤔" : "Get AI Suggestion ✨"}
                </button>

                {aiResponse && (
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-lg border-2 border-green-200">
                    <p className="text-sm text-gray-800 whitespace-pre-line">{aiResponse}</p>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 mb-2">💡 Quick Suggestions:</p>
                  <div className="space-y-2">
                    {aiSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setAiQuery(suggestion)}
                        className="w-full text-left text-xs bg-gray-50 hover:bg-green-50 p-2 rounded-lg transition-colors border border-gray-200 hover:border-green-300"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Community Impact</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Active Members</span>
                  <span className="text-lg font-bold text-green-600">2,847</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Trees Planted</span>
                  <span className="text-lg font-bold text-blue-600">15,432</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">CO₂ Saved (kg)</span>
                  <span className="text-lg font-bold text-yellow-600">98,521</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Events This Month</span>
                  <span className="text-lg font-bold text-purple-600">24</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Map & Posts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Google Maps Integration */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🗺️ Local Environmental Hotspots</h2>
              <div className="relative bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-200" style={{height: '400px'}}>
                {/* Google Maps Embed - Hyderabad */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3169573677!2d78.26575859999999!3d17.4123487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{border: 0}}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Community Environmental Map"
                ></iframe>
                <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg">
                  <p className="text-sm font-semibold text-gray-700">📍 Hyderabad - Eco-friendly locations</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <p className="text-xs font-semibold text-gray-600">🌳 Parks & Gardens</p>
                  <p className="text-lg font-bold text-green-600">45 nearby</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="text-xs font-semibold text-gray-600">♻️ Recycling Centers</p>
                  <p className="text-lg font-bold text-blue-600">12 nearby</p>
                </div>
              </div>
            </div>

            {/* Community Posts */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-blue-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">💬 Community Feed</h2>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all">
                  + New Post
                </button>
              </div>
              
              <div className="space-y-4">
                {communityPosts.map(post => (
                  <div key={post.id} className="bg-gradient-to-br from-gray-50 to-green-50 p-5 rounded-xl border-2 border-gray-200 hover:border-green-300 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {post.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{post.author}</p>
                        <p className="text-xs text-gray-600">{post.time}</p>
                      </div>
                    </div>
                    <p className="text-gray-800 mb-3">{post.content}</p>
                    <div className="flex gap-6 text-sm text-gray-600">
                      <button className="hover:text-green-600 transition-colors">
                        👍 {post.likes} Likes
                      </button>
                      <button className="hover:text-blue-600 transition-colors">
                        💬 {post.comments} Comments
                      </button>
                      <button className="hover:text-purple-600 transition-colors">
                        🔗 Share
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunityPage
