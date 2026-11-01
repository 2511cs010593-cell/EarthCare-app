import React, { useState, useEffect } from 'react'
import { Lightbulb, Award } from 'lucide-react'

const DailyTipWidget = () => {
  const [tip, setTip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDailyTip = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/tips/daily')
        if (response.ok) {
          const data = await response.json()
          setTip(data)
        }
      } catch (err) {
        console.error('Error fetching daily tip:', err)
        setError('Could not load today\'s tip')
      } finally {
        setLoading(false)
      }
    }

    fetchDailyTip()
  }, [])

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800">
        <div className="animate-pulse">
          <div className="h-4 w-3/4 bg-amber-200 rounded mb-4"></div>
          <div className="h-3 w-full bg-amber-100 rounded mb-2"></div>
          <div className="h-3 w-5/6 bg-amber-100 rounded"></div>
        </div>
      </div>
    )
  }

  if (error || !tip) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 p-6 rounded-xl border border-amber-300 dark:border-amber-700 shadow-md hover:shadow-lg transition-all">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 shadow-md">
            <Lightbulb className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Today's Eco Tip
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            {tip.tipText}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <Award className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span className="font-semibold text-amber-700 dark:text-amber-300">
              +{tip.pointsForCompletion} Points for Completion
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DailyTipWidget
