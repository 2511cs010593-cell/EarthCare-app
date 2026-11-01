import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const TasksPage = () => {
  const { user } = useContext(AuthContext)
  
  const [tasks, setTasks] = useState([
    { id: 1, title: "Use Public Transport", description: "Take bus/train instead of car", points: 50, icon: "🚌", completed: false },
    { id: 2, title: "Recycle Plastic Bottles", description: "Sort and recycle 5 plastic bottles", points: 30, icon: "♻️", completed: false },
    { id: 3, title: "Use Reusable Bag", description: "Shop with eco-friendly bags", points: 25, icon: "🛍️", completed: false },
    { id: 4, title: "Plant a Seed", description: "Plant seeds in your garden", points: 75, icon: "🌱", completed: false },
    { id: 5, title: "Save Water", description: "Take shorter showers (< 5 min)", points: 40, icon: "💧", completed: false },
    { id: 6, title: "LED Bulbs", description: "Switch to energy efficient bulbs", points: 60, icon: "💡", completed: false }
  ])

  const handleCompleteTask = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: true } : task
      )
    )
    // Show success message
    alert(`🎉 Task completed! You earned ${tasks.find(t => t.id === taskId)?.points} points!`)
  }

  const completedToday = tasks.filter(t => t.completed).length
  const progressPercent = (completedToday / tasks.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">✅ Daily Tasks</h1>
        
        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Today's Progress</h2>
            <span className="text-sm text-gray-600">{completedToday} of {tasks.length} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="text-center mt-2 text-sm text-gray-600">{Math.round(progressPercent)}% Complete</div>
        </div>

        {/* Task Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(task => (
            <div key={task.id} className={`bg-white rounded-xl shadow-lg p-6 transition-all transform hover:scale-105 ${task.completed ? 'opacity-75 bg-green-50' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl animate-bounce-slow">{task.icon}</div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Points</div>
                  <div className="text-lg font-bold text-green-600">+{task.points}</div>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">{task.title}</h3>
              <p className="text-gray-600 mb-4">{task.description}</p>
              
              {task.completed ? (
                <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg cursor-not-allowed">
                  ✓ Completed
                </button>
              ) : (
                <button 
                  onClick={() => handleCompleteTask(task.id)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-all transform hover:scale-105"
                >
                  Complete Task
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TasksPage