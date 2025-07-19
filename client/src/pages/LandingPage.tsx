import React from 'react'
import { Link } from 'wouter'
import { useAuth } from '../contexts/AuthContext'
import { 
  ArrowRight, 
  Star, 
  Users, 
  Trophy, 
  Globe, 
  BookOpen, 
  Briefcase, 
  GraduationCap,
  CheckCircle,
  Crown,
  Zap,
  Shield,
  Award,
  Building2,
  MapPin
} from 'lucide-react'

const LandingPage = () => {
  const { user } = useAuth()

  const successStories = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      story: "CareerBoost helped me land 5 internship offers and eventually my dream job at Google. The AI resume builder was a game-changer!",
      achievement: "5 Internship Offers",
      university: "Stanford University"
    },
    {
      name: "Michael Rodriguez",
      role: "Data Scientist at Microsoft",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      story: "The automated application system saved me 40+ hours per week. I got accepted to MIT for my Master's with full scholarship!",
      achievement: "MIT Full Scholarship",
      university: "MIT"
    },
    {
      name: "Priya Patel",
      role: "Product Manager at Amazon",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      story: "From 0 to 15 interview calls in just 2 weeks! The AI career advisor guided me perfectly through my transition to tech.",
      achievement: "15 Interview Calls",
      university: "UC Berkeley"
    }
  ]

  const partnerCompanies = [
    {
      name: "EduGlobal",
      logo: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100&h=60&fit=crop",
      description: "Study abroad consultancy with 95% visa success rate",
      countries: ["USA", "UK", "Canada", "Australia"]
    },
    {
      name: "ScholarshipHub",
      logo: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=100&h=60&fit=crop",
      description: "Connecting students with $50M+ in scholarships annually",
      countries: ["Germany", "Netherlands", "Sweden", "Norway"]
    },
    {
      name: "GlobalEd Partners",
      logo: "https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=100&h=60&fit=crop",
      description: "Premium university placement services worldwide",
      countries: ["Singapore", "Japan", "South Korea", "Hong Kong"]
    }
  ]

  const paidFeatures = [
    {
      title: "AI-Powered Auto Apply",
      description: "Apply to 100+ positions daily with intelligent matching",
      icon: <Zap className="w-6 h-6" />,
      price: "$29/month",
      popular: true
    },
    {
      title: "Premium Resume Templates",
      description: "ATS-optimized templates used by Fortune 500 companies",
      icon: <Crown className="w-6 h-6" />,
      price: "$19/month",
      popular: false
    },
    {
      title: "1-on-1 Career Coaching",
      description: "Personal mentorship from industry experts",
      icon: <Users className="w-6 h-6" />,
      price: "$99/session",
      popular: false
    },
    {
      title: "Priority Support & Analytics",
      description: "24/7 support with detailed application insights",
      icon: <Shield className="w-6 h-6" />,
      price: "$39/month",
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation - Only show if user is not logged in */}
      {!user && (
        <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <Trophy className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold text-white">
                  CareerBoost
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
                <a href="#success" className="text-gray-300 hover:text-white transition-colors">Success Stories</a>
                <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
                <a href="#partners" className="text-gray-300 hover:text-white transition-colors">Partners</a>
                <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 50,000+ students worldwide
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Land Your Dream
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block">
                Career & Studies
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              AI-powered platform that automates job applications, builds perfect resumes, 
              and connects you with top universities worldwide. Your success story starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/register" 
                className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <button className="text-indigo-600 font-semibold text-lg hover:text-indigo-700 transition-colors flex items-center">
                Watch Demo
                <Globe className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-pink-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </section>

      {/* Success Stories Section */}
      <section id="success" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real students, real results. See how CareerBoost transformed their careers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <img 
                    src={story.image} 
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{story.name}</h3>
                    <p className="text-indigo-600 font-medium">{story.role}</p>
                    <p className="text-sm text-gray-500">{story.university}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">"{story.story}"</p>
                <div className="flex items-center text-green-600 font-semibold">
                  <Award className="w-5 h-5 mr-2" />
                  {story.achievement}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need to accelerate your career journey</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Job Matching</h3>
              <p className="text-gray-600">AI analyzes your profile and matches you with perfect opportunities</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Resume Builder</h3>
              <p className="text-gray-600">Create ATS-optimized resumes that get you noticed by recruiters</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Study Abroad</h3>
              <p className="text-gray-600">Connect with top universities and scholarship opportunities worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Premium Features</h2>
            <p className="text-xl text-gray-600">Unlock advanced tools to supercharge your career</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paidFeatures.map((feature, index) => (
              <div key={index} className={`relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 ${feature.popular ? 'ring-2 ring-indigo-500' : 'border border-gray-200'}`}>
                {feature.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className={`${feature.popular ? 'bg-indigo-100' : 'bg-gray-100'} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <div className={feature.popular ? 'text-indigo-600' : 'text-gray-600'}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                <div className="text-2xl font-bold text-indigo-600 mb-4">{feature.price}</div>
                <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${feature.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Companies Section */}
      <section id="partners" className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Study Abroad Partners</h2>
            <p className="text-xl text-gray-600">Trusted partnerships for your international education journey</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {partnerCompanies.map((company, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center mb-6">
                  <img 
                    src={company.logo} 
                    alt={company.name}
                    className="w-16 h-16 rounded-lg object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
                    <div className="flex items-center text-indigo-600">
                      <Building2 className="w-4 h-4 mr-1" />
                      <span className="text-sm">Verified Partner</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{company.description}</p>
                <div className="flex flex-wrap gap-2">
                  {company.countries.map((country, idx) => (
                    <span key={idx} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of successful students who've accelerated their careers with CareerBoost
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Your Journey Today
            </Link>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-all">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Trophy className="w-8 h-8 text-indigo-400" />
                <span className="text-2xl font-bold">CareerBoost</span>
              </div>
              <p className="text-gray-400">Empowering students to achieve their career dreams through AI-powered tools and global partnerships.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Resume Builder</li>
                <li>Job Matching</li>
                <li>Auto Apply</li>
                <li>Career Advisor</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Study Abroad</h3>
              <ul className="space-y-2 text-gray-400">
                <li>University Search</li>
                <li>Scholarship Finder</li>
                <li>Visa Assistance</li>
                <li>Partner Network</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CareerBoost. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage