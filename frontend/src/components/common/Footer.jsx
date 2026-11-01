import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🌍</span>
              <span className="text-xl font-bold">EarthCare</span>
            </div>
            <p className="text-green-200 mb-4">
              Building a sustainable future through collective action and environmental awareness.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-green-300 hover:text-white text-2xl">📘</a>
              <a href="#" className="text-green-300 hover:text-white text-2xl">📱</a>
              <a href="#" className="text-green-300 hover:text-white text-2xl">🐦</a>
              <a href="#" className="text-green-300 hover:text-white text-2xl">📧</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/tasks" className="text-green-200 hover:text-white transition-colors">Daily Tasks</Link></li>
              <li><Link to="/rewards" className="text-green-200 hover:text-white transition-colors">Rewards Store</Link></li>
              <li><Link to="/challenges" className="text-green-200 hover:text-white transition-colors">Challenges</Link></li>
              <li><Link to="/leaderboard" className="text-green-200 hover:text-white transition-colors">Leaderboard</Link></li>
            </ul>
          </div>

          {/* Environment */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Environment</h3>
            <ul className="space-y-2">
              <li><Link to="/tree" className="text-green-200 hover:text-white transition-colors">Tree Plantation</Link></li>
              <li><Link to="/waste" className="text-green-200 hover:text-white transition-colors">Waste Management</Link></li>
              <li><Link to="/pollution" className="text-green-200 hover:text-white transition-colors">Pollution Tracking</Link></li>
              <li><Link to="/events" className="text-green-200 hover:text-white transition-colors">Eco Events</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-green-200 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="text-green-200 hover:text-white transition-colors">About Us</Link></li>
              <li><a href="#" className="text-green-200 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-green-700 mt-8 pt-8 text-center">
          <p className="text-green-200">
            © 2026 EarthCare App. All rights reserved. Made with 💚 for our planet.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer