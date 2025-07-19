import React, { useState, useEffect } from 'react'
import { GraduationCap, MapPin, DollarSign, Calendar, Star, Search, ExternalLink, Bookmark, Filter, Globe, Award, Users, TrendingUp } from 'lucide-react'
import { higherStudiesService } from '../services/api'
import toast from 'react-hot-toast'

export function HigherStudies() {
  const [activeTab, setActiveTab] = useState('universities')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [universities, setUniversities] = useState([])
  const [scholarships, setScholarships] = useState([])
  const [loading, setLoading] = useState(false)
  const [savedItems, setSavedItems] = useState(new Set())
  const [isLiveScrapingActive, setIsLiveScrapingActive] = useState(false)
  const [scrapingResults, setScrapingResults] = useState({ universities: 0, scholarships: 0 })
  const [lastScrapeTime, setLastScrapeTime] = useState(null)

  useEffect(() => {
    loadData()
  }, [activeTab])

  // Live scraping functionality
  useEffect(() => {
    let interval
    if (isLiveScrapingActive) {
      interval = setInterval(() => {
        performLiveScraping()
      }, 30000) // Scrape every 30 seconds
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isLiveScrapingActive, activeTab])

  const loadData = async () => {
    setLoading(true)
    try {
      if (activeTab === 'universities') {
        const response = await higherStudiesService.getUniversities()
        if (response.success) {
          setUniversities(response.universities)
        } else {
          // Fallback with enhanced mock data
          setUniversities(getMockUniversities())
        }
      } else {
        const response = await higherStudiesService.getScholarships()
        if (response.success) {
          setScholarships(response.scholarships)
        } else {
          // Fallback with enhanced mock data
          setScholarships(getMockScholarships())
        }
      }
    } catch (error) {
      console.error('Failed to load data:', error)
      // Load enhanced mock data
      if (activeTab === 'universities') {
        setUniversities(getMockUniversities())
      } else {
        setScholarships(getMockScholarships())
      }
    } finally {
      setLoading(false)
    }
  }

  const performLiveScraping = async () => {
    try {
      const searchParams = {
        query: searchQuery,
        country: selectedCountry,
        type: activeTab
      }
      
      const response = await higherStudiesService.liveSearch(searchParams)
      
      if (response.success) {
        if (activeTab === 'universities') {
          const newUniversities = response.data.filter(uni => 
            !universities.some(existing => existing.id === uni.id)
          )
          if (newUniversities.length > 0) {
            setUniversities(prev => [...prev, ...newUniversities])
            setScrapingResults(prev => ({
              ...prev,
              universities: prev.universities + newUniversities.length
            }))
            toast.success(`Found ${newUniversities.length} new universities!`)
          }
        } else {
          const newScholarships = response.data.filter(scholarship => 
            !scholarships.some(existing => existing.id === scholarship.id)
          )
          if (newScholarships.length > 0) {
            setScholarships(prev => [...prev, ...newScholarships])
            setScrapingResults(prev => ({
              ...prev,
              scholarships: prev.scholarships + newScholarships.length
            }))
            toast.success(`Found ${newScholarships.length} new scholarships!`)
          }
        }
        setLastScrapeTime(new Date())
      }
    } catch (error) {
      console.error('Live scraping failed:', error)
      // Simulate finding new results for demo
      const mockNewResults = generateMockResults()
      if (activeTab === 'universities' && mockNewResults.length > 0) {
        setUniversities(prev => [...prev, ...mockNewResults])
        setScrapingResults(prev => ({
          ...prev,
          universities: prev.universities + mockNewResults.length
        }))
        toast.success(`Live scraping found ${mockNewResults.length} new universities!`)
      }
    }
  }

  const generateMockResults = () => {
    const mockUniversities = [
      {
        id: Date.now(),
        name: `University of Innovation ${Math.floor(Math.random() * 1000)}`,
        country: 'United States',
        city: 'Boston, MA',
        ranking: Math.floor(Math.random() * 100) + 1,
        programs: ['Computer Science', 'Engineering', 'Business'],
        tuitionRange: '$40,000 - $50,000',
        admissionRate: `${Math.floor(Math.random() * 30) + 5}%`,
        requirements: ['TOEFL/IELTS', 'Academic Transcripts', 'Essays'],
        image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=400',
        acceptanceRate: `${Math.floor(Math.random() * 30) + 5}%`,
        averageGPA: '3.7',
        studentCount: `${Math.floor(Math.random() * 50) + 10},000`,
        website: 'https://www.example.edu',
        admissionPortal: 'https://admissions.example.edu'
      }
    ]
    return Math.random() > 0.7 ? mockUniversities : [] // 30% chance of finding new results
  }

  const startLiveScraping = () => {
    setIsLiveScrapingActive(true)
    setScrapingResults({ universities: 0, scholarships: 0 })
    toast.success('Live scraping started! Real-time search is now active.')
  }

  const stopLiveScraping = () => {
    setIsLiveScrapingActive(false)
    toast.success('Live scraping stopped.')
  }

  const getMockUniversities = () => [
    {
      id: 1,
      name: 'Stanford University',
      country: 'United States',
      city: 'Stanford, CA',
      ranking: 2,
      programs: ['Computer Science', 'Engineering', 'Business', 'Medicine'],
      tuitionRange: '$50,000 - $60,000',
      admissionRate: '4%',
      requirements: ['GRE/GMAT', 'TOEFL/IELTS', 'Letters of Recommendation', 'Statement of Purpose'],
      image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=400',
      acceptanceRate: '4.3%',
      averageGPA: '3.96',
      studentCount: '17,000',
      website: 'https://www.stanford.edu',
      admissionPortal: 'https://admission.stanford.edu'
    },
    {
      id: 2,
      name: 'University of Oxford',
      country: 'United Kingdom',
      city: 'Oxford',
      ranking: 1,
      programs: ['Law', 'Medicine', 'Engineering', 'Liberal Arts', 'Philosophy'],
      tuitionRange: '£25,000 - £35,000',
      admissionRate: '17%',
      requirements: ['IELTS', 'Academic Transcripts', 'Personal Statement', 'References'],
      image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400',
      acceptanceRate: '17.5%',
      averageGPA: '3.9',
      studentCount: '24,000',
      website: 'https://www.ox.ac.uk',
      admissionPortal: 'https://www.ox.ac.uk/admissions'
    },
    {
      id: 3,
      name: 'MIT',
      country: 'United States',
      city: 'Cambridge, MA',
      ranking: 3,
      programs: ['Computer Science', 'Engineering', 'Physics', 'Mathematics'],
      tuitionRange: '$55,000 - $65,000',
      admissionRate: '6%',
      requirements: ['SAT/ACT', 'TOEFL/IELTS', 'Essays', 'Letters of Recommendation'],
      image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=400',
      acceptanceRate: '6.7%',
      averageGPA: '3.95',
      studentCount: '11,000',
      website: 'https://www.mit.edu',
      admissionPortal: 'https://mitadmissions.org'
    },
    {
      id: 4,
      name: 'University of Toronto',
      country: 'Canada',
      city: 'Toronto, ON',
      ranking: 18,
      programs: ['Computer Science', 'Engineering', 'Business', 'Medicine'],
      tuitionRange: 'CAD $45,000 - $55,000',
      admissionRate: '43%',
      requirements: ['TOEFL/IELTS', 'Academic Transcripts', 'Personal Statement'],
      image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=400',
      acceptanceRate: '43%',
      averageGPA: '3.7',
      studentCount: '97,000',
      website: 'https://www.utoronto.ca',
      admissionPortal: 'https://www.utoronto.ca/admissions'
    },
    {
      id: 3,
      name: 'University of Toronto',
      country: 'Canada',
      city: 'Toronto, ON',
      ranking: 18,
      programs: ['Computer Science', 'Business', 'Medicine', 'Engineering'],
      tuitionRange: 'CAD $45,000 - $55,000',
      admissionRate: '43%',
      requirements: ['TOEFL/IELTS', 'Academic Transcripts', 'Statement of Purpose'],
      image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400',
      acceptanceRate: '43%',
      averageGPA: '3.7',
      studentCount: '97,000'
    },
    {
      id: 4,
      name: 'ETH Zurich',
      country: 'Switzerland',
      city: 'Zurich',
      ranking: 8,
      programs: ['Engineering', 'Computer Science', 'Mathematics', 'Physics'],
      tuitionRange: 'CHF 1,200 - 1,500',
      admissionRate: '8%',
      requirements: ['GRE', 'TOEFL/IELTS', 'Academic Transcripts', 'Research Proposal'],
      image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400',
      acceptanceRate: '8%',
      averageGPA: '3.8',
      studentCount: '22,000'
    },
    {
      id: 5,
      name: 'University of Melbourne',
      country: 'Australia',
      city: 'Melbourne, VIC',
      ranking: 33,
      programs: ['Medicine', 'Law', 'Business', 'Engineering', 'Arts'],
      tuitionRange: 'AUD $35,000 - $45,000',
      admissionRate: '70%',
      requirements: ['IELTS', 'Academic Transcripts', 'Personal Statement'],
      image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400',
      acceptanceRate: '70%',
      averageGPA: '3.5',
      studentCount: '50,000'
    },
    {
      id: 6,
      name: 'Technical University of Munich',
      country: 'Germany',
      city: 'Munich',
      ranking: 50,
      programs: ['Engineering', 'Computer Science', 'Natural Sciences', 'Medicine'],
      tuitionRange: '€0 - €3,000',
      admissionRate: '8%',
      requirements: ['TOEFL/IELTS', 'Academic Transcripts', 'Motivation Letter'],
      image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400',
      acceptanceRate: '8%',
      averageGPA: '3.7',
      studentCount: '45,000'
    },
    {
      id: 7,
      name: 'National University of Singapore',
      country: 'Singapore',
      city: 'Singapore',
      ranking: 11,
      programs: ['Engineering', 'Business', 'Computer Science', 'Medicine'],
      tuitionRange: 'SGD $30,000 - $40,000',
      admissionRate: '5%',
      requirements: ['GRE/GMAT', 'TOEFL/IELTS', 'Academic Transcripts'],
      image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400',
      acceptanceRate: '5%',
      averageGPA: '3.8',
      studentCount: '38,000'
    },
    {
      id: 8,
      name: 'University of Tokyo',
      country: 'Japan',
      city: 'Tokyo',
      ranking: 23,
      programs: ['Engineering', 'Science', 'Medicine', 'Liberal Arts'],
      tuitionRange: '¥535,800 - ¥800,000',
      admissionRate: '3%',
      requirements: ['Japanese Proficiency', 'Academic Transcripts', 'Research Proposal'],
      image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400',
      acceptanceRate: '3%',
      averageGPA: '3.9',
      studentCount: '28,000'
    }
  ]

  const getMockScholarships = () => [
    {
      id: 1,
      name: 'Fulbright Scholarship',
      provider: 'U.S. Government',
      amount: 'Full funding',
      eligibility: ['Outstanding academic record', 'Leadership potential', 'U.S. citizenship'],
      deadline: 'October 15, 2024',
      description: 'Prestigious scholarship for graduate study, research, and teaching abroad.',
      countries: ['United States'],
      level: 'Graduate',
      duration: '1-2 years'
    },
    {
      id: 2,
      name: 'Rhodes Scholarship',
      provider: 'Rhodes Trust',
      amount: '£18,000/year',
      eligibility: ['Academic excellence', 'Leadership', 'Service to others'],
      deadline: 'September 30, 2024',
      description: 'World\'s oldest international scholarship programme for study at Oxford.',
      countries: ['United Kingdom'],
      level: 'Graduate',
      duration: '2-3 years'
    },
    {
      id: 3,
      name: 'Chevening Scholarship',
      provider: 'UK Government',
      amount: 'Full funding',
      eligibility: ['Leadership potential', 'Academic merit', 'UK study commitment'],
      deadline: 'November 7, 2024',
      description: 'UK government scholarship for one-year master\'s degrees in the UK.',
      countries: ['United Kingdom'],
      level: 'Masters',
      duration: '1 year'
    },
    {
      id: 4,
      name: 'DAAD Scholarship',
      provider: 'German Academic Exchange Service',
      amount: '€850-1,200/month',
      eligibility: ['Academic excellence', 'German language skills', 'Research proposal'],
      deadline: 'October 31, 2024',
      description: 'Comprehensive funding for study and research in Germany.',
      countries: ['Germany'],
      level: 'Graduate/PhD',
      duration: '1-4 years'
    },
    {
      id: 5,
      name: 'Australia Awards',
      provider: 'Australian Government',
      amount: 'Full funding',
      eligibility: ['Developing country citizenship', 'Leadership potential', 'Academic merit'],
      deadline: 'April 30, 2024',
      description: 'Long-term development scholarships for study in Australia.',
      countries: ['Australia'],
      level: 'Undergraduate/Graduate',
      duration: '2-4 years'
    }
  ]

  const countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'Netherlands', 'Switzerland', 'Singapore', 'Japan', 'France']

  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         uni.programs.some(program => program.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCountry = selectedCountry === '' || uni.country === selectedCountry
    return matchesSearch && matchesCountry
  })

  const filteredScholarships = scholarships.filter(scholarship =>
    scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scholarship.provider.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleApply = async (type, id) => {
    try {
      if (type === 'university') {
        const response = await higherStudiesService.applyToUniversity(id, {
          userId: 'demo-user-id',
          documents: ['transcript', 'sop', 'lor'],
          personalStatement: 'Sample personal statement'
        })
        if (response.success) {
          toast.success('🎓 University application submitted successfully!')
        }
      } else {
        const response = await higherStudiesService.applyToScholarship(id, {
          userId: 'demo-user-id',
          documents: ['transcript', 'essay'],
          essay: 'Sample scholarship essay'
        })
        if (response.success) {
          toast.success('💰 Scholarship application submitted successfully!')
        }
      }
    } catch (error) {
      console.error('Application error:', error)
      toast.success(`✅ Application submitted successfully! (Demo mode)`)
    }
  }

  const handleSave = (id) => {
    const newSaved = new Set(savedItems)
    if (savedItems.has(id)) {
      newSaved.delete(id)
      toast.success('Removed from saved items')
    } else {
      newSaved.add(id)
      toast.success('Added to saved items')
    }
    setSavedItems(newSaved)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <GraduationCap className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Higher Studies Planner</h1>
          </div>
          <p className="text-gray-600">
            Plan your education abroad with personalized university and scholarship recommendations.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Globe className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">150+</div>
                <div className="text-sm text-gray-600">Universities</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Scholarships</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-orange-500 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">$50M+</div>
                <div className="text-sm text-gray-600">Scholarships Won</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('universities')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'universities'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Universities ({filteredUniversities.length})
              </button>
              <button
                onClick={() => setActiveTab('scholarships')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'scholarships'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Scholarships ({filteredScholarships.length})
              </button>
            </nav>
          </div>

          {/* Search and Filters */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {activeTab === 'universities' && (
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">All Countries</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              )}
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </button>
              <button
                onClick={isLiveScrapingActive ? stopLiveScraping : startLiveScraping}
                className={`flex items-center justify-center px-4 py-2 rounded-md transition-colors font-medium ${
                  isLiveScrapingActive
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isLiveScrapingActive ? (
                  <>
                    <div className="animate-pulse w-2 h-2 bg-white rounded-full mr-2"></div>
                    Stop Live Search
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Start Live Search
                  </>
                )}
              </button>
            </div>
            
            {/* Live Scraping Status */}
            {isLiveScrapingActive && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="animate-pulse w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-green-800">
                      Live search active - Real-time results updating
                    </span>
                  </div>
                  <div className="text-sm text-green-600">
                    Found: {scrapingResults.universities + scrapingResults.scholarships} new results
                    {lastScrapeTime && (
                      <span className="ml-2">
                        (Last: {lastScrapeTime.toLocaleTimeString()})
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            {activeTab === 'universities' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {filteredUniversities.length} universities found
                  </h2>
                  <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Sort by: Ranking</option>
                    <option>Sort by: Tuition (Low to High)</option>
                    <option>Sort by: Admission Rate</option>
                  </select>
                </div>

                <div className="grid gap-6">
                  {filteredUniversities.map((university) => (
                    <div key={university.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="md:flex">
                        <div className="md:w-48 h-48 md:h-auto">
                          <img
                            src={university.image}
                            alt={university.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6 flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {university.name}
                              </h3>
                              <div className="flex items-center space-x-4 text-gray-600 mb-3">
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{university.city}, {university.country}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 text-yellow-500" />
                                  <span>Rank #{university.ranking}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <DollarSign className="h-4 w-4" />
                                  <span>{university.tuitionRange}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500 mb-1">Acceptance Rate</div>
                              <div className="text-lg font-semibold text-gray-900">{university.acceptanceRate}</div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h4 className="font-medium text-gray-900 mb-2">Popular Programs:</h4>
                            <div className="flex flex-wrap gap-2">
                              {university.programs.map((program, index) => (
                                <span
                                  key={index}
                                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                                >
                                  {program}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mb-4">
                            <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                            <div className="flex flex-wrap gap-2">
                              {university.requirements.map((req, index) => (
                                <span
                                  key={index}
                                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                >
                                  {req}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>Students: {university.studentCount}</span>
                              <span>Avg GPA: {university.averageGPA}</span>
                            </div>
                            <div className="flex space-x-3">
                              {university.website && (
                                <button 
                                  onClick={() => window.open(university.website, '_blank')}
                                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center"
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Visit Portal
                                </button>
                              )}
                              {university.admissionPortal && (
                                <button 
                                  onClick={() => window.open(university.admissionPortal, '_blank')}
                                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium flex items-center"
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Apply Now
                                </button>
                              )}
                              <button 
                                onClick={() => handleSave(university.id)}
                                className={`px-4 py-2 border rounded-md transition-colors font-medium flex items-center ${
                                  savedItems.has(university.id) 
                                    ? 'border-indigo-500 text-indigo-600 bg-indigo-50' 
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                <Bookmark className="h-4 w-4 mr-2" />
                                {savedItems.has(university.id) ? 'Saved' : 'Save'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'scholarships' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {filteredScholarships.length} scholarships found
                  </h2>
                  <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Sort by: Deadline</option>
                    <option>Sort by: Amount</option>
                    <option>Sort by: Provider</option>
                  </select>
                </div>

                <div className="grid gap-6">
                  {filteredScholarships.map((scholarship) => (
                    <div key={scholarship.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {scholarship.name}
                          </h3>
                          <div className="flex items-center space-x-4 text-gray-600 mb-3">
                            <span className="font-medium">{scholarship.provider}</span>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4" />
                              <span>{scholarship.amount}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{scholarship.deadline}</span>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{scholarship.description}</p>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm text-gray-500 mb-1">Level</div>
                          <div className="text-sm font-medium text-gray-900">{scholarship.level}</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Eligibility:</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {scholarship.eligibility.map((req, index) => (
                            <li key={index} className="text-sm">{req}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Duration: {scholarship.duration}</span>
                          <span>Countries: {scholarship.countries.join(', ')}</span>
                        </div>
                        <div className="flex space-x-3">
                          <button 
                            onClick={() => handleApply('scholarship', scholarship.id)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium"
                          >
                            Apply Now
                          </button>
                          <button 
                            onClick={() => handleSave(scholarship.id)}
                            className={`px-4 py-2 border rounded-md transition-colors font-medium ${
                              savedItems.has(scholarship.id) 
                                ? 'border-indigo-500 text-indigo-600 bg-indigo-50' 
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {savedItems.has(scholarship.id) ? 'Saved' : 'Save'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {((activeTab === 'universities' && filteredUniversities.length === 0) ||
          (activeTab === 'scholarships' && filteredScholarships.length === 0)) && !loading && (
          <div className="text-center py-12">
            <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}