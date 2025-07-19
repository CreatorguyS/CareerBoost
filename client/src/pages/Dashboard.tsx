import React from 'react'
import { Link } from 'wouter'
import { useState, useEffect } from 'react'
import { 
  FileText, 
  Search, 
  GraduationCap, 
  Bot, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Trophy,
  Zap,
  Target,
  Award
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { userService, automationService } from '../services/api'
import PricingPlans from '../components/PricingPlans'

export function Dashboard() {
  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState(null)
  const [autoApplyStatus, setAutoApplyStatus] = useState({ isActive: false, applicationsCount: 0 })
  const [loading, setLoading] = useState(true)
  const [showPricing, setShowPricing] = useState(false)

  useEffect(() => {
    loadDashboardData()
    checkAutoApplyStatus()
  }, [])

  const loadDashboardData = async () => {
    try {
      const response = await userService.getDashboard()
      if (response.success) {
        setDashboardData(response.dashboard)
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
      // Use mock data for demo
      setDashboardData({
        applications: { total: 0, byStatus: {}, recent: [] },
        achievements: { applicationsCount: 0, interviewsCount: 0, offersCount: 0, resumeScore: 0 },
        resume: { exists: false, atsScore: 0 }
      })
    } finally {
      setLoading(false)
    }
  }

  const checkAutoApplyStatus = async () => {
    try {
      const response = await automationService.getAutoApplyStatus('demo-user-id')
      if (response.success) {
        setAutoApplyStatus(response.status)
      }
    } catch (error) {
      console.error('Failed to check auto-apply status:', error)
    }
  }

  const startAutoApply = async () => {
    try {
      const preferences = {
        fullName: user?.user_metadata?.full_name || 'User',
        email: user?.email || '',
        phone: '+91 9876543210',
        linkedin: 'https://linkedin.com/in/user',
        github: 'https://github.com/user',
        coverLetter: 'I am excited to apply for this internship opportunity...'
      }
      
      const response = await automationService.startAutoApply('demo-user-id', preferences)
      if (response.success) {
        setAutoApplyStatus(prev => ({ ...prev, isActive: true }))
        alert('🤖 Auto-apply bot activated! Applications will be sent automatically.')
      }
    } catch (error) {
      console.error('Failed to start auto-apply:', error)
      alert('Failed to start auto-apply bot')
    }
  }
  const quickActions = [
    {
      title: 'Build Resume',
      description: 'Create an ATS-optimized resume with AI assistance',
      icon: FileText,
      link: '/resume-builder',
      color: 'bg-indigo-500',
      hoverColor: 'hover:bg-indigo-600'
    },
    {
      title: 'Find Internships',
      description: 'Discover internships tailored to your profile',
      icon: Search,
      link: '/internships',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      title: 'Higher Studies',
      description: 'Plan your education abroad with AI guidance',
      icon: GraduationCap,
      link: '/higher-studies',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    },
    {
      title: 'AI Advisor',
      description: 'Get personalized career advice and guidance',
      icon: Bot,
      link: '/ai-advisor',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600'
    }
  ]

  const stats = dashboardData ? [
    { 
      label: 'Resumes Created', 
      value: dashboardData.resume.exists ? '1' : '0', 
      icon: FileText, 
      color: 'text-indigo-600' 
    },
    { 
      label: 'Applications Sent', 
      value: dashboardData.achievements.applicationsCount.toString(), 
      icon: TrendingUp, 
      color: 'text-green-600' 
    },
    { 
      label: 'Interviews Scheduled', 
      value: dashboardData.achievements.interviewsCount.toString(), 
      icon: Clock, 
      color: 'text-purple-600' 
    },
    { 
      label: 'Offers Received', 
      value: dashboardData.achievements.offersCount.toString(), 
      icon: CheckCircle, 
      color: 'text-orange-600' 
    }
  ] : []

  const recentActivity = [
    {
      type: 'info',
      message: 'Welcome to CareerBoost! Complete your profile to get started.',
      time: 'Just now',
      icon: AlertCircle
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Trophy className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.user_metadata?.full_name || user?.email}! 
            Ready to take the next step in your career journey?
          </p>
        </div>

        {/* AI Automation Status */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">AI Automation Center</h3>
              <p className="text-purple-100">Auto-apply to internships while you focus on other things</p>
              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${autoApplyStatus.isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                  <span className="text-sm">Status: {autoApplyStatus.isActive ? 'Active' : 'Inactive'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target size={16} />
                  <span className="text-sm">Applications: {autoApplyStatus.applicationsCount}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={startAutoApply}
                disabled={autoApplyStatus.isActive}
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 flex items-center"
              >
                <Zap size={16} className="mr-2" />
                {autoApplyStatus.isActive ? 'Running...' : 'Start Auto-Apply'}
              </button>
              <button
                onClick={() => setShowPricing(true)}
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-purple-600 transition-colors flex items-center"
              >
                <Award size={16} className="mr-2" />
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Link
                  key={index}
                  to={action.link}
                  className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className={`w-12 h-12 ${action.color} ${action.hoverColor} rounded-lg flex items-center justify-center mb-4 transition-colors`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <Icon className="h-5 w-5 text-indigo-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-gray-900">{activity.message}</p>
                        <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No recent activity. Start by creating your first resume!
              </p>
            )}
          </div>
        </div>

        {/* Pricing Modal */}
        {showPricing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Upgrade Your Plan</h2>
                <button
                  onClick={() => setShowPricing(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <PricingPlans />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}