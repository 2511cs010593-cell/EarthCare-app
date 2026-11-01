import React, { useState } from 'react'

const EventsPage = () => {
  const [events, setEvents] = useState([
    { id: 1, title: "Community Tree Planting", date: "2026-10-15", location: "Central Park", seats: 25, icon: "🌳", registered: false },
    { id: 2, title: "Beach Cleanup Drive", date: "2026-10-20", location: "Marina Beach", seats: 50, icon: "🏖️", registered: false },
    { id: 3, title: "Recycling Workshop", date: "2026-10-25", location: "Community Center", seats: 30, icon: "♻️", registered: false },
    { id: 4, title: "Solar Energy Seminar", date: "2026-11-01", location: "Green Building", seats: 40, icon: "☀️", registered: false }
  ])

  const handleRegister = (eventId) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId 
          ? { ...event, registered: true, seats: event.seats - 1 }
          : event
      )
    )
    
    const event = events.find(e => e.id === eventId)
    alert(`🎉 Successfully registered for ${event.title}! See you there!`)
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
                  onClick={() => handleRegister(event.id)}
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
    </div>
  )
}

export default EventsPage