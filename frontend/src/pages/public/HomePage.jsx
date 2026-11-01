import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()
  const [isNightMode, setIsNightMode] = useState(false)

  const toggleDayNight = () => {
    setIsNightMode(!isNightMode)
  }

  return (
    <div className={`min-h-screen relative overflow-hidden ${isNightMode ? 'bg-night-mode' : 'bg-photo-realistic'}`}>
      {/* Day/Night Toggle Button */}
      <button
        onClick={toggleDayNight}
        className="fixed top-24 right-6 z-50 bg-white/90 hover:bg-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 border-2 border-gray-300"
        title={isNightMode ? "Switch to Day Mode" : "Switch to Night Mode"}
      >
        <span className="text-4xl">{isNightMode ? '☀️' : '🌙'}</span>
      </button>
      
      {/* Animated Butterflies */}
      <div className="absolute top-32 left-[15%] text-4xl animate-butterfly z-5">🦋</div>
      <div className="absolute top-48 right-[25%] text-3xl animate-butterfly-slow z-5" style={{ animationDelay: '2s' }}>🦋</div>
      <div className="absolute top-64 left-[60%] text-4xl animate-butterfly z-5" style={{ animationDelay: '4s' }}>🦋</div>
      <div className="absolute top-96 right-[40%] text-3xl animate-butterfly-slow z-5" style={{ animationDelay: '6s' }}>🦋</div>
      
      {/* Animated Falling Leaves */}
      <div className="absolute top-20 left-[10%] text-3xl animate-falling-leaf z-5">🍃</div>
      <div className="absolute top-10 left-[30%] text-4xl animate-falling-leaf z-5" style={{ animationDelay: '1s' }}>🍂</div>
      <div className="absolute top-16 right-[15%] text-3xl animate-falling-leaf z-5" style={{ animationDelay: '3s' }}>🍃</div>
      <div className="absolute top-24 right-[45%] text-4xl animate-falling-leaf z-5" style={{ animationDelay: '5s' }}>🍂</div>
      <div className="absolute top-12 left-[70%] text-3xl animate-falling-leaf z-5" style={{ animationDelay: '2s' }}>🍃</div>
      <div className="absolute top-32 right-[60%] text-4xl animate-falling-leaf z-5" style={{ animationDelay: '4s' }}>🍂</div>
      
      {/* Hero Section */}
      <section className="relative py-24 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-gray-800 text-2xl font-semibold">Welcome to</p>
                <h1 className="text-8xl font-black text-gray-900 leading-none tracking-tight">
                  Earth<span className="text-green-600">Care</span>
                </h1>
                <h2 className="text-4xl font-bold text-green-700 italic leading-tight">
                  Together for a <span className="text-green-600">Greener Planet</span>
                </h2>
              </div>
              
              <p className="text-xl text-gray-800 leading-relaxed font-medium pt-3">
                Complete eco-tasks, earn rewards and help the Earth!
              </p>
              
              <div className="pt-6">
                <button 
                  onClick={() => navigate('/register')}
                  className="bg-green-700 hover:bg-green-800 text-white px-12 py-5 rounded-full text-xl font-bold transition-all transform hover:scale-105 shadow-2xl"
                >
                  Get Started →
                </button>
              </div>

              <p className="text-base text-gray-700 italic pt-4 font-semibold">
                "Small Actions... Big Change..."
              </p>
            </div>

            <div className="relative flex justify-end items-start pt-16">
              <div className="text-right">
                <p className="text-4xl font-bold text-green-900 italic">Go Green...</p>
                <p className="text-3xl text-green-800 italic">Live Better...♡</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-12 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            <button 
              onClick={() => navigate('/tasks')}
              className="bg-green-100 hover:bg-green-200 p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all border-2 border-green-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-green-700 rounded-2xl flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Eco Tasks</h3>
                  <p className="text-gray-800 text-base font-medium">Complete simple environmental tasks.</p>
                </div>
              </div>
            </button>

            <button 
              onClick={() => navigate('/rewards')}
              className="bg-yellow-100 hover:bg-yellow-200 p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all border-2 border-yellow-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-yellow-600 rounded-2xl flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Rewards</h3>
                  <p className="text-gray-800 text-base font-medium">Earn points for your efforts.</p>
                </div>
              </div>
            </button>

            <button 
              onClick={() => navigate('/tree')}
              className="bg-emerald-100 hover:bg-emerald-200 p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all border-2 border-emerald-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-emerald-700 rounded-2xl flex items-center justify-center">
                  <div className="css-tree-icon">
                    <div className="tree-top"></div>
                    <div className="tree-trunk-icon"></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Plant Trees</h3>
                  <p className="text-gray-800 text-base font-medium">Support reforestation and a greener world.</p>
                </div>
              </div>
            </button>

            <button 
              onClick={() => navigate('/pollution')}
              className="bg-blue-100 hover:bg-blue-200 p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all border-2 border-blue-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-blue-700 rounded-2xl flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Track Impact</h3>
                  <p className="text-gray-800 text-base font-medium">See how you make a difference.</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="relative py-12 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-12 border-2 border-gray-200">
            <div className="grid md:grid-cols-4 gap-12 items-center">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center">
                  <div className="css-tree-small"></div>
                </div>
                <div className="text-left">
                  <div className="text-5xl font-black text-green-800">12K+</div>
                  <div className="text-gray-800 font-bold text-lg">Trees Planted</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-5xl font-black text-green-800">50K+</div>
                  <div className="text-gray-800 font-bold text-lg">Active Users</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center">
                  <div className="css-earth-small"></div>
                </div>
                <div className="text-left">
                  <div className="text-5xl font-black text-green-800">1M+</div>
                  <div className="text-gray-800 font-bold text-lg">CO₂ Reduced</div>
                </div>
              </div>
              <div className="text-center border-l-4 border-green-700 pl-8">
                <div className="text-3xl italic text-green-900 font-black leading-tight">A greener tomorrow</div>
                <div className="text-2xl text-green-700 font-bold mt-2">starts with <span className="italic underline decoration-4">you!</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-12 px-6 z-10 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-green-800 via-green-700 to-green-800 rounded-3xl shadow-2xl p-12 border-4 border-green-900">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex items-center gap-8">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="css-earth-large"></div>
                </div>
                <h2 className="text-4xl font-bold text-white leading-snug">
                  Let's make our Earth cleaner, greener and healthier <span className="text-yellow-300">together!</span>
                </h2>
              </div>
              <button 
                onClick={() => navigate('/register')}
                className="bg-white hover:bg-gray-100 text-green-800 px-12 py-5 rounded-full text-2xl font-black transition-all transform hover:scale-105 shadow-2xl whitespace-nowrap"
              >
                Join Now →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
