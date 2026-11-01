import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const ChallengeDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [tasks, setTasks] = useState([
    { id: 1, day: 1, title: "Plant a tree at Jubilee Hills Park, Road No. 45", address: "Jubilee Hills Park, Road No. 45, Hyderabad", completed: false, photo: null },
    { id: 2, day: 1, title: "Clean garbage at Hussain Sagar Lake, Tank Bund Road", address: "Hussain Sagar Lake, Tank Bund Road, Hyderabad", completed: false, photo: null },
    { id: 3, day: 2, title: "Plant 3 trees at KBR National Park entrance", address: "KBR National Park, Jubilee Hills, Hyderabad", completed: false, photo: null },
    { id: 4, day: 3, title: "Clean plastic waste at Durgam Cheruvu Lake", address: "Durgam Cheruvu, Inorbit Mall Road, Hyderabad", completed: false, photo: null },
    { id: 5, day: 4, title: "Plant saplings at Botanical Garden, Kondapur", address: "Botanical Garden, Kondapur, Hyderabad", completed: false, photo: null },
    { id: 6, day: 5, title: "Clean garbage at Lumbini Park, Secretariat Road", address: "Lumbini Park, Secretariat Road, Hyderabad", completed: false, photo: null },
    { id: 7, day: 6, title: "Plant trees at Banjara Hills Road No. 12", address: "Banjara Hills, Road No. 12, Hyderabad", completed: false, photo: null },
    { id: 8, day: 7, title: "Clean waste at Necklace Road Beach", address: "Necklace Road, Khairatabad, Hyderabad", completed: false, photo: null },
    { id: 9, day: 7, title: "Final report: Share before/after photos on social media", address: "Online - Share your journey", completed: false, photo: null }
  ])

  const [showPhotoUpload, setShowPhotoUpload] = useState(null)
  const [showLocationShare, setShowLocationShare] = useState(false)
  const [location, setLocation] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)

  const handleTaskComplete = (taskId) => {
    setShowPhotoUpload(taskId)
    setUploadedFile(null)
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setUploadedFile(file)
    } else {
      alert('Please select a valid image file')
    }
  }

  const handlePhotoUpload = (taskId) => {
    if (!uploadedFile) {
      alert('Please select a photo before uploading')
      return
    }
    
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: true, photo: URL.createObjectURL(uploadedFile) } : task
    ))
    setShowPhotoUpload(null)
    setUploadedFile(null)
    alert('✅ Photo uploaded successfully! Task marked as complete.')
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">🌳 Tree Planting & Cleanup Challenge</h1>
              <p className="text-gray-600">Complete 9 location-based environmental tasks over 7 days</p>
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
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
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
                        <div className="flex-1">
                          <span className={`font-medium block mb-1 ${task.completed ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                            {task.title}
                          </span>
                          {task.address && (
                            <div className="flex items-start gap-2 text-sm text-gray-600 mb-2">
                              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              </svg>
                              <span>{task.address}</span>
                            </div>
                          )}
                          {task.completed && task.photo && (
                            <div className="mt-2">
                              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">✅ Photo uploaded</span>
                              <img src={task.photo} alt="Completed task" className="mt-2 rounded-lg max-h-40 object-cover border-2 border-green-300" />
                            </div>
                          )}
                        </div>
                      </div>
                      {!task.completed && (
                        <button
                          onClick={() => handleTaskComplete(task.id)}
                          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all flex-shrink-0"
                        >
                          Upload Photo
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">📷 Upload Completion Photo</h2>
            <p className="text-gray-600 mb-4">Upload a photo showing you completed this task at the location!</p>
            
            {/* File Upload Area */}
            <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4 hover:border-green-500 transition-all cursor-pointer block">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileSelect}
                className="hidden"
              />
              {uploadedFile ? (
                <div>
                  <div className="text-5xl mb-2">✅</div>
                  <p className="text-sm text-green-600 font-semibold">{uploadedFile.name}</p>
                  <p className="text-xs text-gray-500 mt-1">Click to change photo</p>
                  {uploadedFile && (
                    <img 
                      src={URL.createObjectURL(uploadedFile)} 
                      alt="Preview" 
                      className="mt-3 rounded-lg max-h-40 mx-auto object-cover"
                    />
                  )}
                </div>
              ) : (
                <div>
                  <div className="text-5xl mb-2">📸</div>
                  <p className="text-sm text-gray-600 font-semibold">Click to upload or take photo</p>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 10MB</p>
                </div>
              )}
            </label>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-xs text-blue-800">
                <span className="font-semibold">Tip:</span> Take a clear photo showing the planted tree or cleaned area as proof of completion.
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowPhotoUpload(null)
                  setUploadedFile(null)
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handlePhotoUpload(showPhotoUpload)}
                disabled={!uploadedFile}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                  uploadedFile 
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Upload & Complete
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
