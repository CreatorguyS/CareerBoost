import React, { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { useAuth } from '../contexts/AuthContext'
import { 
  Home, 
  FileText, 
  Search, 
  GraduationCap, 
  Bot, 
  User, 
  LogOut,
  Trophy,
  Crown,
  Zap
} from 'lucide-react'
import PricingPlans from './PricingPlans'

export function Navigation() {
  const { user, signOut } = useAuth()
  const [location, navigate] = useLocation()
  const [showPricing, setShowPricing] = useState(false)

  // Don't show navigation on public pages when user is not logged in
  const publicPages = ['/', '/login', '/register']
  if (publicPages.includes(location) && !user) {
    return null
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/resume-builder', icon: FileText, label: 'Resume Builder' },
    { path: '/internships', icon: Search, label: 'Find Internships' },
    { path: '/higher-studies', icon: GraduationCap, label: 'Higher Studies' },
    { path: '/ai-advisor', icon: Bot, label: 'AI Advisor' },
  ]

  if (!user) return null

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <Trophy className="h-8 w-8 text-indigo-600" />
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">CareerBoost</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>

            <div className="flex items-center space-x-4">
              {/* Premium Features Button */}
              <button
                onClick={() => setShowPricing(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Crown className="h-4 w-4" />
                <span className="hidden sm:inline">Upgrade</span>
              </button>

              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-700 hidden sm:inline">{user?.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Pricing Modal */}
      {showPricing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Upgrade Your Plan</h2>
              <button
                onClick={() => setShowPricing(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            <PricingPlans />
          </div>
        </div>
      )}
    </>
  )
}