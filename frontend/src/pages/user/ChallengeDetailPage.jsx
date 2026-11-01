import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const ChallengeDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [tasks, setTasks] = useState([
    { id: 1, day: 1, title: "Refuse single-use plastic bags", completed: false, photo: null },
    { id: 2, day: 1, title: "Use reusable water bottle", completed: false, photo: null },
    { id: 3, day: 2, title: "Bring your own containers for takeout", completed: false, photo: null },
    { id: 4, day: 2, title: "Say no to plastic straws", completed: false, photo: null },
    { id: 5, day: 3, title: "Use cloth bags for groceries", completed: false, photo: null },
    { id: 6, day: 4, title: "Choose products with minimal packaging", completed: false, photo: null },
    { id: 7, day: 5, title: "Pack lunch in reusable containers", completed: false, photo: null },
    { id: 8, day: 6, title: "Use bar soap instead of liquid soap", completed: false, photo: null },
    { id: 9, day: 7, title: "Share your zero-waste journey on social media", completed: false, photo: null }
  ])

  const [showPhotoUpload, setShowPhotoUpload] = useState(null)
  const [showLocationShare, setShowLocationShare] = useState(false)
  const [location, setLocation] = useState(null)

  const handleTaskComplete = (taskId) => {
    setShowPhotoUpload(taskId)
  }

  const handlePhotoUpload = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: true, photo: 'uploaded' } : task
    ))
    setShowPhotoUpload(null)
    alert('✅ Photo uploaded! Task marked as complete.')
  }

  const handleLocationShare = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          alert('📍 Location shared successfully!')
          setShowLocationShare(false)
        },
        (error) => {
          alert('📍 Location access denied. Using demo location.')
          setLocation({ lat: 17.385044, lng: 78.486671 }) // Hyderabad
          setShowLocationShare(false)
        }
      )
    }
  }

  const completedTasks = tasks.filter(t => t.completed).length
  const progress = Math.round((completedTasks / tasks.length) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <button onClick={() => navigate('/challenges')} className="text-green-600 hover:text-green-700 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Challenges
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">🗑️ Zero Waste Week Challenge</h1>
              <p className="text-gray-600">Complete 9 eco-friendly tasks over 7 days</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-green-600">{progress}%</div>
              <div className="text-sm text-gray-600">{completedTasks}/{tasks.length} Complete</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Location Share Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">📍 Share Your Location</h3>
              <p className="text-sm text-gray-600">Help us map eco-friendly activities in your area</p>
              {location && (
                <p className="text-xs text-green-600 mt-2">✅ Location shared: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
              )}
            </div>
            <button
              onClick={() => setShowLocationShare(true)}
              disabled={location !== null}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                location 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white'
              }`}
            >
              {location ? 'Location Shared' : 'Share Location'}
            </button>
          </div>
        </div>

        {/* Daily Reminder */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🔔</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1">Daily Reminder Active</h3>
              <p className="text-sm opacity-90">We'll notify you daily at 9:00 AM to complete your tasks</p>
            </div>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-semibold transition-all">
              Settings
            </button>
          </div>
        </div>

        {/* Tasks List - Grouped by Day */}
        {[1, 2, 3, 4, 5, 6, 7].map(day => {
          const dayTasks = tasks.filter(t => t.day === day)
          if (dayTasks.length === 0) return null
          
          return (
            <div key={day} className="bg-white rounded-2xl shadow-xl p-6 mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Day {day}</span>
              </h3>
              
              <div className="space-y-3">
                {dayTasks.map(task => (
                  <div key={task.id} className={`border-2 rounded-xl p-4 transition-all ${
                    task.completed 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-green-300'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          task.completed 
                            ? 'border-green-500 bg-green-500' 
                            : 'border-gray-300'
                        }`}>
                          {task.completed && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          )}
                        </div>
                        <span className={`font-medium ${task.completed ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                          {task.title}
                        </span>
                        {task.completed && task.photo && (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">📷 Photo uploaded</span>
                        )}
                      </div>
                      {!task.completed && (
                        <button
                          onClick={() => handleTaskComplete(task.id)}
                          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                        >
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Photo Upload Modal */}
      {showPhotoUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📷 Upload Proof Photo</h2>
            <p className="text-gray-600 mb-4">Take a photo to show you completed this task!</p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4 hover:border-green-500 transition-all cursor-pointer">
              <div className="text-5xl mb-2">📸</div>
              <p className="text-sm text-gray-600">Click to upload or take photo</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPhotoUpload(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handlePhotoUpload(showPhotoUpload)}
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Location Share Modal */}
      {showLocationShare && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📍 Share Your Location</h2>
            <p className="text-gray-600 mb-4">
              Help us create a community map of eco-friendly activities in your area. Your location will be used to show nearby participants and suggest local eco-spots.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Privacy:</span> Your exact location is not shared publicly, only your general area.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLocationShare(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleLocationShare}
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Share Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChallengeDetailPage
