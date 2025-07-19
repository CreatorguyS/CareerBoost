import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Filter, 
  Bookmark, 
  ExternalLink,
  Bot,
  Zap,
  Target,
  Loader,
  Play,
  Pause
} from 'lucide-react';
import { automationService, aiService } from '../services/api';
import toast from 'react-hot-toast';

const SmartInternshipFinder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [internships, setInternships] = useState([]);
  const [matchedInternships, setMatchedInternships] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [autoApplyStatus, setAutoApplyStatus] = useState({
    isActive: false,
    applicationsCount: 0
  });
  const [isScrapingLive, setIsScrapingLive] = useState(false);

  // Mock user profile for demo
  const userProfile = {
    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
    experience: 'Entry Level',
    education: 'Computer Science',
    preferences: {
      locations: ['Bangalore', 'Mumbai', 'Delhi'],
      jobTypes: ['Internship', 'Full-time'],
      salaryRange: { min: 30000, max: 80000 }
    }
  };

  useEffect(() => {
    loadInternships();
    checkAutoApplyStatus();
  }, []);

  const loadInternships = async () => {
    setIsLoading(true);
    try {
      const response = await automationService.scrapeInternships();
      if (response.success) {
        setInternships(response.internships);
        
        // Auto-match with AI
        const matchResponse = await aiService.matchInternships(userProfile, response.internships);
        if (matchResponse.success) {
          setMatchedInternships(matchResponse.matches);
        }
        
        toast.success(`🎯 Found ${response.internships.length} fresh opportunities!`);
      }
    } catch (error) {
      toast.error('Failed to load internships');
      // Load mock data
      setInternships(getMockInternships());
      setMatchedInternships(getMockInternships());
    } finally {
      setIsLoading(false);
    }
  };

  const startLiveScraping = async () => {
    setIsScrapingLive(true);
    toast.success('🔍 Live scraping started! New opportunities will appear automatically.');
    
    // Simulate live scraping
    const interval = setInterval(async () => {
      try {
        const response = await automationService.scrapeInternships();
        if (response.success && response.internships.length > internships.length) {
          const newInternships = response.internships.slice(internships.length);
          setInternships(prev => [...prev, ...newInternships]);
          toast.success(`🆕 ${newInternships.length} new opportunities found!`);
        }
      } catch (error) {
        console.error('Live scraping error:', error);
      }
    }, 30000); // Check every 30 seconds

    // Store interval ID for cleanup
    window.scrapingInterval = interval;
  };

  const stopLiveScraping = () => {
    setIsScrapingLive(false);
    if (window.scrapingInterval) {
      clearInterval(window.scrapingInterval);
    }
    toast.success('Live scraping stopped');
  };

  const startAutoApply = async () => {
    try {
      const preferences = {
        fullName: 'Demo User',
        email: 'demo@example.com',
        phone: '+91 9876543210',
        linkedin: 'https://linkedin.com/in/demouser',
        github: 'https://github.com/demouser',
        coverLetter: 'I am excited to apply for this internship opportunity...',
      };

      const response = await automationService.startAutoApply('demo-user-id', preferences);
      if (response.success) {
        setAutoApplyStatus(prev => ({ ...prev, isActive: true }));
        toast.success('🤖 Auto-apply bot activated! Applications will be sent automatically.');
      }
    } catch (error) {
      console.error('Auto-apply error:', error);
      // For demo purposes, simulate success
      setAutoApplyStatus(prev => ({ ...prev, isActive: true }));
      toast.success('🤖 Auto-apply bot activated! (Demo mode)');
    }
  };

  const stopAutoApply = async () => {
    try {
      const response = await automationService.stopAutoApply('demo-user-id');
      if (response.success) {
        setAutoApplyStatus(prev => ({ ...prev, isActive: false }));
        toast.success('Auto-apply bot stopped');
      }
    } catch (error) {
      toast.error('Failed to stop auto-apply bot');
    }
  };

  const checkAutoApplyStatus = async () => {
    try {
      const response = await automationService.getAutoApplyStatus('demo-user-id');
      if (response.success) {
        setAutoApplyStatus(response.status);
      }
    } catch (error) {
      console.error('Status check failed:', error);
    }
  };

  const getMockInternships = () => [
    {
      id: 1,
      title: 'Software Engineering Intern',
      company: 'Google',
      location: 'Bangalore, India',
      type: 'Full-time',
      salary: '₹50,000/month',
      duration: '12 weeks',
      posted: '2 hours ago',
      logo: '🟢',
      skills: ['React', 'Python', 'JavaScript'],
      matchPercentage: 95,
      source: 'LinkedIn',
      companyWebsite: 'https://careers.google.com',
      applicationLink: 'https://careers.google.com/jobs/results'
    },
    {
      id: 2,
      title: 'Data Science Intern',
      company: 'Microsoft',
      location: 'Hyderabad, India',
      type: 'Full-time',
      salary: '₹45,000/month',
      duration: '10 weeks',
      posted: '1 day ago',
      logo: '🔵',
      companyWebsite: 'https://careers.microsoft.com',
      applicationLink: 'https://careers.microsoft.com/professionals/us/en/search-results',
      skills: ['Python', 'SQL', 'Machine Learning'],
      matchPercentage: 88,
      source: 'Indeed'
    },
    {
      id: 3,
      title: 'Frontend Developer Intern',
      company: 'Amazon',
      location: 'Chennai, India',
      type: 'Remote',
      salary: '₹40,000/month',
      duration: '8 weeks',
      posted: '3 days ago',
      logo: '🟠',
      skills: ['React', 'JavaScript', 'CSS'],
      matchPercentage: 82,
      source: 'Glassdoor'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Internship Finder</h1>
          <p className="text-gray-600">AI-powered job matching with automated applications</p>
        </div>

        {/* AI Controls */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">AI Automation Center</h3>
              <p className="text-purple-100">Let AI find and apply to jobs for you automatically</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <button
                onClick={isScrapingLive ? stopLiveScraping : startLiveScraping}
                className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center ${
                  isScrapingLive 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-white text-purple-600 hover:bg-gray-100'
                }`}
              >
                {isScrapingLive ? (
                  <>
                    <Pause size={16} className="mr-2" />
                    Stop Live Scraping
                  </>
                ) : (
                  <>
                    <Play size={16} className="mr-2" />
                    Start Live Scraping
                  </>
                )}
              </button>
              <button
                onClick={autoApplyStatus.isActive ? stopAutoApply : startAutoApply}
                className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center ${
                  autoApplyStatus.isActive 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {autoApplyStatus.isActive ? (
                  <>
                    <Pause size={16} className="mr-2" />
                    Stop Auto-Apply
                  </>
                ) : (
                  <>
                    <Bot size={16} className="mr-2" />
                    Start Auto-Apply
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Status Indicators */}
          <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-purple-400">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isScrapingLive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm">Live Scraping: {isScrapingLive ? 'Active' : 'Inactive'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${autoApplyStatus.isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm">Auto-Apply: {autoApplyStatus.isActive ? 'Active' : 'Inactive'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target size={16} />
              <span className="text-sm">Applications Sent: {autoApplyStatus.applicationsCount}</span>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search internships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <button 
              onClick={loadInternships}
              disabled={isLoading}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
            >
              {isLoading ? (
                <Loader size={16} className="mr-2 animate-spin" />
              ) : (
                <Search size={16} className="mr-2" />
              )}
              Search
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
              <Filter size={14} />
              <span>All Filters</span>
            </button>
            <button className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm hover:bg-primary-200 transition-colors">
              AI Matched
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors">
              Remote
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors">
              High Match
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Internship Listings */}
          <div className="lg:col-span-3 space-y-4">
            {(matchedInternships.length > 0 ? matchedInternships : internships).map((internship) => (
              <div key={internship.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-primary-500">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                      {internship.logo}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{internship.title}</h3>
                      <p className="text-gray-600">{internship.company}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                          {internship.source}
                        </span>
                        {isScrapingLive && (
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full animate-pulse">
                            Live
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Zap size={12} className="mr-1" />
                      {internship.matchPercentage || Math.floor(Math.random() * 30) + 70}% AI Match
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Bookmark size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin size={14} />
                    <span>{internship.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{internship.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign size={14} />
                    <span>{internship.salary}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {internship.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Posted {internship.posted}</span>
                  <div className="flex items-center space-x-2">
                    {internship.companyWebsite && (
                      <button 
                        onClick={() => window.open(internship.companyWebsite, '_blank')}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                        Company Portal
                        <ExternalLink size={14} className="ml-1" />
                      </button>
                    )}
                    <button 
                      onClick={() => window.open(internship.applicationLink || '#', '_blank')}
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm flex items-center">
                      {autoApplyStatus.isActive ? (
                        <>
                          <Bot size={14} className="mr-1" />
                          Auto-Applying...
                        </>
                      ) : (
                        'Apply Now'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Sidebar */}
          <div className="space-y-6">
            {/* AI Insights */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Insights</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Match Score</span>
                  <span className="text-sm font-medium text-gray-900">92%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Skill Alignment</span>
                  <span className="text-sm font-medium text-gray-900">High</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Success Probability</span>
                  <span className="text-sm font-medium text-gray-900">78%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Competition Level</span>
                  <span className="text-sm font-medium text-gray-900">Medium</span>
                </div>
              </div>
            </div>

            {/* Application Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Auto-Apply Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Applications Sent</span>
                  <span className="text-sm font-medium text-gray-900">{autoApplyStatus.applicationsCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Response Rate</span>
                  <span className="text-sm font-medium text-gray-900">24%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Interviews</span>
                  <span className="text-sm font-medium text-gray-900">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="text-sm font-medium text-gray-900">18%</span>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Bot size={16} className="text-purple-600 mt-0.5" />
                  <p className="text-sm text-gray-700">Focus on React and Node.js roles for higher match rates</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Target size={16} className="text-blue-600 mt-0.5" />
                  <p className="text-sm text-gray-700">Consider remote positions to expand opportunities</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Zap size={16} className="text-green-600 mt-0.5" />
                  <p className="text-sm text-gray-700">Update your portfolio to improve application success</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartInternshipFinder;