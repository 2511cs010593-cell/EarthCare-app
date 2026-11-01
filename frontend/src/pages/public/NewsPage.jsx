import React, { useState } from 'react'

const NewsPage = () => {
  const [selectedArticle, setSelectedArticle] = useState(null)

  const news = [
    { id: 1, title: "Global Climate Summit 2026", summary: "World leaders gather to discuss climate action and implement new carbon reduction strategies", category: "Climate", author: "EcoNews Team", date: "2026-09-28", image: "🌍", fullContent: "The Global Climate Summit 2026 brings together over 190 world leaders in a historic gathering to address climate change. Key outcomes include commitments to reduce carbon emissions by 60% by 2030, a $500 billion fund for renewable energy transition, and legally binding agreements on deforestation. Scientists present new data showing accelerated climate impacts, urging immediate action. The summit marks a turning point in global cooperation on environmental issues, with unprecedented support from both developed and developing nations." },
    { id: 2, title: "Plastic-Free Oceans Initiative", summary: "New technology removes microplastics from seawater at unprecedented rates", category: "Ocean", author: "Marine Team", date: "2026-09-25", image: "🌊", fullContent: "Revolutionary nanotechnology developed by marine scientists can now filter microplastics from ocean water with 99% efficiency. The system uses bio-based magnetic nanoparticles that attract and capture plastic particles as small as 1 micron. Pilot programs in the Pacific Ocean have already removed over 50 tons of microplastics in just three months. The technology is scalable and can be deployed in coastal regions worldwide. Funding from environmental organizations and tech companies will expand operations to cover major ocean pollution zones by 2027." },
    { id: 3, title: "Solar Energy Breakthrough", summary: "Scientists achieve 50% efficiency in solar panels, revolutionizing renewable energy", category: "Energy", author: "Tech Team", date: "2026-09-20", image: "☀️", fullContent: "A groundbreaking discovery in photovoltaic technology has pushed solar panel efficiency to an unprecedented 50%, doubling current commercial standards. The new tandem cell design combines perovskite and silicon layers with advanced light-trapping techniques. This breakthrough means solar panels will generate twice the power from the same surface area, making solar energy more accessible and cost-effective. Mass production begins in Q1 2027, with prices expected to drop by 40%. Experts predict this will accelerate the global transition to renewable energy by at least a decade." },
    { id: 4, title: "Urban Forest Projects", summary: "Cities worldwide plant millions of trees to combat urban heat islands", category: "Urban", author: "Green Cities", date: "2026-09-15", image: "🌳", fullContent: "Major cities across five continents have launched coordinated urban forestry initiatives, planting over 10 million trees in 2026 alone. These green corridors reduce urban temperatures by up to 5°C, improve air quality, and provide habitat for urban wildlife. Cities like Singapore, Copenhagen, and Melbourne lead with innovative tree-planting strategies including rooftop forests and vertical gardens. Studies show residents in green neighborhoods report 30% better mental health and reduced respiratory illnesses. The initiative aims to plant 50 million trees globally by 2030." },
    { id: 5, title: "Electric Vehicle Revolution", summary: "EV sales surpass traditional vehicles for the first time in history", category: "Transport", author: "Auto News", date: "2026-09-10", image: "🚗", fullContent: "2026 marks a historic milestone as electric vehicle sales exceed internal combustion engine vehicles worldwide for the first time. Improved battery technology offering 800km range, faster charging times under 15 minutes, and competitive pricing have driven mass adoption. Governments worldwide offer incentives including tax breaks and charging infrastructure investments. Major automakers have committed to phasing out gas vehicles by 2030. The shift is projected to reduce transport emissions by 40% within five years, significantly contributing to climate goals." },
    { id: 6, title: "Ocean Cleanup Success", summary: "Pacific garbage patch reduced by 40% through innovative cleanup methods", category: "Ocean", author: "Marine Team", date: "2026-09-05", image: "♻️", fullContent: "The Great Pacific Garbage Patch has shrunk by 40% thanks to advanced cleanup technologies and international cooperation. Autonomous cleanup vessels equipped with AI-powered collection systems work 24/7, removing over 200 tons of plastic daily. Recovered materials are recycled into building materials and consumer products. The initiative employs over 5,000 people globally and has inspired similar projects in other ocean regions. Scientists estimate the Pacific could be 90% plastic-free by 2032 if current momentum continues." },
    { id: 7, title: "Sustainable Agriculture", summary: "Vertical farming feeds millions while using 95% less water", category: "Agriculture", author: "Farm Tech", date: "2026-08-30", image: "🌾", fullContent: "Vertical farming technology has revolutionized food production, with facilities now operating in over 100 cities worldwide. These high-tech farms use 95% less water than traditional agriculture, require no pesticides, and produce crops year-round regardless of climate. LED grow lights optimized for plant growth reduce energy consumption by 60%. Urban vertical farms provide fresh produce within hours of harvest, cutting transportation emissions. The industry now supplies 15% of global vegetable consumption and is expanding rapidly into grain and protein production." },
    { id: 8, title: "Wildlife Conservation Win", summary: "Endangered species population doubles thanks to global conservation efforts", category: "Wildlife", author: "Conservation Team", date: "2026-08-25", image: "🐼", fullContent: "Coordinated global conservation efforts have resulted in the doubling of several endangered species populations over the past decade. Giant pandas, mountain gorillas, and Bengal tigers have all seen remarkable recoveries through habitat protection, anti-poaching measures, and breeding programs. Advanced tracking technology monitors wildlife in real-time, enabling rapid response to threats. Local communities benefit economically through eco-tourism, creating sustainable incentives for conservation. The success demonstrates that dedicated conservation efforts can reverse biodiversity loss." },
    { id: 9, title: "Green Building Standards", summary: "New eco-friendly construction methods reduce carbon footprint by 70%", category: "Architecture", author: "Build Green", date: "2026-08-20", image: "🏗️", fullContent: "The construction industry has adopted revolutionary green building standards that reduce carbon emissions by 70% compared to traditional methods. Innovations include carbon-negative concrete, sustainable timber alternatives, and modular construction techniques. Buildings now generate their own energy through integrated solar systems and use rainwater harvesting for 80% of water needs. Smart building management systems optimize energy use in real-time. Major cities now require all new buildings to meet net-zero carbon standards by 2028." },
    { id: 10, title: "Zero Waste Cities", summary: "Five major cities achieve zero-waste status through innovative recycling programs", category: "Waste", author: "City Watch", date: "2026-08-15", image: "🗑️", fullContent: "San Francisco, Tokyo, Copenhagen, Seoul, and Amsterdam have achieved zero-waste status, diverting over 99% of waste from landfills. Comprehensive recycling programs, composting initiatives, and circular economy policies have transformed waste management. Citizens participate in detailed sorting systems, and businesses face incentives for reducing packaging. Organic waste powers biogas plants providing clean energy. The economic benefits are substantial, with waste processing creating 50,000 new jobs and saving cities millions in landfill costs. These successes provide blueprints for other cities worldwide." }
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
                  onClick={() => setSelectedArticle(article)}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-2 px-4 rounded-lg transition-all transform hover:scale-105 font-semibold">
                  Read Full Article →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedArticle(null)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-6xl mb-3">{selectedArticle.image}</div>
                  <h2 className="text-3xl font-bold mb-2">{selectedArticle.title}</h2>
                  <div className="flex gap-4 text-sm opacity-90">
                    <span>By {selectedArticle.author}</span>
                    <span>•</span>
                    <span>{selectedArticle.date}</span>
                    <span>•</span>
                    <span className="bg-white bg-opacity-20 px-2 py-1 rounded">{selectedArticle.category}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-8">
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                {selectedArticle.fullContent}
              </p>
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewsPage