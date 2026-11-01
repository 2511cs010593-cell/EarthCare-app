import React, { useState } from 'react'

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '' })

  const [events, setEvents] = useState([
    { id: 1, title: "Community Tree Planting", date: "2026-10-15", location: "Central Park", seats: 25, icon: "🌳", registered: false },
    { id: 2, title: "Beach Cleanup Drive", date: "2026-10-20", location: "Marina Beach", seats: 50, icon: "🏖️", registered: false },
    { id: 3, title: "Recycling Workshop", date: "2026-10-25", location: "Community Center", seats: 30, icon: "♻️", registered: false },
    { id: 4, title: "Solar Energy Seminar", date: "2026-11-01", location: "Green Building", seats: 40, icon: "☀️", registered: false }
  ])

  const handleRegister = (event) => {
    setSelectedEvent(event)
    setShowForm(true)
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    setEvents(prevEvents => 
      prevEvents.map(evt => 
        evt.id === selectedEvent.id 
          ? { ...evt, registered: true, seats: evt.seats - 1 }
          : evt
      )
    )
    setShowForm(false)
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setFormData({ fullName: '', email: '', phone: '' })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">📅 Eco Events</h1>
          <p className="text-xl text-gray-600">Join our community events and make a difference!</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105">
              <div className="text-5xl mb-4 animate-bounce-slow text-center">{event.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
              <div className="space-y-2 text-gray-600 mb-6">
                <div className="flex items-center">
                  <span className="mr-2">📅</span>
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📍</span>
                  {event.location}
                </div>
                <div className="flex items-center">
                  <span className="mr-2">👥</span>
                  {event.seats} seats available
                </div>
              </div>
              
              {event.registered ? (
                <button className="w-full bg-green-500 text-white py-3 px-4 rounded-lg cursor-not-allowed shadow-lg">
                  ✅ Registered
                </button>
              ) : (
                <button 
                  onClick={() => handleRegister(event)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  Register Now
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-white rounded-xl shadow-lg">
          <div className="text-6xl mb-4">🌱</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Want to Organize an Event?</h2>
          <p className="text-gray-600 mb-6">Help grow our community by organizing your own eco-friendly event!</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-all transform hover:scale-105">
            Propose New Event
          </button>
        </div>
      </div>

      {/* Registration Form Modal */}
      {showForm && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold">Register for Event</h2>
              <p className="text-sm opacity-90 mt-1">{selectedEvent.title}</p>
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
      {showSuccess && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Successfully Registered!</h2>
            <p className="text-gray-600 mb-4">
              You have successfully registered for <span className="font-semibold text-green-600">{selectedEvent.title}</span>
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 text-left">
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Event Details:</span>
              </p>
              <p className="text-sm text-gray-600">📅 Date: {new Date(selectedEvent.date).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600">📍 Location: {selectedEvent.location}</p>
              <p className="text-sm text-gray-600 mt-2 font-semibold text-green-700">See you there!</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSuccess(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
              >
                Close
              </button>
              <a
                href="/community"
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                View Community
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventsPage