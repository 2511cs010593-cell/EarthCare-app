#!/bin/bash

# Create directories
mkdir -p src/pages/public src/pages/user src/pages/admin

# Create placeholder component function
create_page() {
  local path=$1
  local name=$2
  local title=$3
  local icon=$4
  
  cat > "$path" << EOF
import React from 'react'

const $name = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-20">
          <div className="text-8xl mb-6">$icon</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">$title</h1>
          <p className="text-xl text-gray-600 mb-8">
            This page is under development. Check back soon!
          </p>
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
            <div className="text-2xl mb-4">🚧</div>
            <p className="text-gray-600">
              We're working hard to bring you amazing features.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default $name
EOF
}

# Create all missing pages
create_page "src/pages/public/ForgotPasswordPage.jsx" "ForgotPasswordPage" "Forgot Password" "🔑"
create_page "src/pages/public/ResetPasswordPage.jsx" "ResetPasswordPage" "Reset Password" "🔄"
create_page "src/pages/public/AboutPage.jsx" "AboutPage" "About EarthCare" "ℹ️"
create_page "src/pages/user/TreePlantationPage.jsx" "TreePlantationPage" "Tree Plantation" "🌳"
create_page "src/pages/user/WasteReportPage.jsx" "WasteReportPage" "Waste Reporting" "♻️"
create_page "src/pages/user/ChallengesPage.jsx" "ChallengesPage" "Eco Challenges" "🎯"
create_page "src/pages/user/PollutionPage.jsx" "PollutionPage" "Pollution Tracker" "📊"
create_page "src/pages/user/CommunityPage.jsx" "CommunityPage" "Community Forum" "👥"
create_page "src/pages/user/PostDetailPage.jsx" "PostDetailPage" "Post Details" "📝"
create_page "src/pages/user/ProfilePage.jsx" "ProfilePage" "My Profile" "👤"
create_page "src/pages/user/PlasticTrackerPage.jsx" "PlasticTrackerPage" "Plastic Tracker" "🥤"
create_page "src/pages/admin/AdminDashboardPage.jsx" "AdminDashboardPage" "Admin Dashboard" "⚙️"
create_page "src/pages/admin/AdminUsersPage.jsx" "AdminUsersPage" "Manage Users" "👥"
create_page "src/pages/admin/AdminNewsPage.jsx" "AdminNewsPage" "Manage News" "📰"
create_page "src/pages/admin/AdminEventsPage.jsx" "AdminEventsPage" "Manage Events" "📅"
create_page "src/pages/admin/AdminChallengesPage.jsx" "AdminChallengesPage" "Manage Challenges" "🎯"
create_page "src/pages/admin/AdminTreeApprovalsPage.jsx" "AdminTreeApprovalsPage" "Tree Approvals" "🌳"
create_page "src/pages/admin/AdminWasteReportsPage.jsx" "AdminWasteReportsPage" "Waste Reports" "♻️"
create_page "src/pages/admin/AdminPollutionPage.jsx" "AdminPollutionPage" "Pollution Data" "📊"
create_page "src/pages/admin/AdminNotificationsPage.jsx" "AdminNotificationsPage" "Notifications" "🔔"
create_page "src/pages/admin/AdminContactsPage.jsx" "AdminContactsPage" "Contact Messages" "📞"

echo "All missing pages created!"