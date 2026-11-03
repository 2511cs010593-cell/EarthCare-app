import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ProtectedRoute from './components/common/ProtectedRoute'
import AdminRoute from './components/common/AdminRoute'

// Public Pages
import HomePage from './pages/public/HomePage'
import LoginPage from './pages/public/LoginPage'
import RegisterPage from './pages/public/RegisterPage'
import ForgotPasswordPage from './pages/public/ForgotPasswordPage'
import ResetPasswordPage from './pages/public/ResetPasswordPage'
import EventsPage from './pages/public/EventsPage'
import NewsPage from './pages/public/NewsPage'
import ContactPage from './pages/public/ContactPage'
import AboutPage from './pages/public/AboutPage'
import PleaseLoginPage from './pages/public/PleaseLoginPage'

// User Pages
import DashboardPage from './pages/user/DashboardPage'
import TasksPage from './pages/user/TasksPage'
import RewardsPage from './pages/user/RewardsPage'
import TreePlantationPage from './pages/user/TreePlantationPage'
import WasteReportPage from './pages/user/WasteReportPage'
import ChallengesPage from './pages/user/ChallengesPage'
import ChallengeDetailPage from './pages/user/ChallengeDetailPage'
import PollutionPage from './pages/user/PollutionPage'
import CommunityPage from './pages/user/CommunityPage'
import PostDetailPage from './pages/user/PostDetailPage'
import ProfilePage from './pages/user/ProfilePage'
import PlasticTrackerPage from './pages/user/PlasticTrackerPage'

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminUsersPage from './pages/admin/AdminUsersPage'
import AdminRewardsPage from './pages/admin/AdminRewardsPage'
import AdminNewsPage from './pages/admin/AdminNewsPage'
import AdminEventsPage from './pages/admin/AdminEventsPage'
import AdminChallengesPage from './pages/admin/AdminChallengesPage'
import AdminTreeApprovalsPage from './pages/admin/AdminTreeApprovalsPage'
import AdminWasteReportsPage from './pages/admin/AdminWasteReportsPage'
import AdminPollutionPage from './pages/admin/AdminPollutionPage'
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage'
import AdminContactsPage from './pages/admin/AdminContactsPage'

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/please-login" element={<PleaseLoginPage />} />

                {/* Protected User Pages - Require Login */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/rewards" element={<RewardsPage />} />
                  <Route path="/tree" element={<TreePlantationPage />} />
                  <Route path="/waste" element={<WasteReportPage />} />
                  <Route path="/challenges" element={<ChallengesPage />} />
                  <Route path="/challenge/:id" element={<ChallengeDetailPage />} />
                  <Route path="/pollution" element={<PollutionPage />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/community/:id" element={<PostDetailPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/plastic-tracker" element={<PlasticTrackerPage />} />
                </Route>

                {/* Protected Admin Pages - Require Login AND Admin Password */}
                <Route element={<AdminRoute />}>
                  <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                  <Route path="/admin/users" element={<AdminUsersPage />} />
                  <Route path="/admin/rewards" element={<AdminRewardsPage />} />
                  <Route path="/admin/news" element={<AdminNewsPage />} />
                  <Route path="/admin/events" element={<AdminEventsPage />} />
                  <Route path="/admin/challenges" element={<AdminChallengesPage />} />
                  <Route path="/admin/tree-approvals" element={<AdminTreeApprovalsPage />} />
                  <Route path="/admin/waste-reports" element={<AdminWasteReportsPage />} />
                  <Route path="/admin/pollution" element={<AdminPollutionPage />} />
                  <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
                  <Route path="/admin/contacts" element={<AdminContactsPage />} />
                </Route>

                {/* 404 Page */}
                <Route path="*" element={
                  <div className="h-96 flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                      <a href="/" className="text-green-600 hover:underline">Go back to home</a>
                    </div>
                  </div>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster position="top-center" />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
