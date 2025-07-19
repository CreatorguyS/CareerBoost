import React from 'react'
import { Route, Router } from 'wouter'
import { AuthProvider } from './contexts/AuthContext'
import { Navigation } from './components/Navigation'
import { ProtectedRoute } from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'
import { ResumeBuilder } from './pages/ResumeBuilder'
import { InternshipFinder } from './pages/InternshipFinder'
import { HigherStudies } from './pages/HigherStudies'
import { AIAdvisor } from './pages/AIAdvisor'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Route path="/" component={LandingPage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard">
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </Route>
          <Route path="/resume-builder">
            <ProtectedRoute>
              <ResumeBuilder />
            </ProtectedRoute>
          </Route>
          <Route path="/internships">
            <ProtectedRoute>
              <InternshipFinder />
            </ProtectedRoute>
          </Route>
          <Route path="/higher-studies">
            <ProtectedRoute>
              <HigherStudies />
            </ProtectedRoute>
          </Route>
          <Route path="/ai-advisor">
            <ProtectedRoute>
              <AIAdvisor />
            </ProtectedRoute>
          </Route>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App