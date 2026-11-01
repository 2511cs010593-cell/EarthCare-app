import React from 'react'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🌍 About EarthCare</h1>
          <p className="text-xl text-gray-600">Building a sustainable future together</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-12">
          <p className="text-lg text-gray-700 text-center">
            EarthCare is a platform dedicated to environmental protection through collective action.
            Join thousands of eco-warriors making a real difference for our planet.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage