import React from 'react'

const ResetPasswordPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔄</div>
          <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <form className="space-y-6">
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage