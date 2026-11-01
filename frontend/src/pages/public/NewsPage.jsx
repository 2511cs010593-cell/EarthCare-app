import React from 'react'

const NewsPage = () => {
  const news = [
    { id: 1, title: "Global Climate Summit 2026", summary: "World leaders gather to discuss climate action and implement new carbon reduction strategies", category: "Climate", author: "EcoNews Team", date: "2026-09-28", image: "🌍" },
    { id: 2, title: "Plastic-Free Oceans Initiative", summary: "New technology removes microplastics from seawater at unprecedented rates", category: "Ocean", author: "Marine Team", date: "2026-09-25", image: "🌊" },
    { id: 3, title: "Solar Energy Breakthrough", summary: "Scientists achieve 50% efficiency in solar panels, revolutionizing renewable energy", category: "Energy", author: "Tech Team", date: "2026-09-20", image: "☀️" },
    { id: 4, title: "Urban Forest Projects", summary: "Cities worldwide plant millions of trees to combat urban heat islands", category: "Urban", author: "Green Cities", date: "2026-09-15", image: "🌳" },
    { id: 5, title: "Electric Vehicle Revolution", summary: "EV sales surpass traditional vehicles for the first time in history", category: "Transport", author: "Auto News", date: "2026-09-10", image: "🚗" },
    { id: 6, title: "Ocean Cleanup Success", summary: "Pacific garbage patch reduced by 40% through innovative cleanup methods", category: "Ocean", author: "Marine Team", date: "2026-09-05", image: "♻️" },
    { id: 7, title: "Sustainable Agriculture", summary: "Vertical farming feeds millions while using 95% less water", category: "Agriculture", author: "Farm Tech", date: "2026-08-30", image: "🌾" },
    { id: 8, title: "Wildlife Conservation Win", summary: "Endangered species population doubles thanks to global conservation efforts", category: "Wildlife", author: "Conservation Team", date: "2026-08-25", image: "🐼" },
    { id: 9, title: "Green Building Standards", summary: "New eco-friendly construction methods reduce carbon footprint by 70%", category: "Architecture", author: "Build Green", date: "2026-08-20", image: "🏗️" },
    { id: 10, title: "Zero Waste Cities", summary: "Five major cities achieve zero-waste status through innovative recycling programs", category: "Waste", author: "City Watch", date: "2026-08-15", image: "🗑️" }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">📰 Environmental News</h1>
          <p className="text-xl text-gray-600">Stay updated with the latest environmental stories</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map(article => (
            <div key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-5xl">{article.image}</div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {article.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-green-600 transition-colors">{article.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{article.summary}</p>
                <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                  <span className="font-medium">By {article.author}</span>
                  <span>{article.date}</span>
                </div>
                <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-2 px-4 rounded-lg transition-all transform hover:scale-105 font-semibold">
                  Read Full Article →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewsPage