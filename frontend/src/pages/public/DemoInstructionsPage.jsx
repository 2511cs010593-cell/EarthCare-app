import React from 'react'
import { Link } from 'react-router-dom'

const DemoInstructionsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🌍</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Earth Care App - Demo Guide</h1>
          <p className="text-xl text-gray-600">Complete walkthrough of all working features</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-green-800 mb-6">🎯 How to Test the App</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">📱 Authentication Flow</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Click "Login" or "Register" in navbar</li>
                <li>• Fill any email/password (demo mode)</li>
                <li>• Click "Sign In Now" button</li>
                <li>• Notice navbar changes to show user</li>
                <li>• Try "Logout" to reset</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">🏠 Homepage Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Animated Earth background elements</li>
                <li>• "Get Started" → Register page</li>
                <li>• "Explore Challenges" → Challenges page</li>
                <li>• Hover effects on all cards</li>
                <li>• Responsive design</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">✅ Tasks Page</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Click "Complete Task" buttons</li>
                <li>• Watch progress bar update</li>
                <li>• See success alerts with points</li>
                <li>• Tasks become "Completed"</li>
                <li>• Progress percentage updates</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">🏆 Rewards Page</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• See animated user stats</li>
                <li>• Click "Redeem Now" buttons</li>
                <li>• Coin balance updates in real-time</li>
                <li>• "Not enough coins" messages</li>
                <li>• Badge collection display</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">📅 Events Page</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Click "Register Now" buttons</li>
                <li>• Seat count decreases</li>
                <li>• Button changes to "Registered"</li>
                <li>• Success confirmation alerts</li>
                <li>• Beautiful hover animations</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">🌐 All Pages Work</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• News page with articles</li>
                <li>• Contact form</li>
                <li>• Dashboard with stats</li>
                <li>• All navigation links</li>
                <li>• Mobile responsive menu</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-green-800 mb-4">🚀 Quick Test Steps</h2>
          <ol className="space-y-3 text-gray-700">
            <li>1. <strong>Homepage:</strong> See animated Earth elements and click main buttons</li>
            <li>2. <strong>Register:</strong> Create account with any details → redirects to login</li>
            <li>3. <strong>Login:</strong> Use any credentials → see navbar change</li>
            <li>4. <strong>Tasks:</strong> Complete tasks and watch progress update</li>
            <li>5. <strong>Rewards:</strong> Try redeeming items and see balance change</li>
            <li>6. <strong>Events:</strong> Register for events and see status change</li>
            <li>7. <strong>Logout:</strong> Click logout and return to public view</li>
          </ol>
        </div>

        <div className="text-center">
          <div className="space-x-4">
            <Link 
              to="/"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg font-medium"
            >
              Start Demo
            </Link>
            <Link 
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg font-medium"
            >
              Try Registration
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DemoInstructionsPage