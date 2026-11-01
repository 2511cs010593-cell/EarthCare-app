import React from 'react'

const NewsPage = () => {
  const news = [
    { id: 1, title: "Hyderabad's Green Cover Increases", summary: "GHMC plants 50,000 trees across the city to combat pollution and improve air quality", category: "Urban", author: "The Hindu", date: "2026-10-28", image: "🌳", url: "https://www.google.com/search?q=Hyderabad+green+cover+trees+plantation+GHMC+environment" },
    { id: 2, title: "Hussain Sagar Lake Cleanup Drive", summary: "Major initiative removes tons of plastic waste from Hyderabad's iconic lake", category: "Water", author: "Telangana Today", date: "2026-10-25", image: "🌊", url: "https://www.google.com/search?q=Hussain+Sagar+lake+cleanup+plastic+waste+Hyderabad+environment" },
    { id: 3, title: "Solar Energy Powers Metro Stations", summary: "Hyderabad Metro Rail switches to 100% solar power reducing carbon footprint", category: "Energy", author: "Times of India", date: "2026-10-20", image: "☀️", url: "https://www.google.com/search?q=Hyderabad+metro+solar+power+renewable+energy+environment" },
    { id: 4, title: "KBR National Park Biodiversity", summary: "New wildlife species discovered in Hyderabad's KBR National Park", category: "Wildlife", author: "Deccan Chronicle", date: "2026-10-15", image: "🦜", url: "https://www.google.com/search?q=KBR+National+Park+Hyderabad+wildlife+biodiversity+species" },
    { id: 5, title: "Electric Buses in Hyderabad", summary: "TSRTC introduces 500 new electric buses to reduce city pollution levels", category: "Transport", author: "The Hindu", date: "2026-10-10", image: "🚌", url: "https://www.google.com/search?q=TSRTC+electric+buses+Hyderabad+pollution+environment" },
    { id: 6, title: "Waste Segregation Success", summary: "Hyderabad achieves 80% waste segregation compliance in residential areas", category: "Waste", author: "News18", date: "2026-10-05", image: "♻️", url: "https://www.google.com/search?q=Hyderabad+waste+segregation+garbage+management+environment" },
    { id: 7, title: "Rooftop Solar Panel Scheme", summary: "Telangana government offers subsidies for installing solar panels in homes", category: "Energy", author: "Telangana Today", date: "2026-09-30", image: "🏠", url: "https://www.google.com/search?q=Telangana+rooftop+solar+panel+subsidy+scheme+Hyderabad" },
    { id: 8, title: "Durgam Cheruvu Lake Restoration", summary: "Major beautification and cleanup project transforms Hyderabad's Secret Lake", category: "Water", author: "Times of India", date: "2026-09-25", image: "💧", url: "https://www.google.com/search?q=Durgam+Cheruvu+lake+restoration+Hyderabad+cleanup+environment" },
    { id: 9, title: "Green Building Standards", summary: "New eco-friendly construction norms mandatory for all buildings in Hyderabad", category: "Architecture", author: "Deccan Chronicle", date: "2026-09-20", image: "🏗️", url: "https://www.google.com/search?q=Hyderabad+green+building+standards+eco+friendly+construction" },
    { id: 10, title: "Community Composting Initiative", summary: "Hyderabad neighborhoods adopt composting to reduce organic waste by 60%", category: "Waste", author: "The Hindu", date: "2026-09-15", image: "🌱", url: "https://www.google.com/search?q=Hyderabad+community+composting+organic+waste+environment" }
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
                <button 
                  onClick={() => window.open(article.url, '_blank')}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-2 px-4 rounded-lg transition-all transform hover:scale-105 font-semibold">
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